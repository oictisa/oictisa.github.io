/**
 * TISA event request backend — Google Apps Script.
 * Paste this whole file into Extensions → Apps Script of the TISA Google Sheet.
 * Setup steps: see SETUP.md in this folder.
 *
 * Script properties (Project Settings → Script properties):
 *   ADMIN_PASSWORD  password for the admin page
 *   NOTIFY_EMAIL    where new-request notifications go (comma-separated OK)
 */

var SHEET_NAME = 'Requests';
var HEADERS = ['id', 'createdAt', 'name', 'contactType', 'contact', 'studentType', 'faculty', 'year',
  'eventTags', 'eventDetail', 'timing', 'nationality', 'lang', 'status', 'repliedAt', 'note'];
var STATUSES = ['new', 'reviewing', 'confirmed', 'onhold'];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    switch (body.action) {
      case 'submit': return json(submit(body));
      case 'list':   checkPassword(body); return json({ ok: true, rows: listRows() });
      case 'update': checkPassword(body); return json(update(body));
      case 'reply':  checkPassword(body); return json(reply(body));
      default:       return json({ ok: false, error: 'Unknown action' });
    }
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() {
  return json({ ok: true, service: 'TISA requests' });
}

// ── actions ────────────────────────────────────────────────

function submit(b) {
  if (b.website) return { ok: true }; // honeypot filled → bot, silently ignore
  var name = clip(b.name, 80), contact = clip(b.contact, 120);
  if (!name || !contact || !b.studentType || !b.faculty || !b.year) throw new Error('Missing fields');
  var tags = Array.isArray(b.eventTags) ? b.eventTags.join(', ') : '';
  var detail = clip(b.eventDetail, 2000);
  if (!tags && !detail) throw new Error('Missing event');

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var id = Utilities.getUuid().slice(0, 8);
    var row = {
      id: id,
      createdAt: new Date().toISOString(),
      name: name,
      contactType: b.contactType === 'instagram' ? 'instagram' : 'email',
      contact: contact,
      studentType: clip(b.studentType, 30),
      faculty: clip(b.faculty, 30),
      year: clip(b.year, 10),
      eventTags: clip(tags, 200),
      eventDetail: detail,
      timing: clip(b.timing, 200),
      nationality: clip(b.nationality, 200),
      lang: b.lang === 'ja' ? 'ja' : 'en',
      status: 'new',
      repliedAt: '',
      note: ''
    };
    sheet().appendRow(HEADERS.map(function (h) { return safeCell(row[h]); }));
  } finally {
    lock.releaseLock();
  }
  notifyStaff(row);
  return { ok: true, id: id };
}

function listRows() {
  var values = sheet().getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var r = {};
    HEADERS.forEach(function (h, j) {
      var v = values[i][j];
      r[h] = v instanceof Date ? v.toISOString() : String(v).replace(/^'/, '');
    });
    rows.push(r);
  }
  return rows.reverse(); // newest first
}

function update(b) {
  var found = findRow(b.id);
  if (b.status !== undefined) {
    if (STATUSES.indexOf(b.status) < 0) throw new Error('Bad status');
    setCell(found, 'status', b.status);
  }
  if (b.note !== undefined) setCell(found, 'note', safeCell(clip(b.note, 1000)));
  return { ok: true };
}

function reply(b) {
  var found = findRow(b.id);
  var data = found.values;
  var contactType = data[HEADERS.indexOf('contactType')];
  if (b.body && contactType === 'email') {
    var to = String(data[HEADERS.indexOf('contact')]).replace(/^'/, '');
    MailApp.sendEmail({ to: to, subject: clip(b.subject, 200) || '[TISA]', body: clip(b.body, 5000), name: 'OIC TISA' });
  }
  var repliedAt = new Date().toISOString();
  setCell(found, 'repliedAt', repliedAt);
  if (data[HEADERS.indexOf('status')] === 'new') setCell(found, 'status', 'reviewing');
  return { ok: true, repliedAt: repliedAt };
}

// ── helpers ────────────────────────────────────────────────

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function findRow(id) {
  var sh = sheet();
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) return { sheet: sh, rowNumber: i + 1, values: values[i] };
  }
  throw new Error('Not found');
}

function setCell(found, header, value) {
  found.sheet.getRange(found.rowNumber, HEADERS.indexOf(header) + 1).setValue(value);
}

function checkPassword(b) {
  var pw = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!pw) throw new Error('ADMIN_PASSWORD is not set');
  if (b.password !== pw) {
    Utilities.sleep(800); // slow down guessing
    throw new Error('Wrong password');
  }
}

function notifyStaff(row) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  var lines = HEADERS.filter(function (h) { return ['status', 'repliedAt', 'note'].indexOf(h) < 0; })
    .map(function (h) { return h + ': ' + row[h]; });
  MailApp.sendEmail({
    to: to,
    subject: '【TISA】新しいイベントリクエスト / New event request: ' + row.name,
    body: lines.join('\n') + '\n\n管理ページで確認・返信してください。 / Review and reply on the admin page.',
    name: 'TISA site'
  });
}

function clip(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

// Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
function safeCell(v) {
  var s = String(v == null ? '' : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
