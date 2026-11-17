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

// ── Activities ────────────────────────────────────────────────
// Photos: put image files in /public/photos/ and set `photo: 'photos/xxx.jpg'`.
// While `photo` is empty, a colored card with the emoji is shown instead.
// Events are shown newest first. Dates after today get an "Upcoming" badge.

export type EventItem = {
  date: string // YYYY-MM-DD
  emoji: string
  color: string
  photo: string
  title: T
  place: T
  text: T
  link: string // Instagram post
}

export const activities = {
  title: { en: 'What we do', ja: '活動内容' },
  lead: {
    en: 'TISA turns international students’ “I’m stuck” and “I wish…” into real events.',
    ja: 'TISAは、留学生の「困った」「こうだったらいいな」をイベントとして形にするサークルです。',
  },
  seeAll: { en: 'See all activities', ja: '活動をすべて見る' },
  upcoming: { en: 'Upcoming', ja: '開催予定' },
  more: { en: 'See on Instagram ↗', ja: 'Instagramで見る ↗' },

  events: [
    {
      date: '2026-11-18',
      emoji: '🎞️',
      color: '#5BA4E6',
      photo: '',
      title: { en: 'MOVIEAT: “Weathering with You”', ja: 'MOVIEAT「天気の子」上映会' },
      place: { en: 'OIC H221', ja: 'OIC H221' },
      text: {
        en: 'Watch Makoto Shinkai’s film together with popcorn and snacks. Talking is welcome — English or Japanese, any level.',
        ja: 'ポップコーンや軽食を食べながら、新海誠監督の「天気の子」をみんなで観る会。おしゃべりOK、英語・日本語どちらでも大丈夫です。',
      },
      link: 'https://www.instagram.com/oictisa/p/Dfi3qk6ycSY/',
    },
    {
      date: '2026-10-28',
      emoji: '🎃',
      color: '#F5A23B',
      photo: '',
      title: { en: 'TISA Halloween Night', ja: 'TISA ハロウィンナイト' },
      place: { en: 'OIC Kitchen Field', ja: 'OIC キッチンフィールド' },
      text: {
        en: 'Mixed teams of international and Japanese students made glowing clay jack-o’-lanterns, winning materials in a Halloween quiz battle.',
        ja: '留学生と日本人学生のチームで、粘土のジャック・オー・ランタンを制作。ハロウィンクイズに正解して材料をゲットしながら作りました。',
      },
      link: 'https://www.instagram.com/oictisa/p/DfDfc5eE0Lq/',
    },
    {
      date: '2026-10-25',
      emoji: '⚽',
      color: '#7BC67E',
      photo: '',
      title: { en: 'International Sports Festival “Ritsu-do”', ja: '国際スポーツフェスティバル「Ritsu-do」' },
      place: { en: 'Doshisha University Kyotanabe Campus', ja: '同志社大学 京田辺キャンパス' },
      text: {
        en: 'Ritsumeikan × Doshisha. Students from different universities and countries connected through sports — no English or sports skills needed.',
        ja: '立命館×同志社。大学も国も越えて、スポーツで仲良くなるイベント。英語やスポーツが得意でなくても大丈夫。',
      },
      link: 'https://www.instagram.com/oictisa/p/DeGgrgLTZ9m/',
    },
    {
      date: '2026-10-17',
      emoji: '🍵',
      color: '#9CCB8F',
      photo: '',
      title: { en: 'Tea Ceremony Experience in Gion', ja: '祇園で茶道体験' },
      place: { en: 'Ocha to Haru, Gion, Kyoto', ja: '京都・祇園「お茶と春」' },
      text: {
        en: 'Up close with a real tea ceremony: the manners, and the spirit of caring for guests behind every movement. We also shared how guests are welcomed in each other’s countries.',
        ja: '茶道の所作と、その一つひとつに込められた「相手を想う心」を間近で体験。それぞれの国のおもてなしについても語り合いました。',
      },
      link: 'https://www.instagram.com/oictisa/p/DewmVLXkw6U/',
    },
    {
      date: '2026-10-03',
      emoji: '🍳',
      color: '#F59E8B',
      photo: '',
      title: { en: 'Potluck Party (TISA × BBP)', ja: 'ポットラックパーティー（TISA × BBP）' },
      place: { en: 'OIC Kitchen Field (G Building 1F)', ja: 'OIC キッチンフィールド（G棟1F）' },
      text: {
        en: 'Dishes from many countries, plus four team games: World Trivia, Guess the Food, Guess the Celebrity and Language Challenge.',
        ja: 'いろんな国の料理を持ち寄って、世界クイズ・料理当て・有名人当て・言語チャレンジの4つのゲームでチーム対抗戦。',
      },
      link: 'https://www.instagram.com/oictisa/p/DewBmbKE3pY/',
    },
  ] as EventItem[],
}

export const activitiesPage = {
  kicker: { en: 'Activities', ja: '活動紹介' },
  title: { en: 'From “I wish” to events.', ja: '「やりたい」を、イベントに。' },
  lead: {
    en: 'TISA is a student organization at Ritsumeikan OIC that supports international students. We listen to what students need, plan it together, and make it happen.',
    ja: 'TISAは立命館大学OICの留学生支援団体です。留学生の声を聞いて、みんなで企画して、イベントとして実現します。',
  },

  flowTitle: { en: 'How an event is born', ja: 'イベントができるまで' },
  flow: [
    { icon: '👂', title: { en: 'Listen', ja: '声を集める' }, text: { en: 'Requests from this site, DMs and surveys.', ja: 'このサイトのリクエスト、DM、アンケートから。' } },
    { icon: '🗓️', title: { en: 'Plan', ja: '企画する' }, text: { en: 'Members plan it at our Wednesday meetings.', ja: '毎週水曜の定例ミーティングで企画。' } },
    { icon: '🤝', title: { en: 'Run it together', ja: 'みんなで開催' }, text: { en: 'International and Japanese students, side by side.', ja: '留学生と日本人学生が一緒に運営。' } },
    { icon: '📸', title: { en: 'Share', ja: '発信する' }, text: { en: 'Reports and photos on Instagram.', ja: 'レポートと写真をInstagramで発信。' } },
  ],

  typesTitle: { en: 'Kinds of events', ja: 'こんなイベントをしています' },
  types: [
    { icon: '🍳', title: { en: 'Food & meetups', ja: '交流会・ごはん会' }, text: { en: 'Potlucks, welcome dinners, exchange meetups.', ja: 'ポットラック、歓迎ごはん会、交流会。' } },
    { icon: '🍵', title: { en: 'Japanese culture', ja: '日本文化体験' }, text: { en: 'Tea ceremony and other hands-on experiences.', ja: '茶道などの体験型イベント。' } },
    { icon: '🎃', title: { en: 'Seasonal events', ja: '季節のイベント' }, text: { en: 'Halloween, fireworks, training camp.', ja: 'ハロウィン、花火、合宿。' } },
    { icon: '⚽', title: { en: 'Sports', ja: 'スポーツ' }, text: { en: 'Sports days, including with other universities.', ja: '他大学と合同のスポーツイベントも。' } },
    { icon: '🎞️', title: { en: 'Movie nights', ja: '映画会' }, text: { en: 'Japanese films with snacks and chatting.', ja: '軽食を食べながら日本映画を鑑賞。' } },
    { icon: '📚', title: { en: 'Study & festivals', ja: '勉強会・学祭' }, text: { en: 'English study sessions and school festival booths.', ja: '英語勉強会や学園祭への出店。' } },
  ],

  eventsTitle: { en: 'Recent events', ja: '最近のイベント' },

  joinTitle: { en: 'Join TISA', ja: 'TISAに入ろう' },
  joinText: {
    en: 'International students are TISA members too! No English skills needed — our regular activities (planning, surveys, meetings) are mainly in Japanese. Each semester we hold open trial sessions.',
    ja: '留学生もTISAのメンバーとして活動しています！英語力は問いません。普段の活動（企画・アンケート・ミーティング）は日本語が中心です。毎学期、体験入部も開催しています。',
  },
  joinPoints: [
    { en: 'Interested in international exchange', ja: '国際交流に興味がある' },
    { en: 'Want to make friends from other countries', ja: '留学生と友だちになりたい' },
    { en: 'Want to start something new at university', ja: '大学で新しいことを始めたい' },
  ] as T[],
  joinCta: { en: 'DM us on Instagram', ja: 'InstagramでDMする' },
  requestCta: { en: 'Request an event', ja: 'イベントをリクエスト' },
  back: { en: '← Back to home', ja: '← ホームに戻る' },
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
  tooMany: {
    en: 'You just sent a request. Please wait about 10 minutes before sending another one.',
    ja: '先ほどリクエストを受け付けました。次の送信は10分ほど空けてください。',
  },
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
