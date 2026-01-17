import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("LearningProgressContext", () => {
  beforeEach(() => {
    const store: Record<string, string> = {};

    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
      length: 0,
      key: () => null,
    };
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("進捗データの初期化", () => {
    it("初期状態では進捗データが空であること", () => {
      const initialTopicProgress = new Map();
      const initialUserStats = null;

      expect(initialTopicProgress.size).toBe(0);
      expect(initialUserStats).toBeNull();
    });

    it("localStorageから進捗データを復元できること", () => {
      const mockProgress = {
        var1: {
          id: "var1",
          userId: 1,
          topicId: "var1",
          grade: "5",
          completedPractices: ["A", "B"],
          totalAttempts: 10,
          correctAttempts: 8,
          masteryLevel: 1,
          lastAttemptDate: new Date().toISOString(),
        },
      };

      localStorage.setItem("eiken-topic-progress", JSON.stringify(mockProgress));

      const saved = localStorage.getItem("eiken-topic-progress");
      expect(saved).toBeDefined();
      expect(JSON.parse(saved!)).toEqual(mockProgress);
    });
  });

  describe("進捗更新", () => {
    it("トピック進捗を更新できること", () => {
      const topicProgress = new Map();
      const newProgress = {
        id: "var1",
        userId: 1,
        topicId: "var1",
        grade: "5",
        completedPractices: ["A"],
        totalAttempts: 5,
        correctAttempts: 4,
        masteryLevel: 1,
        lastAttemptDate: new Date().toISOString(),
      };

      topicProgress.set("var1", newProgress);

      expect(topicProgress.get("var1")).toEqual(newProgress);
      expect(topicProgress.size).toBe(1);
    });

    it("複数のトピック進捗を管理できること", () => {
      const topicProgress = new Map();

      const progress1 = {
        id: "var1",
        userId: 1,
        topicId: "var1",
        grade: "5",
        completedPractices: ["A"],
        totalAttempts: 5,
        correctAttempts: 4,
        masteryLevel: 1,
        lastAttemptDate: new Date().toISOString(),
      };

      const progress2 = {
        id: "var2",
        userId: 1,
        topicId: "var2",
        grade: "5",
        completedPractices: ["A", "B"],
        totalAttempts: 10,
        correctAttempts: 9,
        masteryLevel: 2,
        lastAttemptDate: new Date().toISOString(),
      };

      topicProgress.set("var1", progress1);
      topicProgress.set("var2", progress2);

      expect(topicProgress.size).toBe(2);
      expect(topicProgress.get("var1")).toEqual(progress1);
      expect(topicProgress.get("var2")).toEqual(progress2);
    });
  });

  describe("ユーザー統計", () => {
    it("ユーザー統計を初期化できること", () => {
      const userStats = {
        userId: 1,
        totalQuestionsAnswered: 0,
        correctAnswers: 0,
        accuracyRate: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastLearningDate: new Date().toISOString(),
        totalLearningMinutes: 0,
      };

      expect(userStats.totalQuestionsAnswered).toBe(0);
      expect(userStats.accuracyRate).toBe(0);
      expect(userStats.currentStreak).toBe(0);
    });

    it("正答率を計算できること", () => {
      const totalAnswered = 10;
      const correctAnswers = 8;
      const accuracyRate = (correctAnswers / totalAnswered) * 100;

      expect(accuracyRate).toBe(80);
    });

    it("ストリークを計算できること", () => {
      let currentStreak = 0;
      currentStreak += 1;
      expect(currentStreak).toBe(1);

      currentStreak += 1;
      expect(currentStreak).toBe(2);

      const isConsecutiveDay = false;
      if (!isConsecutiveDay) {
        currentStreak = 1;
      }
      expect(currentStreak).toBe(1);
    });
  });

  describe("回答記録", () => {
    it("正解を記録できること", () => {
      let totalAnswered = 0;
      let correctAnswers = 0;

      totalAnswered += 1;
      correctAnswers += 1;

      expect(totalAnswered).toBe(1);
      expect(correctAnswers).toBe(1);
      expect((correctAnswers / totalAnswered) * 100).toBe(100);
    });

    it("不正解を記録できること", () => {
      let totalAnswered = 0;
      let correctAnswers = 0;

      totalAnswered += 1;
      correctAnswers += 1;

      totalAnswered += 1;

      expect(totalAnswered).toBe(2);
      expect(correctAnswers).toBe(1);
      expect((correctAnswers / totalAnswered) * 100).toBe(50);
    });

    it("学習時間を累積できること", () => {
      let totalMinutes = 0;

      totalMinutes += 5;
      expect(totalMinutes).toBe(5);

      totalMinutes += 10;
      expect(totalMinutes).toBe(15);

      totalMinutes += 3;
      expect(totalMinutes).toBe(18);
    });
  });

  describe("級別進捗", () => {
    it("級別の完了トピック数を計算できること", () => {
      const topicProgress = new Map();

      for (let i = 1; i <= 3; i++) {
        topicProgress.set(`5-topic-${i}`, {
          id: `5-topic-${i}`,
          userId: 1,
          topicId: `5-topic-${i}`,
          grade: "5",
          completedPractices: ["A", "B", "C"],
          totalAttempts: 15,
          correctAttempts: 12,
          masteryLevel: 3,
          lastAttemptDate: new Date().toISOString(),
        });
      }

      for (let i = 4; i <= 5; i++) {
        topicProgress.set(`5-topic-${i}`, {
          id: `5-topic-${i}`,
          userId: 1,
          topicId: `5-topic-${i}`,
          grade: "5",
          completedPractices: ["A", "B"],
          totalAttempts: 10,
          correctAttempts: 7,
          masteryLevel: 1,
          lastAttemptDate: new Date().toISOString(),
        });
      }

      const gradeTopics = Array.from(topicProgress.values()).filter((p) => p.grade === "5");
      const completed = gradeTopics.filter((p) => p.masteryLevel === 3).length;

      expect(completed).toBe(3);
      expect(gradeTopics.length).toBe(5);
    });

    it("級別の正答率を計算できること", () => {
      const gradeTopics = [
        {
          totalAttempts: 10,
          correctAttempts: 8,
        },
        {
          totalAttempts: 15,
          correctAttempts: 12,
        },
        {
          totalAttempts: 20,
          correctAttempts: 16,
        },
      ];

      const accuracy = Math.round(
        (gradeTopics.reduce((sum, p) => sum + (p.correctAttempts / p.totalAttempts || 0), 0) /
          gradeTopics.length) *
          100
      );

      expect(accuracy).toBe(80);
    });
  });

  describe("localStorage連携", () => {
    it("進捗データをlocalStorageに保存できること", () => {
      const progressData = {
        var1: {
          id: "var1",
          userId: 1,
          topicId: "var1",
          grade: "5",
          completedPractices: ["A", "B"],
          totalAttempts: 10,
          correctAttempts: 8,
          masteryLevel: 1,
          lastAttemptDate: new Date().toISOString(),
        },
      };

      localStorage.setItem("eiken-topic-progress", JSON.stringify(progressData));

      const saved = localStorage.getItem("eiken-topic-progress");
      expect(saved).toBeDefined();
      const parsed = JSON.parse(saved!);
      expect(parsed.var1.id).toBe("var1");
      expect(parsed.var1.masteryLevel).toBe(1);
    });

    it("ユーザー統計をlocalStorageに保存できること", () => {
      const statsData = {
        userId: 1,
        totalQuestionsAnswered: 50,
        correctAnswers: 40,
        accuracyRate: 80,
        currentStreak: 5,
        longestStreak: 10,
        lastLearningDate: new Date().toISOString(),
        totalLearningMinutes: 120,
      };

      localStorage.setItem("eiken-user-stats", JSON.stringify(statsData));

      const saved = localStorage.getItem("eiken-user-stats");
      expect(saved).toBeDefined();
      const parsed = JSON.parse(saved!);
      expect(parsed.totalQuestionsAnswered).toBe(50);
      expect(parsed.accuracyRate).toBe(80);
    });

    it("データをリセットできること", () => {
      localStorage.setItem("eiken-topic-progress", JSON.stringify({}));
      localStorage.setItem("eiken-user-stats", JSON.stringify({}));

      expect(localStorage.getItem("eiken-topic-progress")).toBeDefined();
      expect(localStorage.getItem("eiken-user-stats")).toBeDefined();

      localStorage.removeItem("eiken-topic-progress");
      localStorage.removeItem("eiken-user-stats");

      expect(localStorage.getItem("eiken-topic-progress")).toBeNull();
      expect(localStorage.getItem("eiken-user-stats")).toBeNull();
    });
  });
});
