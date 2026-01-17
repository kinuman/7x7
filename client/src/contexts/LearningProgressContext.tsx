import React, { createContext, useContext, useState, useEffect } from "react";
import { TopicProgress, UserLearningStats } from "@shared/types";

interface LearningProgressContextType {
  // 進捗データ
  topicProgress: Map<string, TopicProgress>;
  userStats: UserLearningStats | null;

  // 進捗更新関数
  updateTopicProgress: (topicId: string, progress: Partial<TopicProgress>) => void;
  updateUserStats: (stats: Partial<UserLearningStats>) => void;
  recordAnswer: (questionId: string, isCorrect: boolean, timeSpent: number) => void;

  // 進捗取得関数
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  getGradeProgress: (grade: string) => { completed: number; total: number; accuracy: number };
  getCurrentStreak: () => number;
  getAccuracyRate: () => number;

  // リセット
  resetProgress: () => void;
}

const LearningProgressContext = createContext<LearningProgressContextType | undefined>(
  undefined
);

export const LearningProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [topicProgress, setTopicProgress] = useState<Map<string, TopicProgress>>(new Map());
  const [userStats, setUserStats] = useState<UserLearningStats | null>(null);

  // localStorage から進捗を復元
  useEffect(() => {
    const savedProgress = localStorage.getItem("eiken-topic-progress");
    const savedStats = localStorage.getItem("eiken-user-stats");

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setTopicProgress(new Map(Object.entries(parsed)));
      } catch (e) {
        console.error("Failed to parse saved progress:", e);
      }
    }

    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setUserStats(parsed);
      } catch (e) {
        console.error("Failed to parse saved stats:", e);
      }
    }
  }, []);

  // localStorage に進捗を保存
  useEffect(() => {
    const progressObj = Object.fromEntries(topicProgress);
    localStorage.setItem("eiken-topic-progress", JSON.stringify(progressObj));
  }, [topicProgress]);

  useEffect(() => {
    if (userStats) {
      localStorage.setItem("eiken-user-stats", JSON.stringify(userStats));
    }
  }, [userStats]);

  const updateTopicProgress = (topicId: string, progress: Partial<TopicProgress>) => {
    setTopicProgress((prev) => {
      const updated = new Map(prev);
      const current = updated.get(topicId) || {
        id: topicId,
        userId: 0,
        topicId,
        grade: "5",
        completedPractices: [],
        totalAttempts: 0,
        correctAttempts: 0,
        masteryLevel: 0,
        lastAttemptDate: new Date(),
      };

      updated.set(topicId, { ...current, ...progress });
      return updated;
    });
  };

  const updateUserStats = (stats: Partial<UserLearningStats>) => {
    setUserStats((prev) => {
      if (!prev) {
        return {
          userId: 0,
          totalQuestionsAnswered: 0,
          correctAnswers: 0,
          accuracyRate: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastLearningDate: new Date(),
          totalLearningMinutes: 0,
          ...stats,
        };
      }
      return { ...prev, ...stats };
    });
  };

  const recordAnswer = (questionId: string, isCorrect: boolean, timeSpent: number) => {
    if (!userStats) return;

    const newTotalAnswered = userStats.totalQuestionsAnswered + 1;
    const newCorrectAnswers = userStats.correctAnswers + (isCorrect ? 1 : 0);
    const newAccuracyRate = (newCorrectAnswers / newTotalAnswered) * 100;
    const newTotalMinutes = userStats.totalLearningMinutes + Math.ceil(timeSpent / 60);

    // ストリーク計算
    const today = new Date();
    const lastLearning = userStats.lastLearningDate ? new Date(userStats.lastLearningDate) : null;
    const isConsecutiveDay =
      lastLearning &&
      today.getTime() - lastLearning.getTime() < 24 * 60 * 60 * 1000 &&
      today.getTime() - lastLearning.getTime() > 0;

    const newStreak = isConsecutiveDay ? userStats.currentStreak + 1 : 1;
    const newLongestStreak = Math.max(newStreak, userStats.longestStreak);

    updateUserStats({
      totalQuestionsAnswered: newTotalAnswered,
      correctAnswers: newCorrectAnswers,
      accuracyRate: newAccuracyRate,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastLearningDate: today,
      totalLearningMinutes: newTotalMinutes,
    });
  };

  const getTopicProgress = (topicId: string): TopicProgress | undefined => {
    return topicProgress.get(topicId);
  };

  const getGradeProgress = (grade: string) => {
    const gradeTopics = Array.from(topicProgress.values()).filter((p) => p.grade === grade);

    const completed = gradeTopics.filter((p) => p.masteryLevel === 3).length;
    const total = gradeTopics.length || 5; // デフォルト5トピック
    const accuracy =
      gradeTopics.length > 0
        ? Math.round(
            (gradeTopics.reduce((sum, p) => sum + (p.correctAttempts / p.totalAttempts || 0), 0) /
              gradeTopics.length) *
              100
          )
        : 0;

    return { completed, total, accuracy };
  };

  const getCurrentStreak = (): number => {
    return userStats?.currentStreak || 0;
  };

  const getAccuracyRate = (): number => {
    return userStats?.accuracyRate || 0;
  };

  const resetProgress = () => {
    setTopicProgress(new Map());
    setUserStats(null);
    localStorage.removeItem("eiken-topic-progress");
    localStorage.removeItem("eiken-user-stats");
  };

  const value: LearningProgressContextType = {
    topicProgress,
    userStats,
    updateTopicProgress,
    updateUserStats,
    recordAnswer,
    getTopicProgress,
    getGradeProgress,
    getCurrentStreak,
    getAccuracyRate,
    resetProgress,
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};

export const useLearningProgress = (): LearningProgressContextType => {
  const context = useContext(LearningProgressContext);
  if (!context) {
    throw new Error("useLearningProgress must be used within LearningProgressProvider");
  }
  return context;
};
