/**
 * 不定詞・動名詞の7×7メソッド - 全問題データ
 * 7つのバリエーション × 7種類の練習形式 = 49問
 * 英検5級対応の基礎レベル
 */

import { LearningQuestion, PracticeType } from "@shared/types";

// ==================== 7つのバリエーション ====================

const VARIATIONS = [
  {
    id: "var1",
    verb: "want",
    japanese: "したい",
    type: "infinitive",
    explanation: "want は「これからしたいこと」を表します。未来の希望や願いです。",
    examples: [
      { english: "I want to travel.", japanese: "私は旅行に行きたい。" },
      { english: "She wants to learn English.", japanese: "彼女は英語を学びたい。" },
    ],
  },
  {
    id: "var2",
    verb: "enjoy",
    japanese: "楽しむ",
    type: "gerund",
    explanation: "enjoy は「今、その瞬間を楽しむ」という現在の経験を表します。",
    examples: [
      { english: "I enjoy reading books.", japanese: "私は本を読むのが好きです。" },
      { english: "She enjoys playing tennis.", japanese: "彼女はテニスをするのを楽しんでいます。" },
    ],
  },
  {
    id: "var3",
    verb: "finish",
    japanese: "終わる",
    type: "gerund",
    explanation: "finish は「すでに終わった行動」を表します。過去の経験や完了した動作です。",
    examples: [
      { english: "I finished eating dinner.", japanese: "私は夕食を食べ終わった。" },
      { english: "He finished studying.", japanese: "彼は勉強を終わらせた。" },
    ],
  },
  {
    id: "var4",
    verb: "hope",
    japanese: "望む",
    type: "infinitive",
    explanation: "hope も「これからそうなってほしい」という未来への願いです。",
    examples: [
      { english: "I hope to see you soon.", japanese: "すぐにあなたに会えるといいな。" },
      { english: "We hope to win the game.", japanese: "私たちはゲームに勝つことを望んでいます。" },
    ],
  },
  {
    id: "var5",
    verb: "stop",
    japanese: "やめる",
    type: "both",
    explanation: "stop + doing は「今やっていることをやめる」。stop + to do は「目的のために立ち止まる」。",
    examples: [
      { english: "I stopped smoking.", japanese: "私は喫煙をやめた。" },
      { english: "I stopped to smoke.", japanese: "私は喫煙するために立ち止まった。" },
    ],
  },
  {
    id: "var6",
    verb: "remember",
    japanese: "覚えている",
    type: "both",
    explanation: "remember + doing は「過去の経験を覚えている」。remember + to do は「忘れずにいる」。",
    examples: [
      { english: "I remember reading this book.", japanese: "私はこの本を読んだことを覚えている。" },
      { english: "I remembered to call him.", japanese: "私は彼に電話することを忘れずにいた。" },
    ],
  },
  {
    id: "var7",
    verb: "try",
    japanese: "やってみる",
    type: "both",
    explanation: "try + doing は「試しにやってみる」。try + to do は「努力してやろうとする」。",
    examples: [
      { english: "I tried running in the morning.", japanese: "私は朝走ってみた。" },
      { english: "I tried to run in the morning.", japanese: "私は朝走ろうとした。" },
    ],
  },
];

// ==================== 7種類の練習形式 ====================

const PRACTICE_TYPES: PracticeType[] = ["A", "B", "C", "D", "E", "F", "G"];

// ==================== 問題データ生成関数 ====================

/**
 * 7×7の全49問を生成
 */
export function generateInfinitiveGerundQuestions(): LearningQuestion[] {
  const questions: LearningQuestion[] = [];

  VARIATIONS.forEach((variation) => {
    PRACTICE_TYPES.forEach((practiceType) => {
      // IDの形式を "var1-A" のように明確にする
      const questionId = `${variation.id}-${practiceType}`;
      const question = generateQuestion(variation, practiceType, questionId);
      questions.push(question);
    });
  });

  return questions;
}

/**
 * 各練習形式に応じた問題を生成
 */
function generateQuestion(
  variation: (typeof VARIATIONS)[0],
  practiceType: PracticeType,
  questionId: string
): LearningQuestion {
  const baseId = questionId;
  const verb = variation.verb;

  switch (practiceType) {
    case "A":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "multiple-choice",
        question: `「${verb}」の後に来る動詞の形は？`,
        options: [
          {
            id: "a",
            text: variation.type === "infinitive" ? "to + 動詞" : "動詞 + ing",
            isCorrect: true,
            explanation: variation.explanation,
          },
          {
            id: "b",
            text: variation.type === "infinitive" ? "動詞 + ing" : "to + 動詞",
            isCorrect: false,
            explanation: `「${verb}」は${variation.type === "infinitive" ? "不定詞" : "動名詞"}を取ります。`,
          },
          {
            id: "c",
            text: "過去分詞",
            isCorrect: false,
            explanation: `「${verb}」の後は${variation.type === "infinitive" ? "不定詞" : "動名詞"}です。`,
          },
        ],
        explanation: variation.explanation,
        difficulty: "easy",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    case "B":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "fill-blank",
        question: `I ${verb} _____ (travel). 空欄に入る形は？`,
        options: [
          { id: "a", text: "to travel", isCorrect: variation.type === "infinitive" },
          { id: "b", text: "traveling", isCorrect: variation.type === "gerund" || variation.type === "both" },
        ],
        correctAnswer: variation.type === "infinitive" ? "to travel" : "traveling",
        explanation: `「${verb}」の後は${variation.type === "infinitive" ? "to + 動詞" : "動詞 + ing"}の形です。`,
        difficulty: "easy",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    case "C":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "multiple-choice",
        question: `「${variation.examples[0].english}」の意味は？`,
        options: [
          {
            id: "a",
            text: variation.examples[0].japanese,
            isCorrect: true,
            explanation: "正しい意味です。",
          },
          {
            id: "b",
            text: "別の意味",
            isCorrect: false,
            explanation: "この文の意味ではありません。",
          },
        ],
        explanation: variation.examples[0].japanese,
        difficulty: "medium",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    case "D":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "multiple-choice",
        question: `「${verb}」を使う文は、どの時間軸を表していますか？`,
        options: [
          {
            id: "a",
            text: variation.type === "infinitive" ? "未来（これからすること）" : "現在（今の経験）",
            isCorrect: true,
            explanation: variation.explanation,
          },
          {
            id: "b",
            text: variation.type === "infinitive" ? "現在（今の経験）" : "未来（これからすること）",
            isCorrect: false,
            explanation: variation.explanation,
          },
        ],
        explanation: variation.explanation,
        difficulty: "medium",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    case "E":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "multiple-choice",
        question: `正しい文の順序は？`,
        options: [
          {
            id: "a",
            text: `I ${verb} ${variation.type === "infinitive" ? "to travel" : "traveling"}`,
            isCorrect: true,
          },
          {
            id: "b",
            text: `I ${variation.type === "infinitive" ? "traveling" : "to travel"} ${verb}`,
            isCorrect: false,
          },
        ],
        explanation: `「${verb}」の後は${variation.type === "infinitive" ? "to + 動詞" : "動詞 + ing"}です。`,
        difficulty: "medium",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    case "F":
      if (variation.type === "both") {
        return {
          id: baseId,
          topicId: variation.id,
          grade: "5",
          questionType: "multiple-choice",
          question: `「I ${verb} smoking」と「I ${verb} to smoke」の違いは？`,
          options: [
            {
              id: "a",
              text: variation.examples[0].japanese + " vs " + (variation.examples[1]?.japanese || "別の意味"),
              isCorrect: true,
              explanation: "doing と to do で意味が異なります。",
            },
            {
              id: "b",
              text: "同じ意味",
              isCorrect: false,
              explanation: `「${verb}」は文脈で意味が変わります。`,
            },
          ],
          explanation: `「${verb}」は doing と to do で異なる意味を持ちます。`,
          difficulty: "hard",
          timelineHint: "present",
        };
      } else {
        return {
          id: baseId,
          topicId: variation.id,
          grade: "5",
          questionType: "multiple-choice",
          question: `「${verb}」を使った正しい文を選んでください。`,
          options: [
            {
              id: "a",
              text: variation.examples[0].english,
              isCorrect: true,
              explanation: "正しい用法です。",
            },
            {
              id: "b",
              text: `I ${variation.type === "infinitive" ? "enjoy" : "want"} ${variation.type === "infinitive" ? "to travel" : "traveling"}`,
              isCorrect: false,
              explanation: `「${verb}」の後は${variation.type === "infinitive" ? "to + 動詞" : "動詞 + ing"}です。`,
            },
          ],
          explanation: variation.explanation,
          difficulty: "hard",
          timelineHint: variation.type === "infinitive" ? "future" : "present",
        };
      }

    case "G":
      return {
        id: baseId,
        topicId: variation.id,
        grade: "5",
        questionType: "multiple-choice",
        question: `総合問題：次の文で「${verb}」の後に来る動詞の形として正しいのはどれですか？`,
        options: [
          {
            id: "a",
            text: variation.type === "infinitive" ? "to + 動詞（未来の行動）" : "動詞 + ing（現在の経験）",
            isCorrect: true,
            explanation: variation.explanation,
          },
          {
            id: "b",
            text: "過去分詞",
            isCorrect: false,
            explanation: `「${verb}」の後は${variation.type === "infinitive" ? "不定詞" : "動名詞"}です。`,
          },
        ],
        explanation: variation.explanation,
        difficulty: "hard",
        timelineHint: variation.type === "infinitive" ? "future" : "present",
      };

    default:
      throw new Error(`Unknown practice type: ${practiceType}`);
  }
}

// ==================== エクスポート ====================

/**
 * 全49問のデータ
 */
export const infinitiveGerundQuestions = generateInfinitiveGerundQuestions();

/**
 * バリエーション別のデータ
 */
export const infinitiveGerundVariations = VARIATIONS;

/**
 * 特定のバリエーションの問題を取得
 */
export function getQuestionsByVariation(variationId: string): LearningQuestion[] {
  return infinitiveGerundQuestions.filter((q) => q.topicId === variationId);
}
