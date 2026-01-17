import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { infinitiveGerundQuestions, infinitiveGerundVariations } from "@/lib/infinitiveGerundData";
import { PracticeType, LearningQuestion } from "@shared/types";
import { useLearningProgress } from "@/contexts/LearningProgressContext";

/**
 * 7×7練習画面
 * 7つのバリエーション × 7種類の練習形式で学習
 */
export default function SevenBySevenPractice() {
  const params = useParams<{ grade?: string; topicId?: string }>();
  const [, navigate] = useLocation();
  const { recordAnswer, updateTopicProgress, getTopicProgress } = useLearningProgress();
  const grade = params?.grade || "5";
  const topicId = params?.topicId || "var1";

  // 状態管理
  const [currentPracticeType, setCurrentPracticeType] = useState<PracticeType>("A");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completedPractices, setCompletedPractices] = useState<PracticeType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // 初期化時に既存の進捗を読み込む
  useEffect(() => {
    const progress = getTopicProgress(topicId);
    if (progress) {
      setCompletedPractices(progress.completedPractices);
    }
  }, [topicId, getTopicProgress]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex, currentPracticeType]);

  // フィルタリング: 現在のトピックと練習タイプの問題を取得
  // IDが "var1-A" のような形式であることを前提にする
  const filteredQuestions = infinitiveGerundQuestions.filter(
    (q) => q.topicId === topicId && q.id === `${topicId}-${currentPracticeType}`
  );

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const variation = infinitiveGerundVariations.find((v) => v.id === topicId);

  // 進捗計算
  const totalPractices = 7;
  const progressPercentage = (completedPractices.length / totalPractices) * 100;

  // 回答処理
  const handleAnswer = (optionId: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionId);
    setIsAnswered(true);

    // 正解判定
    const isCorrect = currentQuestion?.options?.some(
      (opt) => opt.id === optionId && opt.isCorrect
    );

    if (isCorrect) {
      setScore(score + 1);
    }

    // 回答を記録
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    recordAnswer(currentQuestion.id, !!isCorrect, timeSpent);
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // 練習タイプ完了
      const newCompletedPractices = completedPractices.includes(currentPracticeType)
        ? completedPractices
        : [...completedPractices, currentPracticeType];
      
      setCompletedPractices(newCompletedPractices);

      // 進捗を更新
      const totalQuestions = infinitiveGerundQuestions.filter(q => q.topicId === topicId).length;
      const masteryLevel = newCompletedPractices.length === 7 ? 3 : newCompletedPractices.length >= 4 ? 2 : 1;
      
      const currentIsCorrect = currentQuestion?.options?.some(opt => opt.id === selectedAnswer && opt.isCorrect);
      const finalScore = score + (currentIsCorrect ? 1 : 0);

      updateTopicProgress(topicId, {
        completedPractices: newCompletedPractices,
        totalAttempts: totalQuestions,
        correctAttempts: finalScore,
        masteryLevel: masteryLevel as 0 | 1 | 2 | 3,
        lastAttemptDate: new Date(),
      });

      // 次の練習タイプへ
      const practiceTypes: PracticeType[] = ["A", "B", "C", "D", "E", "F", "G"];
      const currentIndex = practiceTypes.indexOf(currentPracticeType);
      if (currentIndex < practiceTypes.length - 1) {
        setCurrentPracticeType(practiceTypes[currentIndex + 1]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // 全練習完了
        setShowResults(true);
      }
    }
  };

  // リセット
  const handleReset = () => {
    setCurrentPracticeType("A");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCompletedPractices([]);
    setShowResults(false);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">問題を読み込んでいます... (ID: {topicId}-{currentPracticeType})</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>ダッシュボードに戻る</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {variation?.verb} - {variation?.japanese}
              </h1>
              <p className="text-gray-600">
                練習形式: {currentPracticeType} ({currentQuestionIndex + 1}/
                {filteredQuestions.length})
              </p>
            </div>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              リセット
            </Button>
          </div>

          {/* プログレスバー */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">全体進捗</span>
              <span className="font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* 練習タイプ表示 */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {(["A", "B", "C", "D", "E", "F", "G"] as PracticeType[]).map((type) => (
              <motion.button
                key={type}
                onClick={() => {
                  if (completedPractices.includes(type) || type === currentPracticeType) {
                    setCurrentPracticeType(type);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setIsAnswered(false);
                  }
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  type === currentPracticeType
                    ? "bg-blue-600 text-white shadow-lg"
                    : completedPractices.includes(type)
                    ? "bg-green-100 text-green-700 border-2 border-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
                disabled={!completedPractices.includes(type) && type !== currentPracticeType}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 問題表示 */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                  <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* 選択肢表示 */}
                  {currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option.id;
                        const isCorrectAnswer = option.isCorrect;
                        const showCorrect = isAnswered && isCorrectAnswer;
                        const showIncorrect = isAnswered && isSelected && !isCorrectAnswer;

                        return (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              showCorrect
                                ? "border-green-500 bg-green-50"
                                : showIncorrect
                                ? "border-red-500 bg-red-50"
                                : isSelected && !isAnswered
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            disabled={isAnswered}
                            whileHover={!isAnswered ? { scale: 1.02 } : {}}
                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option.text}</span>
                              {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                              {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* 説明表示 */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600"
                    >
                      <p className="font-semibold text-blue-900 mb-2">解説</p>
                      <p className="text-blue-800">{currentQuestion.explanation}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* 次へボタン */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="w-full"
                  >
                    {currentQuestionIndex < filteredQuestions.length - 1 ? (
                      <>
                        次の問題 <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        次の練習形式へ <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* 完了画面 */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="shadow-xl">
                <CardContent className="pt-12 pb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-6"
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    7×7練習完了！
                  </h2>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 mb-2">最終スコア</p>
                    <p className="text-5xl font-bold text-primary mb-2">
                      {score}/{infinitiveGerundQuestions.filter(q => q.topicId === topicId).length}
                    </p>
                    <p className="text-lg text-gray-700">
                      正答率: {Math.round((score / infinitiveGerundQuestions.filter(q => q.topicId === topicId).length) * 100)}%
                    </p>
                  </div>

                  <p className="text-gray-600 mb-8">
                    {score / infinitiveGerundQuestions.filter(q => q.topicId === topicId).length > 0.8
                      ? "素晴らしい！このトピックは習得できました。"
                      : score / infinitiveGerundQuestions.filter(q => q.topicId === topicId).length > 0.6
                      ? "良い進捗です。もう一度復習してみましょう。"
                      : "もう一度チャレンジしてみましょう。"}
                  </p>

                  <div className="flex gap-4">
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      もう一度挑戦
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        const currentIndex = infinitiveGerundVariations.findIndex(v => v.id === topicId);
                        if (currentIndex < infinitiveGerundVariations.length - 1) {
                          const nextTopicId = infinitiveGerundVariations[currentIndex + 1].id;
                          navigate(`/study/${grade}/${nextTopicId}`);
                          handleReset();
                        } else {
                          navigate("/dashboard");
                        }
                      }}
                    >
                      {infinitiveGerundVariations.findIndex(v => v.id === topicId) < infinitiveGerundVariations.length - 1 
                        ? "次のトピックへ" 
                        : "ダッシュボードへ"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
