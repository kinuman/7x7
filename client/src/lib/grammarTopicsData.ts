import { GrammarTopic, LearningQuestion, EikenGrade } from "@shared/types";

export const grammarTopics: GrammarTopic[] = [
  // ==================== 英検5級 ====================

  {
    id: "5-infinitive-gerund",
    title: "不定詞と動名詞の基本",
    description: "to do と doing の使い分けを学ぶ",
    grade: "5",
    grammarType: "both",
    timelinePosition: "future",
    explanation:
      "不定詞（to do）は未来の行動や目的を表し、動名詞（doing）は現在の経験や習慣を表します。",
    examples: [
      {
        english: "I want to travel.",
        japanese: "私は旅行に行きたい。（未来の希望）",
      },
      {
        english: "I enjoy traveling.",
        japanese: "私は旅行を楽しむ。（現在の経験）",
      },
    ],
  },

  {
    id: "5-present-simple",
    title: "現在形",
    description: "日常的な行動や状態を表す",
    grade: "5",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "現在形は習慣的な行動や一般的な真実を表します。",
    examples: [
      {
        english: "I play tennis every day.",
        japanese: "私は毎日テニスをします。",
      },
    ],
  },

  {
    id: "5-past-simple",
    title: "過去形",
    description: "過去の出来事を表す",
    grade: "5",
    grammarType: "infinitive",
    timelinePosition: "past",
    explanation: "過去形は完了した過去の行動を表します。",
    examples: [
      {
        english: "I played tennis yesterday.",
        japanese: "私は昨日テニスをしました。",
      },
    ],
  },

  // ==================== 英検4級 ====================

  {
    id: "4-present-continuous",
    title: "現在進行形",
    description: "今、進行中の行動を表す",
    grade: "4",
    grammarType: "gerund",
    timelinePosition: "present",
    explanation: "現在進行形は今、この瞬間に行われている行動を表します。",
    examples: [
      {
        english: "I am reading a book.",
        japanese: "私は本を読んでいます。",
      },
    ],
  },

  {
    id: "4-future-simple",
    title: "未来形",
    description: "これからの行動を表す",
    grade: "4",
    grammarType: "infinitive",
    timelinePosition: "future",
    explanation: "未来形は will を使ってこれからの行動を表します。",
    examples: [
      {
        english: "I will play tennis tomorrow.",
        japanese: "私は明日テニスをします。",
      },
    ],
  },

  {
    id: "4-passive-voice",
    title: "受動態",
    description: "行動の対象になることを表す",
    grade: "4",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "受動態は be + 過去分詞で、行動の対象になることを表します。",
    examples: [
      {
        english: "The book is read by many people.",
        japanese: "その本は多くの人に読まれています。",
      },
    ],
  },

  // ==================== 英検3級 ====================

  {
    id: "3-present-perfect",
    title: "現在完了形",
    description: "過去から現在までの経験や状態を表す",
    grade: "3",
    grammarType: "gerund",
    timelinePosition: "past",
    explanation: "現在完了形は have + 過去分詞で、過去の経験や現在までの状態を表します。",
    examples: [
      {
        english: "I have read this book.",
        japanese: "私はこの本を読んだことがあります。",
      },
    ],
  },

  {
    id: "3-conditional",
    title: "条件文",
    description: "仮定の状況を表す",
    grade: "3",
    grammarType: "infinitive",
    timelinePosition: "future",
    explanation: "条件文は if を使って仮定の状況を表します。",
    examples: [
      {
        english: "If I have time, I will play tennis.",
        japanese: "時間があれば、テニスをします。",
      },
    ],
  },

  {
    id: "3-relative-clause",
    title: "関係代名詞",
    description: "名詞を修飾する句を作る",
    grade: "3",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "関係代名詞は who, which, that などを使って名詞を修飾します。",
    examples: [
      {
        english: "The book that I read is interesting.",
        japanese: "私が読んだ本は面白いです。",
      },
    ],
  },

  // ==================== 英検準2級 ====================

  {
    id: "pre2-past-continuous",
    title: "過去進行形",
    description: "過去のある時点で進行中だった行動を表す",
    grade: "準2",
    grammarType: "gerund",
    timelinePosition: "past",
    explanation: "過去進行形は was/were + -ing で、過去のある時点で進行中だった行動を表します。",
    examples: [
      {
        english: "I was reading when you called.",
        japanese: "あなたが電話したとき、私は読んでいました。",
      },
    ],
  },

  {
    id: "pre2-reported-speech",
    title: "間接話法",
    description: "他人の言葉を報告する",
    grade: "準2",
    grammarType: "infinitive",
    timelinePosition: "past",
    explanation: "間接話法は他人の言葉を報告する際に時制を変えます。",
    examples: [
      {
        english: "He said that he would come.",
        japanese: "彼は来ると言いました。",
      },
    ],
  },

  {
    id: "pre2-causative",
    title: "使役動詞",
    description: "誰かに何かをさせる",
    grade: "準2",
    grammarType: "infinitive",
    timelinePosition: "future",
    explanation: "使役動詞 make, let, have などは誰かに何かをさせることを表します。",
    examples: [
      {
        english: "I made him do it.",
        japanese: "私は彼にそれをさせました。",
      },
    ],
  },

  // ==================== 英検2級 ====================

  {
    id: "2-perfect-continuous",
    title: "完了進行形",
    description: "過去から現在まで継続している行動を表す",
    grade: "2",
    grammarType: "gerund",
    timelinePosition: "past",
    explanation: "完了進行形は have been + -ing で、過去から現在まで継続している行動を表します。",
    examples: [
      {
        english: "I have been reading this book for two hours.",
        japanese: "私は2時間この本を読み続けています。",
      },
    ],
  },

  {
    id: "2-inversion",
    title: "倒置",
    description: "文の語順を変えて強調する",
    grade: "2",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "倒置は通常の語順を変えて強調や特定の文法構造を作ります。",
    examples: [
      {
        english: "Never have I seen such a beautiful sunset.",
        japanese: "こんなに美しい夕焼けを見たことがありません。",
      },
    ],
  },

  {
    id: "2-subjunctive",
    title: "仮定法",
    description: "事実と異なる仮定を表す",
    grade: "2",
    grammarType: "infinitive",
    timelinePosition: "future",
    explanation: "仮定法は事実と異なる仮定や願いを表します。",
    examples: [
      {
        english: "If I were you, I would do it.",
        japanese: "もし私があなただったら、そうします。",
      },
    ],
  },

  // ==================== 英検準1級 ====================

  {
    id: "pre1-cleft-sentence",
    title: "分裂文",
    description: "特定の要素を強調する",
    grade: "準1",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "分裂文は It is ... that を使って特定の要素を強調します。",
    examples: [
      {
        english: "It was yesterday that I met him.",
        japanese: "昨日彼に会ったのです。",
      },
    ],
  },

  {
    id: "pre1-nominalization",
    title: "名詞化",
    description: "動詞や形容詞を名詞に変える",
    grade: "準1",
    grammarType: "gerund",
    timelinePosition: "present",
    explanation: "名詞化は動詞や形容詞を名詞に変えて、より抽象的な表現にします。",
    examples: [
      {
        english: "The development of technology is important.",
        japanese: "技術の発展は重要です。",
      },
    ],
  },

  {
    id: "pre1-ellipsis",
    title: "省略",
    description: "文の一部を省略する",
    grade: "準1",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "省略は文の繰り返しを避けるために文の一部を省略します。",
    examples: [
      {
        english: "He can speak English, and so can she.",
        japanese: "彼は英語が話せます。彼女も話せます。",
      },
    ],
  },

  // ==================== 英検1級 ====================

  {
    id: "1-absolute-phrase",
    title: "絶対句",
    description: "独立した修飾句を作る",
    grade: "1",
    grammarType: "gerund",
    timelinePosition: "present",
    explanation: "絶対句は名詞 + 分詞で、文全体を修飾する独立した句を作ります。",
    examples: [
      {
        english: "The sun having set, we returned home.",
        japanese: "太陽が沈んだので、私たちは家に帰りました。",
      },
    ],
  },

  {
    id: "1-subjunctive-advanced",
    title: "高度な仮定法",
    description: "複雑な仮定の状況を表す",
    grade: "1",
    grammarType: "infinitive",
    timelinePosition: "future",
    explanation: "高度な仮定法は複雑な仮定や願いを表現します。",
    examples: [
      {
        english: "I wish I had known about it earlier.",
        japanese: "もっと早くそれについて知っていればよかったのに。",
      },
    ],
  },

  {
    id: "1-rhetorical-device",
    title: "修辞的表現",
    description: "文学的な表現技法を使う",
    grade: "1",
    grammarType: "infinitive",
    timelinePosition: "present",
    explanation: "修辞的表現は文学的な効果を生み出すための表現技法です。",
    examples: [
      {
        english: "The world is but a stage.",
        japanese: "世界は単なる舞台に過ぎない。",
      },
    ],
  },
];

/**
 * 特定の級のトピックを取得
 */
export function getTopicsByGrade(grade: string): GrammarTopic[] {
  return grammarTopics.filter((topic) => topic.grade === grade);
}

/**
 * 特定の文法タイプのトピックを取得
 */
export function getTopicsByGrammarType(grammarType: string): GrammarTopic[] {
  return grammarTopics.filter((topic) => topic.grammarType === grammarType || topic.grammarType === "both");
}

/**
 * 特定の時間軸のトピックを取得
 */
export function getTopicsByTimeline(timelinePosition: string): GrammarTopic[] {
  return grammarTopics.filter((topic) => topic.timelinePosition === timelinePosition);
}

function getDifficultyForGrade(grade: EikenGrade): "easy" | "medium" | "hard" {
  if (grade === "5" || grade === "4") return "easy";
  if (grade === "3" || grade === "準2") return "medium";
  return "hard";
}

function getTimelineLabel(timelinePosition: string): string {
  switch (timelinePosition) {
    case "past":
      return "過去の出来事を表す表現です。";
    case "present":
      return "現在の状態や習慣を表す表現です。";
    case "future":
      return "未来の予定や可能性を表す表現です。";
    default:
      return "時間の流れに関する一般的な表現です。";
  }
}

type SentencePair = {
  english: string;
  japanese: string;
};

function getLevelForGrade(grade: EikenGrade): "basic" | "intermediate" | "advanced" {
  if (grade === "5" || grade === "4") return "basic";
  if (grade === "3" || grade === "準2" || grade === "2") return "intermediate";
  return "advanced";
}

const basicPresentSentences: SentencePair[] = [
  { english: "I study English every day.", japanese: "私は毎日英語を勉強します。" },
  { english: "She plays tennis after school.", japanese: "彼女は放課後にテニスをします。" },
  { english: "They read books in the library.", japanese: "彼らは図書館で本を読みます。" },
  { english: "He watches TV at night.", japanese: "彼は夜にテレビを見ます。" },
  { english: "We walk to school together.", japanese: "私たちは一緒に学校へ歩いて行きます。" },
  { english: "You drink milk every morning.", japanese: "あなたは毎朝牛乳を飲みます。" },
  { english: "I do my homework after dinner.", japanese: "私は夕食のあとに宿題をします。" },
  { english: "She sings songs in her room.", japanese: "彼女は自分の部屋で歌を歌います。" },
  { english: "They play soccer on Sundays.", japanese: "彼らは日曜日にサッカーをします。" },
  { english: "He likes math and science.", japanese: "彼は算数と理科が好きです。" },
];

const basicPastSentences: SentencePair[] = [
  { english: "I studied English yesterday.", japanese: "私は昨日英語を勉強しました。" },
  { english: "She played tennis last weekend.", japanese: "彼女は先週末テニスをしました。" },
  { english: "They read that book last year.", japanese: "彼らは去年その本を読みました。" },
  { english: "He watched a movie last night.", japanese: "彼は昨夜映画を見ました。" },
  { english: "We walked to the park together.", japanese: "私たちは一緒に公園まで歩きました。" },
  { english: "You drank juice at the party.", japanese: "あなたはパーティーでジュースを飲みました。" },
  { english: "I did my homework before dinner.", japanese: "私は夕食の前に宿題をしました。" },
  { english: "She sang a song on stage.", japanese: "彼女はステージで歌を歌いました。" },
  { english: "They played soccer after school.", japanese: "彼らは放課後にサッカーをしました。" },
  { english: "He liked that TV program.", japanese: "彼はそのテレビ番組が好きでした。" },
];

const basicFutureSentences: SentencePair[] = [
  { english: "I will study English tomorrow.", japanese: "私は明日英語を勉強します。" },
  { english: "She will play tennis next week.", japanese: "彼女は来週テニスをします。" },
  { english: "They will read this book soon.", japanese: "彼らはもうすぐこの本を読みます。" },
  { english: "He will watch a movie tonight.", japanese: "彼は今夜映画を見ます。" },
  { english: "We will walk to the station together.", japanese: "私たちは一緒に駅まで歩きます。" },
  { english: "You will drink tea after lunch.", japanese: "あなたは昼食のあとお茶を飲みます。" },
  { english: "I will do my homework later.", japanese: "私はあとで宿題をします。" },
  { english: "She will sing at the school festival.", japanese: "彼女は学校祭で歌います。" },
  { english: "They will play soccer tomorrow morning.", japanese: "彼らは明日の朝サッカーをします。" },
  { english: "He will like this new game.", japanese: "彼はこの新しいゲームを気に入るでしょう。" },
];

const intermediatePresentSentences: SentencePair[] = [
  { english: "I usually take the train to school.", japanese: "私はたいてい電車で学校へ行きます。" },
  { english: "She often helps her mother with cooking.", japanese: "彼女はよく母親の料理を手伝います。" },
  { english: "They sometimes visit their grandparents.", japanese: "彼らはときどき祖父母を訪ねます。" },
  { english: "He rarely watches TV on weekdays.", japanese: "彼は平日にテレビをほとんど見ません。" },
  { english: "We always start class at nine o'clock.", japanese: "私たちはいつも9時に授業を始めます。" },
  { english: "You usually study in the library after school.", japanese: "あなたは放課後たいてい図書館で勉強します。" },
  { english: "I sometimes read English newspapers online.", japanese: "私はときどきオンラインで英字新聞を読みます。" },
  { english: "She always carries a dictionary with her.", japanese: "彼女はいつも辞書を持ち歩きます。" },
  { english: "They often talk about their future dreams.", japanese: "彼らはよく将来の夢について話します。" },
  { english: "He usually finishes his homework before dinner.", japanese: "彼はたいてい夕食前に宿題を終えます。" },
];

const intermediatePastSentences: SentencePair[] = [
  { english: "I was studying when you called me.", japanese: "あなたが電話したとき、私は勉強していました。" },
  { english: "She was cooking dinner at seven o'clock.", japanese: "彼女は7時に夕食を作っていました。" },
  { english: "They were playing soccer in the park then.", japanese: "そのとき彼らは公園でサッカーをしていました。" },
  { english: "He was watching TV while eating snacks.", japanese: "彼はお菓子を食べながらテレビを見ていました。" },
  { english: "We were talking about the test yesterday.", japanese: "私たちは昨日テストについて話していました。" },
  { english: "You were sleeping when it started to rain.", japanese: "雨が降り始めたとき、あなたは眠っていました。" },
  { english: "I was reading a novel on the train.", japanese: "私は電車の中で小説を読んでいました。" },
  { english: "She was listening to music after school.", japanese: "彼女は放課後音楽を聞いていました。" },
  { english: "They were studying in the library last night.", japanese: "彼らは昨夜図書館で勉強していました。" },
  { english: "He was practicing the piano for two hours.", japanese: "彼は2時間ピアノの練習をしていました。" },
];

const intermediateFutureSentences: SentencePair[] = [
  { english: "I am going to study abroad next year.", japanese: "私は来年留学する予定です。" },
  { english: "She is going to join the tennis club.", japanese: "彼女はテニス部に入るつもりです。" },
  { english: "They are going to visit Kyoto this summer.", japanese: "彼らはこの夏京都を訪れる予定です。" },
  { english: "He is going to take an English test in June.", japanese: "彼は6月に英語のテストを受ける予定です。" },
  { english: "We are going to have a party next Friday.", japanese: "私たちは来週の金曜日にパーティーをする予定です。" },
  { english: "You are going to meet your friends tomorrow.", japanese: "あなたは明日友達に会う予定です。" },
  { english: "I am going to start a new hobby soon.", japanese: "私はもうすぐ新しい趣味を始めるつもりです。" },
  { english: "She is going to read that difficult book.", japanese: "彼女はその難しい本を読むつもりです。" },
  { english: "They are going to practice speaking every day.", japanese: "彼らは毎日スピーキングの練習をする予定です。" },
  { english: "He is going to study harder for the next exam.", japanese: "彼は次の試験に向けてもっと一生懸命勉強するつもりです。" },
];

const advancedPresentSentences: SentencePair[] = [
  { english: "I have studied English for five years.", japanese: "私は5年間英語を勉強しています。" },
  { english: "She has already finished her homework.", japanese: "彼女はすでに宿題を終えています。" },
  { english: "They have just arrived at the station.", japanese: "彼らはちょうど駅に着いたところです。" },
  { english: "He has never been to a foreign country.", japanese: "彼は一度も外国に行ったことがありません。" },
  { english: "We have visited this museum several times.", japanese: "私たちはこの博物館を何度か訪れたことがあります。" },
  { english: "You have become much better at speaking.", japanese: "あなたはスピーキングがとても上達しました。" },
  { english: "I have already read that difficult novel.", japanese: "私はその難しい小説をすでに読みました。" },
  { english: "She has lived in this town since she was ten.", japanese: "彼女は10歳のときからこの町に住んでいます。" },
  { english: "They have known each other for a long time.", japanese: "彼らは長い間お互いを知っています。" },
  { english: "He has just decided to study overseas.", japanese: "彼はちょうど留学すると決めたところです。" },
];

const advancedPastSentences: SentencePair[] = [
  { english: "I had finished dinner when he came home.", japanese: "彼が帰宅したとき、私は夕食を食べ終えていました。" },
  { english: "She had already left before I arrived.", japanese: "私が到着する前に、彼女はすでに出発していました。" },
  { english: "They had studied hard before the exam started.", japanese: "試験が始まる前に、彼らは一生懸命勉強していました。" },
  { english: "He had never seen such a beautiful view.", japanese: "彼はそのように美しい景色を見たことがありませんでした。" },
  { english: "We had been friends for ten years then.", japanese: "そのとき私たちは10年間友達でした。" },
  { english: "You had already heard the news, hadn't you?", japanese: "あなたはすでにそのニュースを聞いていましたよね。" },
  { english: "I had thought the test would be easier.", japanese: "私はテストはもっと簡単だと思っていました。" },
  { english: "She had practiced piano before the concert.", japanese: "彼女はコンサートの前にピアノを練習していました。" },
  { english: "They had finished the project by the deadline.", japanese: "彼らは締め切りまでにそのプロジェクトを終えていました。" },
  { english: "He had already gone to bed when I called.", japanese: "私が電話したとき、彼はすでに寝ていました。" },
];

const advancedFutureSentences: SentencePair[] = [
  { english: "I will have finished this book by tomorrow.", japanese: "私は明日までにこの本を読み終えているでしょう。" },
  { english: "She will have graduated from high school next year.", japanese: "彼女は来年高校を卒業しているでしょう。" },
  { english: "They will have lived here for ten years by then.", japanese: "そのときまでに彼らはここに10年間住んでいることになります。" },
  { english: "He will have completed the report by Friday.", japanese: "彼は金曜日までにレポートを完成させているでしょう。" },
  { english: "We will have arrived at the airport by noon.", japanese: "私たちは正午までに空港に着いているでしょう。" },
  { english: "You will have improved your English a lot by summer.", japanese: "あなたは夏までに英語がとても上達しているでしょう。" },
  { english: "I will have saved enough money for the trip.", japanese: "私は旅行のために十分なお金を貯めているでしょう。" },
  { english: "She will have read all the books on the list.", japanese: "彼女はリストの本をすべて読んでいるでしょう。" },
  { english: "They will have finished the project by next week.", japanese: "彼らは来週までにそのプロジェクトを終えているでしょう。" },
  { english: "He will have taken the exam three times by then.", japanese: "彼はそのときまでにその試験を3回受けているでしょう。" },
];

function getSentencePool(grade: EikenGrade, timelinePosition: string): SentencePair[] {
  const level = getLevelForGrade(grade);
  if (level === "basic") {
    if (timelinePosition === "past") return basicPastSentences;
    if (timelinePosition === "future") return basicFutureSentences;
    return basicPresentSentences;
  }
  if (level === "intermediate") {
    if (timelinePosition === "past") return intermediatePastSentences;
    if (timelinePosition === "future") return intermediateFutureSentences;
    return intermediatePresentSentences;
  }
  if (timelinePosition === "past") return advancedPastSentences;
  if (timelinePosition === "future") return advancedFutureSentences;
  return advancedPresentSentences;
}

const QUESTIONS_PER_TOPIC = 48;

export const eikenGrammarQuestions: LearningQuestion[] = grammarTopics.flatMap((topic, topicIndex) => {
  const questions: LearningQuestion[] = [];
  const sentencePool = getSentencePool(topic.grade, topic.timelinePosition);
  const baseId = `grammar-${topic.id}`;
  const poolLength = sentencePool.length;

  for (let i = 0; i < QUESTIONS_PER_TOPIC; i += 1) {
    const sentence = sentencePool[i % poolLength];
    const difficultyIndex = i % 3;
    const baseDifficulty = getDifficultyForGrade(topic.grade);
    let difficulty: "easy" | "medium" | "hard" = baseDifficulty;
    if (difficultyIndex === 0) difficulty = "easy";
    if (difficultyIndex === 1) difficulty = "medium";
    if (difficultyIndex === 2) difficulty = "hard";

    const patternType = i % 3;
    const questionId = `${baseId}-${i + 1}`;

    if (patternType === 0) {
      const incorrect1 = sentencePool[(i + 1) % poolLength].japanese;
      const incorrect2 = sentencePool[(i + 2) % poolLength].japanese;
      const correctIndex = (topicIndex + i) % 3;
      const candidates = [sentence.japanese, incorrect1, incorrect2];

      const options = candidates.map((text, index) => ({
        id: String.fromCharCode(97 + index),
        text,
        isCorrect: index === correctIndex,
        explanation: index === correctIndex ? "文の意味に最も近い選択肢です。" : "文の内容と完全には一致しません。",
      }));

      questions.push({
        id: questionId,
        topicId: topic.id,
        grade: topic.grade,
        questionType: "multiple-choice",
        question: `次の英文の意味として最も近い日本語はどれですか？ ${sentence.english}`,
        options,
        explanation: topic.explanation,
        difficulty,
        timelineHint: topic.timelinePosition,
      });
      continue;
    }

    if (patternType === 1) {
      const incorrect1 = sentencePool[(i + 3) % poolLength].english;
      const incorrect2 = sentencePool[(i + 4) % poolLength].english;
      const correctIndex = (topicIndex + i * 2) % 3;
      const candidates = [sentence.english, incorrect1, incorrect2];

      const options = candidates.map((text, index) => ({
        id: String.fromCharCode(97 + index),
        text,
        isCorrect: index === correctIndex,
        explanation: index === correctIndex ? "日本文の意味を正しく表しています。" : "日本文の内容とは異なります。",
      }));

      questions.push({
        id: questionId,
        topicId: topic.id,
        grade: topic.grade,
        questionType: "multiple-choice",
        question: `次の日本文に最も近い意味の英文はどれですか？ ${sentence.japanese}`,
        options,
        explanation: topic.explanation,
        difficulty,
        timelineHint: topic.timelinePosition,
      });
      continue;
    }

    const options = [
      {
        id: "a",
        text: "過去の出来事を中心にした表現",
        isCorrect: topic.timelinePosition === "past",
        explanation: "過去のある時点や経験を表す表現です。",
      },
      {
        id: "b",
        text: "今この瞬間や普段の状態を表す表現",
        isCorrect: topic.timelinePosition === "present",
        explanation: "現在の状態や習慣を表す表現です。",
      },
      {
        id: "c",
        text: "これから起こることや可能性を表す表現",
        isCorrect: topic.timelinePosition === "future",
        explanation: "未来の予定や可能性を表す表現です。",
      },
    ];

    questions.push({
      id: questionId,
      topicId: topic.id,
      grade: topic.grade,
      questionType: "multiple-choice",
      question: `次の英文の時間のイメージとして最も近いものはどれですか？ ${sentence.english}`,
      options,
      explanation: getTimelineLabel(topic.timelinePosition),
      difficulty,
      timelineHint: topic.timelinePosition,
    });
  }

  return questions;
});

export function getGrammarQuestionsByGrade(grade: EikenGrade): LearningQuestion[] {
  return eikenGrammarQuestions.filter((q) => q.grade === grade);
}
