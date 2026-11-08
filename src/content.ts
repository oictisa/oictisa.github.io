// ─────────────────────────────────────────────────────────────
// All site text lives here. Edit this file to update the site.
// Every text has an English (en) and Japanese (ja) version.
// ─────────────────────────────────────────────────────────────

export type Lang = 'en' | 'ja'
export type T = { en: string; ja: string }

export const site = {
  instagram: 'https://www.instagram.com/oictisa/',
  instagramHandle: '@oictisa',
  meeting: { en: 'Every Wednesday 17:00–18:00', ja: '毎週水曜 17:00–18:00' } as T,
  place: { en: 'Ritsumeikan OIC (Osaka Ibaraki Campus)', ja: '立命館大学 大阪いばらきキャンパス（OIC）' } as T,
}

export const nav = {
  about: { en: 'About', ja: 'TISAとは' },
  activities: { en: 'Activities', ja: '活動' },
  numbers: { en: 'Numbers', ja: '数字で見る' },
  request: { en: 'Request', ja: 'リクエスト' },
} satisfies Record<string, T>

export const hero = {
  kicker: { en: 'Ritsumeikan OIC · International Student Support', ja: '立命館大学OIC · 留学生支援団体' },
  titleLine1: { en: 'Need help?', ja: '困ったら、' },
  titleLine2: { en: "TISA's got you.", ja: 'TISAへ。' },
  lead: {
    en: 'An exchange student support committee, enhancing your life in Japan.',
    ja: '留学生の日本での生活を、もっと楽しく、もっと安心に。',
  },
  ctaRequest: { en: 'Request an event', ja: 'イベントをリクエスト' },
  ctaActivities: { en: 'Our activities', ja: '活動を見る' },
} satisfies Record<string, T>

export const about = {
  title: { en: 'Who we are', ja: 'TISAについて' },
  body: {
    en: 'TISA is a student-run group based at Ritsumeikan University OIC. We support international students so that life in Japan feels easier and more fun — from everyday questions to events where students from every country can meet.',
    ja: 'TISAは立命館大学OICを拠点に活動している留学生支援団体です。日々のちょっとした困りごとから、国を越えて仲良くなれるイベントまで、留学生の日本での生活をサポートしています。',
  },
  points: [
    {
      icon: '🗓️',
      title: { en: 'Weekly meetups', ja: '毎週の活動' },
      text: { en: 'Every Wednesday 17:00–18:00 at OIC. Drop by anytime.', ja: '毎週水曜17:00–18:00、OICで活動中。気軽に来てください。' },
    },
    {
      icon: '🤝',
      title: { en: 'Life support', ja: '生活サポート' },
      text: { en: 'Questions about life in Japan? Ask us — in English or Japanese.', ja: '日本での生活の疑問、英語でも日本語でも相談OK。' },
    },
    {
      icon: '🎉',
      title: { en: 'Events', ja: 'イベント' },
      text: { en: 'Camps, fireworks, sports and more — planned around what students want.', ja: '合宿、花火、スポーツなど。みんなの「やりたい」から企画します。' },
    },
  ],
}

// Photos: put image files in /public/photos/ and set `photo: 'photos/xxx.jpg'`.
// While `photo` is empty, a colored card with the emoji is shown instead.
export const activities = {
  title: { en: 'What we do', ja: '活動内容' },
  items: [
    {
      emoji: '🌸',
      color: '#F5C518',
      photo: '',
      title: { en: 'Welcome events', ja: '新歓イベント' },
      text: { en: 'Every new semester we welcome new students and help them find friends fast.', ja: '新学期ごとに新入生を歓迎。最初の友だち作りをお手伝い。' },
    },
    {
      emoji: '🏕️',
      color: '#7BC67E',
      photo: '',
      title: { en: 'TISA training camp', ja: 'TISA合宿' },
      text: { en: 'An overnight trip with international and Japanese students.', ja: '留学生と日本人学生で行く泊まりがけの合宿。' },
    },
    {
      emoji: '🎆',
      color: '#5BA4E6',
      photo: '',
      title: { en: 'Fireworks event', ja: '花火イベント' },
      text: { en: 'Experience a Japanese summer classic together.', ja: '日本の夏の定番を、みんなで体験。' },
    },
    {
      emoji: '⚽',
      color: '#F59E8B',
      photo: '',
      title: { en: 'Sports events', ja: 'スポーツイベント' },
      text: { en: 'Move, play, and get to know each other — no experience needed.', ja: '体を動かして自然に仲良く。初心者大歓迎。' },
    },
  ],
}

// ⚠ SAMPLE NUMBERS — replace with real ones, then set `isSample: false`.
export const numbers = {
  title: { en: 'TISA in numbers', ja: '数字で見るTISA' },
  isSample: true,
  sampleNote: { en: 'Sample data', ja: 'サンプルデータ' },
  followers: 897,
  stats: [
    { value: '897', label: { en: 'Instagram followers', ja: 'Instagramフォロワー' } },
    { value: '52', label: { en: 'Weekly meetups a year', ja: '年間の定例活動' } },
    { value: '4+', label: { en: 'Big events a year', ja: '年間の大型イベント' } },
  ],
  chartTitle: { en: 'Event participants by year', ja: '年度別イベント参加者数' },
  chart: [
    { name: '2024', participants: 120 },
    { name: '2025', participants: 180 },
    { name: '2026', participants: 240 },
  ],
}

export const form = {
  title: { en: 'Request an event', ja: 'イベントをリクエスト' },
  lead: {
    en: 'What do you want to do in Japan? Tell us — TISA staff will read every request and reply to you.',
    ja: '日本でやってみたいことはありますか？すべてのリクエストをTISAスタッフが読んで、あなたに返信します。',
  },
  name: { en: 'Name (nickname OK)', ja: 'お名前（ニックネーム可）' },
  contactType: { en: 'How should we reply?', ja: '返信先' },
  contactEmail: { en: 'Email', ja: 'メール' },
  contactInstagram: { en: 'Instagram', ja: 'Instagram' },
  contactPlaceholderEmail: { en: 'you@example.com', ja: 'you@example.com' },
  contactPlaceholderInstagram: { en: '@your_id', ja: '@your_id' },
  studentType: { en: 'You are…', ja: 'あなたは…' },
  studentTypes: [
    { value: 'exchange', label: { en: 'Exchange student', ja: '交換留学生' } },
    { value: 'degree', label: { en: 'Degree-seeking international student', ja: '正規留学生' } },
    { value: 'japanese', label: { en: 'Japanese student', ja: '日本人学生' } },
    { value: 'other', label: { en: 'Other', ja: 'その他' } },
  ],
  faculty: { en: 'Faculty', ja: '学部' },
  faculties: [
    { value: 'business', label: { en: 'Business Administration', ja: '経営学部' } },
    { value: 'policy', label: { en: 'Policy Science', ja: '政策科学部' } },
    { value: 'psychology', label: { en: 'Comprehensive Psychology', ja: '総合心理学部' } },
    { value: 'image', label: { en: 'Image Arts and Sciences', ja: '映像学部' } },
    { value: 'info', label: { en: 'Information Science and Engineering', ja: '情報理工学部' } },
    { value: 'global', label: { en: 'Global Liberal Arts', ja: 'グローバル教養学部' } },
    { value: 'graduate', label: { en: 'Graduate school', ja: '大学院' } },
    { value: 'other', label: { en: 'Other', ja: 'その他' } },
  ],
  year: { en: 'Year', ja: '学年' },
  years: [
    { value: '1', label: { en: '1st year', ja: '1回生' } },
    { value: '2', label: { en: '2nd year', ja: '2回生' } },
    { value: '3', label: { en: '3rd year', ja: '3回生' } },
    { value: '4', label: { en: '4th year', ja: '4回生' } },
    { value: 'grad', label: { en: 'Graduate', ja: '大学院生' } },
    { value: 'other', label: { en: 'Other', ja: 'その他' } },
  ],
  event: { en: 'What event do you want?', ja: 'やってみたいイベント' },
  eventHint: { en: 'Pick ideas or write your own.', ja: '例から選ぶか、自由に書いてください。' },
  eventTags: [
    { value: 'culture', label: { en: '🎎 Culture exchange', ja: '🎎 文化交流' } },
    { value: 'trip', label: { en: '🚃 Trip', ja: '🚃 旅行・おでかけ' } },
    { value: 'sports', label: { en: '⚽ Sports', ja: '⚽ スポーツ' } },
    { value: 'food', label: { en: '🍜 Food', ja: '🍜 ごはん会' } },
    { value: 'life', label: { en: '📋 Life in Japan help', ja: '📋 生活サポート' } },
  ],
  eventPlaceholder: {
    en: 'e.g. I want to try making Japanese sweets with Japanese students.',
    ja: '例：日本人学生と一緒に和菓子づくりをしてみたい。',
  },
  optional: { en: 'optional', ja: '任意' },
  timing: { en: 'When would be good?', ja: '希望の時期' },
  timingPlaceholder: { en: 'e.g. after exams in July', ja: '例：7月のテスト後' },
  nationality: { en: 'Nationality / comfortable language', ja: '国籍・話しやすい言語' },
  nationalityPlaceholder: { en: 'e.g. Korea / English, Korean', ja: '例：韓国 / 英語・韓国語' },
  consent: {
    en: 'I agree that TISA uses this information only to review my request and reply to me.',
    ja: '入力した情報を、TISAがリクエストの検討と返信のためだけに使うことに同意します。',
  },
  submit: { en: 'Send request', ja: 'リクエストを送る' },
  sending: { en: 'Sending…', ja: '送信中…' },
  required: { en: 'Please fill in this field.', ja: '入力してください。' },
  needEvent: { en: 'Pick an idea or write what you want.', ja: '例を選ぶか、内容を書いてください。' },
  needConsent: { en: 'Please check the box to continue.', ja: 'チェックを入れてください。' },
  doneTitle: { en: 'Request sent! 🎉', ja: '送信しました！🎉' },
  doneText: {
    en: 'Thank you! TISA staff will reply to you soon.',
    ja: 'ありがとうございます！TISAスタッフから近日中に返信します。',
  },
  another: { en: 'Send another request', ja: 'もう一件送る' },
  error: {
    en: 'Could not send. Please try again, or DM us on Instagram.',
    ja: '送信できませんでした。もう一度試すか、InstagramのDMで連絡してください。',
  },
}

export const footer = {
  join: { en: 'Want to join TISA? DM us on Instagram.', ja: 'TISAに興味がある方は、InstagramのDMまで。' },
}

// Reply templates used on the admin page. {name} is replaced with the requester's name.
export const replyTemplates = [
  {
    id: 'received',
    label: '受付しました / Received',
    en: 'Hi {name},\n\nThank you for your event request to TISA! We received it and our team is discussing it now. We will contact you again soon.\n\nTISA (Ritsumeikan OIC)',
    ja: '{name}さん\n\nTISAへのイベントリクエストありがとうございます！内容を確認し、現在スタッフで検討中です。また改めてご連絡します。\n\nTISA（立命館大学OIC）',
  },
  {
    id: 'confirmed',
    label: '開催決定 / Confirmed',
    en: 'Hi {name},\n\nGreat news — we are going to run the event you requested! Details will be posted on our Instagram (@oictisa). We hope to see you there!\n\nTISA (Ritsumeikan OIC)',
    ja: '{name}さん\n\nリクエストいただいたイベントの開催が決まりました！詳細はInstagram（@oictisa）でお知らせします。ぜひ参加してください！\n\nTISA（立命館大学OIC）',
  },
  {
    id: 'onhold',
    label: '保留 / On hold',
    en: 'Hi {name},\n\nThank you for your idea! We cannot run this event right now, but we have kept your request and will consider it for a future event.\n\nTISA (Ritsumeikan OIC)',
    ja: '{name}さん\n\nアイデアをありがとうございます！今すぐの開催は難しいのですが、リクエストは保存して今後の企画の参考にさせていただきます。\n\nTISA（立命館大学OIC）',
  },
]
