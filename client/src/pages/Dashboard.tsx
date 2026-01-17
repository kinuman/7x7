import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { BookOpen, Flame, TrendingUp, Target } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { supabase } from "@/lib/supabase";

/**
 * ダッシュボード画面
 * ユーザーの学習進捗と統計を表示
 */
export default function Dashboard() {
  const { userStats, getGradeProgress } = useLearningProgress();
  const [selectedGrade, setSelectedGrade] = useState<string>("5");
  const { user } = useSupabaseAuth();

  const grades = ["5", "4", "3", "準2", "2", "準1", "1"];

  // 実際のユーザー統計データを取得
  const stats = userStats || {
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalLearningMinutes: 0,
  };

  // 各級の進捗データを取得
  const gradeProgress = grades.reduce((acc, grade) => {
    acc[grade] = getGradeProgress(grade);
    return acc;
  }, {} as Record<string, { completed: number; total: number; accuracy: number }>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80">
              <BookOpen className="w-8 h-8" />
              <span>英検7×7ナビ</span>
            </a>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">
              {user?.email || "ゲストユーザー"}
            </span>
            {user && (
              <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>
                ログアウト
              </Button>
            )}
            {!user && (
              <Link href="/login">
                <a>
                  <Button size="sm" variant="default">ログイン</Button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* ウェルカムセクション */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            こんにちは、ゲストさん！
          </h1>
          <p className="text-gray-600">
            今日も英検合格に向けて学習を続けましょう。
          </p>
        </motion.div>

        {/* 統計カード */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: BookOpen,
              label: "回答した問題",
              value: stats.totalQuestionsAnswered,
              color: "blue",
            },
            {
              icon: TrendingUp,
              label: "正答率",
              value: `${Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100)}%`,
              color: "green",
            },
            {
              icon: Flame,
              label: "連続学習日数",
              value: stats.currentStreak,
              color: "orange",
            },
            {
              icon: Target,
              label: "学習時間",
              value: `${Math.round(stats.totalLearningMinutes / 60)}h`,
              color: "purple",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              orange: "bg-orange-50 text-orange-600",
              purple: "bg-purple-50 text-purple-600",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          colorClasses[stat.color as keyof typeof colorClasses]
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 級別進捗 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>級別学習進捗</CardTitle>
              <CardDescription>各級の習得状況を確認</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {grades.map((grade) => {
                  const progress = gradeProgress[grade as keyof typeof gradeProgress];
                  const progressPercentage = (progress.completed / progress.total) * 100;

                  return (
                  <div key={grade}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{grade}級</h3>
                          <p className="text-sm text-gray-600">
                            {progress.completed}/{progress.total} トピック完了
                            {progress.accuracy > 0 && ` • 正答率 ${progress.accuracy}%`}
                          </p>
                        </div>
                        <Link href={`/study/${grade}/var1`}>
                          <a>
                            <Button
                              variant={progress.completed === progress.total ? "outline" : "default"}
                              size="sm"
                            >
                              {progress.completed === progress.total ? "復習" : "学習"}
                            </Button>
                          </a>
                        </Link>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="mt-2 text-xs text-blue-600">
                        <Link href={`/eiken/${grade}`}>
                          <a className="underline">
                            英検形式の文法問題に挑戦
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 推奨学習 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>次に学習すべきトピック</CardTitle>
              <CardDescription>推奨学習パスに基づいています</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    5級: 不定詞と動名詞
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    時間軸で理解する不定詞（to do）と動名詞（doing）の使い分け
                  </p>
                  <Link href="/study/5/infinitive-gerund">
                    <a>
                      <Button size="sm" className="w-full">
                        学習を開始
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>学習のコツ</CardTitle>
              <CardDescription>効果的な学習方法</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span className="text-gray-700">
                    毎日同じ時間に学習する習慣をつけましょう
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">2.</span>
                  <span className="text-gray-700">
                    時間軸を意識して、ビジュアルで理解しましょう
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">3.</span>
                  <span className="text-gray-700">
                    間違えた問題は何度も復習しましょう
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">4.</span>
                  <span className="text-gray-700">
                    実際の文で使い分けを練習しましょう
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
