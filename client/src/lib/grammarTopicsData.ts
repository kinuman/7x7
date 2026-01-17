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

export const eikenGrammarQuestions: LearningQuestion[] = grammarTopics.flatMap((topic) => {
  const questions: LearningQuestion[] = [];
  const baseId = `grammar-${topic.id}`;
  const difficulty = getDifficultyForGrade(topic.grade);

  const example = topic.examples[0];

  if (example) {
    questions.push({
      id: `${baseId}-1`,
      topicId: topic.id,
      grade: topic.grade,
      questionType: "multiple-choice",
      question: `「${example.english}」の意味として最も近いものはどれですか？`,
      options: [
        {
          id: "a",
          text: example.japanese,
          isCorrect: true,
          explanation: "正しい日本語訳です。",
        },
        {
          id: "b",
          text: "意味が少し異なる文",
          isCorrect: false,
          explanation: "文の意味が異なります。",
        },
        {
          id: "c",
          text: "文法的に不自然な文",
          isCorrect: false,
          explanation: "自然な日本語ではありません。",
        },
      ],
      explanation: topic.explanation,
      difficulty,
      timelineHint: topic.timelinePosition,
    });
  }

  questions.push({
    id: `${baseId}-2`,
    topicId: topic.id,
    grade: topic.grade,
    questionType: "multiple-choice",
    question: `文法「${topic.title}」が表す時間のイメージとして最も近いものはどれですか？`,
    options: [
      {
        id: "a",
        text: "過去の出来事を中心にした表現",
        isCorrect: topic.timelinePosition === "past",
        explanation: "past は過去の出来事を表します。",
      },
      {
        id: "b",
        text: "今この瞬間や普段の状態を表す表現",
        isCorrect: topic.timelinePosition === "present",
        explanation: "present は現在の状態や習慣を表します。",
      },
      {
        id: "c",
        text: "これから起こることや可能性を表す表現",
        isCorrect: topic.timelinePosition === "future",
        explanation: "future は未来のことを表します。",
      },
    ],
    explanation: getTimelineLabel(topic.timelinePosition),
    difficulty,
    timelineHint: topic.timelinePosition,
  });

  return questions;
});

export function getGrammarQuestionsByGrade(grade: EikenGrade): LearningQuestion[] {
  return eikenGrammarQuestions.filter((q) => q.grade === grade);
}
