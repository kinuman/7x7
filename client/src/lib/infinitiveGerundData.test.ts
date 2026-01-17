import { describe, it, expect } from "vitest";
import {
  infinitiveGerundQuestions,
  infinitiveGerundVariations,
  getQuestionsByVariation,
  getQuestionsByPracticeType,
} from "./infinitiveGerundData";

describe("infinitiveGerundData", () => {
  describe("データ生成", () => {
    it("49問の問題が生成されること（7バリエーション × 7練習タイプ）", () => {
      expect(infinitiveGerundQuestions).toHaveLength(49);
    });

    it("7つのバリエーションが定義されていること", () => {
      expect(infinitiveGerundVariations).toHaveLength(7);
    });

    it("各バリエーションが正しい構造を持つこと", () => {
      infinitiveGerundVariations.forEach((variation) => {
        expect(variation).toHaveProperty("id");
        expect(variation).toHaveProperty("verb");
        expect(variation).toHaveProperty("japanese");
        expect(variation).toHaveProperty("type");
        expect(variation).toHaveProperty("explanation");
        expect(variation).toHaveProperty("examples");
        expect(variation.examples).toHaveLength(2);
      });
    });
  });

  describe("問題の構造", () => {
    it("各問題が必須フィールドを持つこと", () => {
      infinitiveGerundQuestions.forEach((question) => {
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("topicId");
        expect(question).toHaveProperty("grade", "5");
        expect(question).toHaveProperty("questionType");
        expect(question).toHaveProperty("question");
        expect(question).toHaveProperty("explanation");
        expect(question).toHaveProperty("difficulty");
      });
    });

    it("選択肢問題が正しい構造を持つこと", () => {
      const multipleChoiceQuestions = infinitiveGerundQuestions.filter(
        (q) => q.questionType === "multiple-choice"
      );

      multipleChoiceQuestions.forEach((question) => {
        expect(question.options).toBeDefined();
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options!.length).toBeGreaterThan(0);

        // 各選択肢が必須フィールドを持つ
        question.options!.forEach((option) => {
          expect(option).toHaveProperty("id");
          expect(option).toHaveProperty("text");
          expect(option).toHaveProperty("isCorrect");
        });

        // 正解が1つ以上存在すること
        const correctOptions = question.options!.filter((opt) => opt.isCorrect);
        expect(correctOptions.length).toBeGreaterThan(0);
      });
    });

    it("穴埋め問題が正答を持つこと", () => {
      const fillBlankQuestions = infinitiveGerundQuestions.filter(
        (q) => q.questionType === "fill-blank"
      );

      fillBlankQuestions.forEach((question) => {
        expect(question.correctAnswer).toBeDefined();
        expect(typeof question.correctAnswer).toBe("string");
      });
    });

    it("並び替え問題が正答を持つこと", () => {
      const reorderQuestions = infinitiveGerundQuestions.filter(
        (q) => q.questionType === "reorder"
      );

      reorderQuestions.forEach((question) => {
        expect(question.correctAnswer).toBeDefined();
        expect(typeof question.correctAnswer).toBe("string");
      });
    });
  });

  describe("難易度分布", () => {
    it("各練習タイプに異なる難易度が含まれること", () => {
      const practiceTypes = ["A", "B", "C", "D", "E", "F", "G"];

      practiceTypes.forEach((type) => {
        const questionsOfType = infinitiveGerundQuestions.filter((q) =>
          q.id.endsWith(`-${type}`)
        );

        // 形式Aは easy, 形式B-Eは medium, 形式F-Gは hard
        if (type === "A") {
          questionsOfType.forEach((q) => {
            expect(q.difficulty).toBe("easy");
          });
        } else if (["B", "C", "D", "E"].includes(type)) {
          questionsOfType.forEach((q) => {
            expect(q.difficulty).toBe("medium");
          });
        } else {
          questionsOfType.forEach((q) => {
            expect(q.difficulty).toBe("hard");
          });
        }
      });
    });
  });

  describe("時間軸ヒント", () => {
    it("各問題に時間軸ヒントが設定されていること", () => {
      infinitiveGerundQuestions.forEach((question) => {
        expect(question.timelineHint).toBeDefined();
        expect(["past", "present", "future"]).toContain(question.timelineHint);
      });
    });

    it("不定詞は future, 動名詞は present のヒントを持つこと", () => {
      infinitiveGerundQuestions.forEach((question) => {
        const variation = infinitiveGerundVariations.find((v) => v.id === question.topicId);

        if (variation?.type === "infinitive") {
          expect(question.timelineHint).toBe("future");
        } else if (variation?.type === "gerund") {
          expect(question.timelineHint).toBe("present");
        }
      });
    });
  });

  describe("ユーティリティ関数", () => {
    it("getQuestionsByVariation が正しく動作すること", () => {
      const var1Questions = getQuestionsByVariation("var1");
      expect(var1Questions).toHaveLength(7); // 7つの練習タイプ

      var1Questions.forEach((q) => {
        expect(q.topicId).toBe("var1");
      });
    });

    it("getQuestionsByPracticeType が正しく動作すること", () => {
      const practiceAQuestions = getQuestionsByPracticeType("A");
      expect(practiceAQuestions).toHaveLength(7); // 7つのバリエーション

      practiceAQuestions.forEach((q) => {
        // IDが正しい練習タイプを持っていることを確認
        const questionIndex = parseInt(q.id.replace(/^inf-ger-q/, "")) - 1;
        const practiceTypeIndex = questionIndex % 7;
        expect(practiceTypeIndex).toBe(0); // A = 0
      });
    });

    it("各バリエーションから7つの問題が取得できること", () => {
      infinitiveGerundVariations.forEach((variation) => {
        const questions = getQuestionsByVariation(variation.id);
        expect(questions).toHaveLength(7);
      });
    });

    it("各練習タイプから７つの問題が取得できること", () => {
      const practiceTypes = ["A", "B", "C", "D", "E", "F", "G"];

      practiceTypes.forEach((type, index) => {
        const questions = getQuestionsByPracticeType(type as any);
        expect(questions).toHaveLength(7);
        
        // 各問題が正しい練習タイプを持っていることを確認
        questions.forEach((q) => {
          const questionIndex = parseInt(q.id.replace(/^inf-ger-q/, "")) - 1;
          const practiceTypeIndex = questionIndex % 7;
          expect(practiceTypeIndex).toBe(index);
        });
      });
    });
  });

  describe("問題の一意性", () => {
    it("各問題が一意のIDを持つこと", () => {
      const ids = infinitiveGerundQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("IDが正しいパターンに従うこと", () => {
      infinitiveGerundQuestions.forEach((question) => {
        // IDは inf-ger-q{1-49} の形式
        expect(question.id).toMatch(/^inf-ger-q\d+$/);
      });
    });
  });

  describe("バリエーション別の問題タイプ", () => {
    it("want（不定詞）の問題が正しく生成されること", () => {
      const wantQuestions = getQuestionsByVariation("var1");
      expect(wantQuestions).toHaveLength(7);

      wantQuestions.forEach((q) => {
        expect(q.timelineHint).toBe("future");
      });
    });

    it("enjoy（動名詞）の問題が正しく生成されること", () => {
      const enjoyQuestions = getQuestionsByVariation("var2");
      expect(enjoyQuestions).toHaveLength(7);

      enjoyQuestions.forEach((q) => {
        expect(q.timelineHint).toBe("present");
      });
    });

    it("stop（両方）の問題が正しく生成されること", () => {
      const stopQuestions = getQuestionsByVariation("var5");
      expect(stopQuestions).toHaveLength(7);

      // 形式Fは対比問題で、両方の意味を扱う
      const formFQuestion = stopQuestions.find((q) => {
        const questionIndex = parseInt(q.id.replace(/^inf-ger-q/, "")) - 1;
        const practiceTypeIndex = questionIndex % 7;
        return practiceTypeIndex === 5; // F = 5
      });
      expect(formFQuestion).toBeDefined();
      if (formFQuestion?.question) {
        // 対比問題なので「と」を含むかチェック
        expect(formFQuestion.question).toContain("と");
      }
    });
  });

  describe("問題の多様性", () => {
    it("複数の問題タイプが含まれていること", () => {
      const questionTypes = new Set(
        infinitiveGerundQuestions.map((q) => q.questionType)
      );
      expect(questionTypes.size).toBeGreaterThan(1);
    });

    it("各バリエーションが複数の問題タイプを持つこと", () => {
      infinitiveGerundVariations.forEach((variation) => {
        const questions = getQuestionsByVariation(variation.id);
        const questionTypes = new Set(questions.map((q) => q.questionType));
        expect(questionTypes.size).toBeGreaterThan(1);
      });
    });
  });
});
