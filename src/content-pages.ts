// ─────────────────────────────────────────────────────────────
// Text for the sub-pages: Team, Inside TISA, Life support.
// (Events page text is in content.ts → activities / activitiesPage)
// ─────────────────────────────────────────────────────────────
import type { T } from './content'

export const pages = {
  team: { en: 'Team', ja: '幹部紹介' },
  inside: { en: 'Inside TISA', ja: '内部活動' },
  events: { en: 'Events', ja: '交流イベント' },
  life: { en: 'Life support', ja: '生活サポート' },
  request: { en: 'Request', ja: 'リクエスト' },
  menu: { en: 'Menu', ja: 'メニュー' },
  close: { en: 'Close', ja: '閉じる' },
} satisfies Record<string, T>

export const explore = {
  title: { en: 'Explore TISA', ja: 'TISAを知る' },
  cards: [
    { to: '#/inside', icon: '🗓️', color: '#7BC67E', title: pages.inside, text: { en: 'How we work: weekly meetings, planning, joining.', ja: '定例ミーティング、企画、入部について。' } },
    { to: '#/events', icon: '🎉', color: '#F5C518', title: pages.events, text: { en: 'Potlucks, tea ceremony, Halloween and more.', ja: 'ポットラック、茶道、ハロウィンなど。' } },
    { to: '#/life', icon: '🧭', color: '#5BA4E6', title: pages.life, text: { en: 'Bank, part-time job, phone, address — step by step.', ja: '銀行・アルバイト・携帯・住所登録をステップで解説。' } },
    { to: '#/team', icon: '👋', color: '#F59E8B', title: pages.team, text: { en: 'Meet the people who run TISA.', ja: 'TISAを動かすメンバーを紹介。' } },
  ],
}

// ── Team ──────────────────────────────────────────────────────
// Fill in name / faculty / from / message. Put photos in /public/photos/team/.
// While `name` is empty the card shows "Coming soon".
export type Member = { role: T; name: string; faculty: T; from: T; message: T; photo: string; color: string }
const blank: T = { en: '', ja: '' }

export const team = {
  kicker: pages.team,
  title: { en: 'The people behind TISA', ja: 'TISAを動かすメンバー' },
  lead: {
    en: 'International and Japanese students run TISA together. Say hi at our Wednesday meetings!',
    ja: '留学生と日本人学生が一緒にTISAを運営しています。水曜日の活動に気軽に来てください！',
  },
  comingSoon: { en: 'Profile coming soon', ja: 'プロフィール準備中' },
  members: [
    { role: { en: 'President', ja: '代表' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#F5C518' },
    { role: { en: 'Vice President', ja: '副代表' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#7BC67E' },
    { role: { en: 'Treasurer', ja: '会計' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#5BA4E6' },
    { role: { en: 'Event planning', ja: 'イベント企画' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#F59E8B' },
    { role: { en: 'PR / Instagram', ja: '広報' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#9CCB8F' },
    { role: { en: 'Life support', ja: '生活サポート担当' }, name: '', faculty: blank, from: blank, message: blank, photo: '', color: '#F5A23B' },
  ] as Member[],
}

// ── Inside TISA ───────────────────────────────────────────────
export const inside = {
  kicker: pages.inside,
  title: { en: 'How TISA works', ja: 'TISAの活動のしくみ' },
  lead: {
    en: 'Every week, members meet to listen to international students, plan events and help with life in Japan.',
    ja: '毎週メンバーが集まり、留学生の声を聞き、イベントを企画し、日本での生活をサポートしています。',
  },
  meetingTitle: { en: 'Weekly meeting', ja: '定例ミーティング' },
  meetingRoom: { en: 'Usually in H221 (H Building), OIC', ja: '主にOIC H棟 H221教室' },
  doTitle: { en: 'What members do', ja: 'メンバーの活動内容' },
  dos: [
    { icon: '💡', title: { en: 'Plan events', ja: 'イベント企画' }, text: { en: 'Turn requests into events — budget, place, posters, the day itself.', ja: 'リクエストをもとに、予算・会場・告知・当日運営まで。' } },
    { icon: '📋', title: { en: 'Surveys', ja: 'アンケート' }, text: { en: 'Ask international students what they need.', ja: '留学生が何に困っているか、何をしたいかを調査。' } },
    { icon: '🧭', title: { en: 'Life support', ja: '生活サポート' }, text: { en: 'Help with questions about life in Japan.', ja: '日本での生活の困りごとの相談にのる。' } },
    { icon: '📸', title: { en: 'PR', ja: '広報' }, text: { en: 'Posters, Instagram posts and event reports.', ja: 'ポスター制作、Instagram投稿、イベントレポート。' } },
    { icon: '🤝', title: { en: 'Collaborations', ja: '他団体とのコラボ' }, text: { en: 'Joint events with other clubs and universities.', ja: '他のサークルや他大学との合同イベント。' } },
  ],
}

// ── Life support ──────────────────────────────────────────────
// ⚠ Rules change. Re-check the official links at least once a year.
export type Guide = {
  id: string
  icon: string
  color: string
  title: T
  summary: T
  bring: T[]
  steps: T[]
  tips: T[]
  links: { label: T; url: string }[]
}

export const life = {
  kicker: pages.life,
  title: { en: 'Life in Japan, step by step', ja: '日本の生活手続き、ステップで解説' },
  lead: {
    en: 'The four things almost every new international student needs to do. Do them in this order — each one makes the next easier.',
    ja: '新しく来た留学生がほぼ必ずやる4つの手続き。この順番でやると、次の手続きがスムーズになります。',
  },
  orderTitle: { en: 'Recommended order', ja: 'おすすめの順番' },
  orderNote: {
    en: 'Have an international credit card? You can get a phone before the bank account.',
    ja: '海外のクレジットカードがある人は、銀行口座より先に携帯を契約してもOK。',
  },
  bringTitle: { en: 'What to bring', ja: '持ち物' },
  stepsTitle: { en: 'Steps', ja: '手順' },
  tipsTitle: { en: 'Good to know', ja: 'ポイント' },
  linksTitle: { en: 'Official information', ja: '公式情報' },
  disclaimer: {
    en: 'This page is a student-made guide (checked November 2026). Rules can change — always check the official links, or ask Ritsumeikan’s international student office.',
    ja: 'このページは学生が作成したガイドです（2026年11月時点）。制度は変わることがあるので、必ず公式情報か大学の留学生窓口で確認してください。',
  },
  stuckTitle: { en: 'Still stuck?', ja: 'それでも困ったら' },
  stuckText: { en: 'Ask TISA! Come to our Wednesday meeting or DM us on Instagram.', ja: 'TISAに相談してください！水曜日の活動に来るか、InstagramでDMを。' },

  guides: [
    {
      id: 'address',
      icon: '🏠',
      color: '#7BC67E',
      title: { en: 'Address registration', ja: '住所登録（転入届）' },
      summary: {
        en: 'Within 14 days of moving in, register your address at the city office where you live.',
        ja: '住み始めてから14日以内に、住んでいる市区町村の役所で住所を登録します。',
      },
      bring: [
        { en: 'Residence card (在留カード)', ja: '在留カード' },
        { en: 'Passport', ja: 'パスポート' },
        { en: 'Moving from another city in Japan: moving-out certificate (転出証明書) and My Number card if you have one', ja: '日本国内の他の市から引っ越した場合：転出証明書、マイナンバーカード（持っている人）' },
      ],
      steps: [
        { en: 'Go to the city office of the city you live in (OIC is in Ibaraki City → Ibaraki City Hall).', ja: '住んでいる市の役所へ行く（OICは茨木市 → 茨木市役所）。' },
        { en: 'At the resident registration counter (市民課), submit a moving-in notification (転入届).', ja: '市民課の窓口で「転入届」を出す。' },
        { en: 'Your new address is written on the back of your residence card.', ja: '在留カードの裏面に新しい住所が記入されます。' },
        { en: 'In the same visit, join National Health Insurance (国民健康保険) and ask about the student exemption for National Pension (学生納付特例).', ja: '同じ日に国民健康保険に加入し、国民年金の「学生納付特例」についても相談する。' },
        { en: 'Your My Number notice arrives by mail later. Keep it safe — you need it for work.', ja: '後日マイナンバーの通知が郵送で届きます。アルバイトで必要なので大切に保管。' },
      ],
      tips: [
        { en: 'Do this first: bank accounts and phone contracts need the address on your residence card.', ja: '最初にやること：銀行口座や携帯の契約には、在留カードに住所が書かれている必要があります。' },
        { en: 'If you live outside Ibaraki City, go to your own city’s office.', ja: '茨木市以外に住んでいる人は、自分の市の役所へ。' },
        { en: 'Moving again? Do the same procedure within 14 days.', ja: '引っ越したときも、14日以内に同じ手続きを。' },
      ],
      links: [
        { label: { en: 'Ibaraki City official site', ja: '茨木市 公式サイト' }, url: 'https://www.city.ibaraki.osaka.jp/' },
      ],
    },
    {
      id: 'bank',
      icon: '🏦',
      color: '#F5C518',
      title: { en: 'Japan Post Bank account', ja: 'ゆうちょ銀行の口座開設' },
      summary: {
        en: 'Japan Post Bank (ゆうちょ銀行) is the easiest bank for students. You need it for your part-time job salary and phone bill.',
        ja: '留学生が一番作りやすいのがゆうちょ銀行。アルバイトの給料や携帯料金の支払いに必要です。',
      },
      bring: [
        { en: 'Residence card with your current address on it', ja: '現住所が記載された在留カード' },
        { en: 'Student ID card', ja: '学生証' },
        { en: 'Passport', ja: 'パスポート' },
        { en: 'A Japanese phone number makes it smoother (if you have one)', ja: '日本の電話番号（あればスムーズ）' },
      ],
      steps: [
        { en: 'Go to a post office with a Japan Post Bank counter (ゆうちょ窓口).', ja: 'ゆうちょ銀行の窓口がある郵便局へ行く。' },
        { en: 'Fill in the application. Japan Post Bank has a multilingual service to prepare the form in advance.', ja: '申込書を記入する。多言語の申込書作成サービスで事前に作っておくこともできます。' },
        { en: 'Show your documents. Your passbook (通帳) is usually given on the day.', ja: '本人確認書類を提示。通帳は基本的にその場で受け取れます。' },
        { en: 'Your cash card arrives by registered mail at your address in about 1–2 weeks.', ja: 'キャッシュカードは1〜2週間ほどで住所に郵送されます。' },
      ],
      tips: [
        { en: 'You cannot open an account if your period of stay ends within 3 months of applying.', ja: '申込日から3か月以内に在留期間が切れる場合は、口座を開設できません。' },
        { en: 'The Yucho app can also be used, but residence cards issued on or after June 14, 2026 cannot be used in the app for now — go to a counter instead. App review takes about a week.', ja: 'ゆうちょ手続きアプリでも申込めますが、2026年6月14日以降に発行された在留カードは当面アプリで使えません。窓口で手続きしてください。アプリの審査は約1週間。' },
        { en: 'Don’t lend or sell your account or card to anyone — it is a crime.', ja: '口座やカードを他人に貸したり売ったりするのは犯罪です。絶対にしないでください。' },
      ],
      links: [
        { label: { en: 'Japan Post Bank: opening an account (foreign residents)', ja: 'ゆうちょ銀行：口座開設のご案内' }, url: 'https://www.jp-bank.japanpost.jp/kaisetu/kat_index.html' },
      ],
    },
    {
      id: 'phone',
      icon: '📱',
      color: '#5BA4E6',
      title: { en: 'Phone contract', ja: '携帯電話の契約' },
      summary: {
        en: 'A Japanese phone number is needed for many sign-ups and job applications. Cheaper plans can cost around ¥1,000 a month.',
        ja: '日本の電話番号は、いろんな登録やアルバイトの応募に必要です。安いプランなら月1,000円前後からあります。',
      },
      bring: [
        { en: 'Residence card (with your address registered)', ja: '在留カード（住所登録済みのもの）' },
        { en: 'Passport', ja: 'パスポート' },
        { en: 'Payment method: credit card, or Japanese bank account / cash card', ja: '支払い方法：クレジットカード、または日本の銀行口座・キャッシュカード' },
        { en: 'A SIM-unlocked phone, if you use your own', ja: '自分のスマホを使う場合は、SIMロック解除済みの端末' },
      ],
      steps: [
        { en: 'Choose a type: big carriers (docomo, au, SoftBank) have shops with staff help; cheaper online plans and MVNO SIMs are mostly in Japanese only.', ja: '種類を選ぶ：大手キャリア（ドコモ・au・ソフトバンク）は店舗で相談できる。格安プランや格安SIMは安いが、手続きは主にオンラインで日本語のみが多い。' },
        { en: 'Check your phone works with eSIM or a physical SIM for that company.', ja: '自分のスマホがその会社のeSIM・SIMに対応しているか確認。' },
        { en: 'Apply in a shop or online with your documents and payment method.', ja: '店舗かオンラインで、書類と支払い方法を用意して申し込む。' },
        { en: 'Activate the SIM / eSIM and test calls and data.', ja: 'SIM・eSIMを開通させて、通話とデータ通信を確認。' },
      ],
      tips: [
        { en: 'Online contracts usually fail if the address on your ID is different from your current address.', ja: '本人確認書類の住所が現住所と違うと、オンライン契約はできないことが多いです。' },
        { en: 'Not sure? Go with a TISA member who speaks Japanese.', ja: '不安なら、日本語が話せるTISAメンバーと一緒に行こう。' },
        { en: 'Before you leave Japan, cancel the contract and pay the final bill.', ja: '帰国前には解約して、最後の料金を精算してください。' },
      ],
      links: [],
    },
    {
      id: 'job',
      icon: '💼',
      color: '#F59E8B',
      title: { en: 'Finding a part-time job', ja: 'アルバイトの探し方' },
      summary: {
        en: 'International students can work part-time — but only with permission, and only within the hour limits.',
        ja: '留学生もアルバイトできます。ただし許可が必要で、時間の上限があります。',
      },
      bring: [
        { en: 'Residence card with the work permission stamp on the back', ja: '裏面に資格外活動許可の記載がある在留カード' },
        { en: 'Japanese bank account (for your salary)', ja: '日本の銀行口座（給料の振込用）' },
        { en: 'My Number', ja: 'マイナンバー' },
        { en: 'Résumé (履歴書) with a photo, if the job asks for one', ja: '写真付きの履歴書（必要な場合）' },
      ],
      steps: [
        { en: 'Get “Permission to Engage in Activity Other Than That Permitted” (資格外活動許可). It is often given at the airport; if not, apply at the Immigration Services Bureau.', ja: '「資格外活動許可」を取る。空港で入国時にもらえることが多く、もらっていない場合は出入国在留管理局で申請。' },
        { en: 'Look for jobs: job sites such as Townwork, Baitoru or Indeed, the university’s job board, or ask TISA members.', ja: '仕事を探す：タウンワーク、バイトル、Indeedなどの求人サイト、大学の求人掲示、TISAメンバーに聞くなど。' },
        { en: 'Apply, then go to the interview with your documents.', ja: '応募して、書類を持って面接へ。' },
        { en: 'Keep track of your hours every week.', ja: '毎週の勤務時間をきちんと記録する。' },
      ],
      tips: [
        { en: 'Up to 28 hours per week in total across all jobs — counted from any day of the week.', ja: 'すべてのバイト先の合計で週28時間まで。どの曜日から数えても28時間を超えないこと。' },
        { en: 'During long vacations set by the university, up to 8 hours a day.', ja: '大学が学則で定めた長期休業期間中は、1日8時間まで。' },
        { en: 'No work at all during a leave of absence (休学).', ja: '休学中はアルバイトできません。' },
        { en: 'Never work at adult-entertainment businesses (e.g. hostess bars, pachinko, mahjong parlors) — not even cleaning or dishwashing.', ja: '風俗営業（キャバクラ、パチンコ、麻雀店など）では、掃除や皿洗いでも働けません。' },
        { en: 'Breaking these rules can cost you your visa.', ja: 'ルール違反は、在留資格を失う原因になります。' },
      ],
      links: [
        { label: { en: 'Immigration Services Agency: work permission', ja: '出入国在留管理庁：資格外活動許可' }, url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html' },
      ],
    },
  ] as Guide[],
}
