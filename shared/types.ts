/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// ==================== 英検7×7ナビ - 基本型定義 ====================

/** 英検の級レベル */
export type EikenGrade = '5' | '4' | '3' | '準2' | '2' | '準1' | '1';

/** 学習モード */
export type LearningMode = 'seven-by-seven' | 'eiken-format' | 'review' | 'diagnostic';

/** 練習タイプ（7×7の7種類） */
export type PracticeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

/** 文法タイプ */
export type GrammarType = 'infinitive' | 'gerund' | 'both';

/** 問題タイプ */
export type QuestionType = 'multiple-choice' | 'fill-blank' | 'reorder' | 'matching';

/** 時間軸の位置 */
export type TimelinePosition = 'past' | 'present' | 'future';

// ==================== 文法トピック関連 ====================

/** 文法トピック */
export interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  grade: EikenGrade;
  grammarType: GrammarType;
  timelinePosition: TimelinePosition;
  explanation: string;
  examples: {
    english: string;
    japanese: string;
  }[];
  visualExplanation?: string;
}

/** 7×7マトリックスの1セル */
export interface SevenBySevenCell {
  id: string;
  topicId: string;
  practiceType: PracticeType;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  instruction: string;
}

// ==================== 問題関連 ====================

/** 選択肢 */
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

/** 学習問題 */
export interface LearningQuestion {
  id: string;
  topicId: string;
  grade: EikenGrade;
  questionType: QuestionType;
  question: string;
  options?: QuestionOption[];
  correctAnswer?: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timelineHint?: TimelinePosition;
}

/** ユーザーの回答 */
export interface UserAnswer {
  id: string;
  userId: number;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timestamp: Date;
  attemptNumber: number;
}

// ==================== 学習進捗関連 ====================

/** トピック別の学習進捗 */
export interface TopicProgress {
  id: string;
  userId: number;
  topicId: string;
  grade: EikenGrade;
  completedPractices: PracticeType[];
  totalAttempts: number;
  correctAttempts: number;
  lastAttemptDate: Date;
  masteryLevel: 0 | 1 | 2 | 3;
  nextReviewDate?: Date;
}

/** ユーザーの学習統計 */
export interface UserLearningStats {
  userId: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  accuracyRate: number;
  currentStreak: number;
  longestStreak: number;
  lastLearningDate: Date;
  totalLearningMinutes: number;
}

/** 学習セッション */
export interface LearningSession {
  id: string;
  userId: number;
  grade: EikenGrade;
  mode: LearningMode;
  startTime: Date;
  endTime?: Date;
  questionsAnswered: number;
  correctAnswers: number;
  topicsStudied: string[];
}

// ==================== 7×7メソッド関連 ====================

/** 7×7マトリックス */
export interface SevenBySevenMatrix {
  id: string;
  topicId: string;
  grade: EikenGrade;
  variations: {
    id: string;
    title: string;
    description: string;
    cells: SevenBySevenCell[];
  }[];
}

/** 7×7練習セッション */
export interface SevenBySevenSession {
  id: string;
  userId: number;
  matrixId: string;
  startTime: Date;
  endTime?: Date;
  currentCell: {
    variationIndex: number;
    practiceType: PracticeType;
  };
  completedCells: {
    variationIndex: number;
    practiceType: PracticeType;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  score: number;
}

// ==================== 音声関連 ====================

/** 音声認識結果 */
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  timestamp: Date;
}

/** 発音チェック結果 */
export interface PronunciationCheckResult {
  transcript: string;
  targetPhrase: string;
  similarity: number;
  feedback: string;
  suggestions: string[];
}

// ==================== 英検形式問題関連 ====================

/** 英検形式の問題セット */
export interface EikenFormatQuestionSet {
  id: string;
  grade: EikenGrade;
  section: 'reading' | 'listening' | 'writing' | 'speaking';
  questions: LearningQuestion[];
  timeLimit: number;
  passingScore: number;
}

/** 英検形式テストの結果 */
export interface EikenFormatTestResult {
  id: string;
  userId: number;
  questionSetId: string;
  score: number;
  totalScore: number;
  accuracy: number;
  timeSpent: number;
  completedDate: Date;
  passed: boolean;
}

// ==================== 推奨学習パス関連 ====================

/** 推奨学習パス */
export interface RecommendedLearningPath {
  id: string;
  grade: EikenGrade;
  topics: {
    topicId: string;
    order: number;
    estimatedMinutes: number;
    prerequisiteTopicIds?: string[];
  }[];
  description: string;
  estimatedTotalMinutes: number;
}

/** 到達度テスト */
export interface DiagnosticTest {
  id: string;
  grade: EikenGrade;
  questions: LearningQuestion[];
  passingScore: number;
  estimatedMinutes: number;
}
