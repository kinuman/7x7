import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ==================== 英検7×7ナビ用テーブル ====================

/**
 * 文法トピック
 * 英検5級〜1級の全文法トピックを管理
 */
export const grammarTopics = mysqlTable("grammar_topics", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull(),
  grammarType: mysqlEnum("grammar_type", ["infinitive", "gerund", "both"]).notNull(),
  timelinePosition: mysqlEnum("timeline_position", ["past", "present", "future"]),
  explanation: text("explanation").notNull(),
  examples: json("examples").notNull(), // JSON配列: [{english, japanese}]
  visualExplanation: text("visual_explanation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GrammarTopic = typeof grammarTopics.$inferSelect;
export type InsertGrammarTopic = typeof grammarTopics.$inferInsert;

/**
 * 学習問題
 * 7×7練習、英検形式問題、復習問題などを管理
 */
export const learningQuestions = mysqlTable("learning_questions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  topicId: varchar("topic_id", { length: 64 }).notNull(),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull(),
  questionType: mysqlEnum("question_type", ["multiple-choice", "fill-blank", "reorder", "matching"]).notNull(),
  question: text("question").notNull(),
  options: json("options"), // JSON配列: [{id, text, isCorrect, explanation}]
  correctAnswer: text("correct_answer"),
  explanation: text("explanation").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull(),
  timelineHint: mysqlEnum("timeline_hint", ["past", "present", "future"]),
  practiceType: mysqlEnum("practice_type", ["A", "B", "C", "D", "E", "F", "G"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearningQuestion = typeof learningQuestions.$inferSelect;
export type InsertLearningQuestion = typeof learningQuestions.$inferInsert;

/**
 * ユーザーの回答記録
 * 学習進捗追跡と弱点分析に使用
 */
export const userAnswers = mysqlTable("user_answers", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  questionId: varchar("question_id", { length: 64 }).notNull(),
  answer: text("answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: int("time_spent"), // 秒
  attemptNumber: int("attempt_number").notNull().default(1),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type UserAnswer = typeof userAnswers.$inferSelect;
export type InsertUserAnswer = typeof userAnswers.$inferInsert;

/**
 * トピック別学習進捗
 * 各ユーザーの各トピックに対する習得度を管理
 */
export const topicProgress = mysqlTable("topic_progress", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  topicId: varchar("topic_id", { length: 64 }).notNull(),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull(),
  completedPractices: json("completed_practices").notNull(), // JSON配列: ["A", "B", "C"]
  totalAttempts: int("total_attempts").notNull().default(0),
  correctAttempts: int("correct_attempts").notNull().default(0),
  masteryLevel: mysqlEnum("mastery_level", ["0", "1", "2", "3"]).notNull().default("0"), // 0: 未学習, 1: 学習中, 2: 習得中, 3: 完全習得
  lastAttemptDate: timestamp("last_attempt_date"),
  nextReviewDate: timestamp("next_review_date"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TopicProgress = typeof topicProgress.$inferSelect;
export type InsertTopicProgress = typeof topicProgress.$inferInsert;

/**
 * 学習セッション
 * ユーザーの学習セッション（開始時刻、終了時刻、学習内容）を記録
 */
export const learningSessions = mysqlTable("learning_sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull(),
  mode: mysqlEnum("mode", ["seven-by-seven", "eiken-format", "review", "diagnostic"]).notNull(),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  questionsAnswered: int("questions_answered").notNull().default(0),
  correctAnswers: int("correct_answers").notNull().default(0),
  topicsStudied: json("topics_studied").notNull(), // JSON配列: ["topic_id_1", "topic_id_2"]
});

export type LearningSession = typeof learningSessions.$inferSelect;
export type InsertLearningSession = typeof learningSessions.$inferInsert;

/**
 * 7×7マトリックス
 * 各トピックの7×7練習セルを定義
 */
export const sevenBySevenMatrices = mysqlTable("seven_by_seven_matrices", {
  id: varchar("id", { length: 64 }).primaryKey(),
  topicId: varchar("topic_id", { length: 64 }).notNull(),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull(),
  variations: json("variations").notNull(), // JSON: {id, title, description, cells: [{id, practiceType, difficulty, content, instruction}]}
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SevenBySevenMatrix = typeof sevenBySevenMatrices.$inferSelect;
export type InsertSevenBySevenMatrix = typeof sevenBySevenMatrices.$inferInsert;

/**
 * 7×7練習セッション
 * ユーザーが7×7マトリックスを進行中の状態を記録
 */
export const sevenBySevenSessions = mysqlTable("seven_by_seven_sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  matrixId: varchar("matrix_id", { length: 64 }).notNull(),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  currentCell: json("current_cell"), // JSON: {variationIndex, practiceType}
  completedCells: json("completed_cells").notNull(), // JSON配列: [{variationIndex, practiceType, isCorrect, timeSpent}]
  score: int("score").notNull().default(0),
});

export type SevenBySevenSession = typeof sevenBySevenSessions.$inferSelect;
export type InsertSevenBySevenSession = typeof sevenBySevenSessions.$inferInsert;

/**
 * ユーザー学習統計
 * ユーザーの全体的な学習統計を集計
 */
export const userLearningStats = mysqlTable("user_learning_stats", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull().unique(),
  totalQuestionsAnswered: int("total_questions_answered").notNull().default(0),
  correctAnswers: int("correct_answers").notNull().default(0),
  accuracyRate: decimal("accuracy_rate", { precision: 5, scale: 2 }).notNull().default("0.00"),
  currentStreak: int("current_streak").notNull().default(0),
  longestStreak: int("longest_streak").notNull().default(0),
  lastLearningDate: timestamp("last_learning_date"),
  totalLearningMinutes: int("total_learning_minutes").notNull().default(0),
  gradeProgress: json("grade_progress").notNull(), // JSON: {grade: {completedTopics, totalTopics, averageAccuracy}}
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserLearningStats = typeof userLearningStats.$inferSelect;
export type InsertUserLearningStats = typeof userLearningStats.$inferInsert;

/**
 * 推奨学習パス
 * 各級の推奨学習順序を定義
 */
export const recommendedLearningPaths = mysqlTable("recommended_learning_paths", {
  id: varchar("id", { length: 64 }).primaryKey(),
  grade: mysqlEnum("grade", ["5", "4", "3", "準2", "2", "準1", "1"]).notNull().unique(),
  topics: json("topics").notNull(), // JSON配列: [{topicId, order, estimatedMinutes, prerequisiteTopicIds}]
  description: text("description"),
  estimatedTotalMinutes: int("estimated_total_minutes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RecommendedLearningPath = typeof recommendedLearningPaths.$inferSelect;
export type InsertRecommendedLearningPath = typeof recommendedLearningPaths.$inferInsert;

/**
 * 英検形式テスト結果
 * ユーザーが英検形式テストを受けた結果を記録
 */
export const eikenFormatTestResults = mysqlTable("eiken_format_test_results", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  questionSetId: varchar("question_set_id", { length: 64 }).notNull(),
  score: int("score").notNull(),
  totalScore: int("total_score").notNull(),
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }).notNull(),
  timeSpent: int("time_spent").notNull(), // 秒
  passed: boolean("passed").notNull(),
  completedDate: timestamp("completed_date").defaultNow().notNull(),
});

export type EikenFormatTestResult = typeof eikenFormatTestResults.$inferSelect;
export type InsertEikenFormatTestResult = typeof eikenFormatTestResults.$inferInsert;
