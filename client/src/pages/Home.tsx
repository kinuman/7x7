import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";

/**
 * ホーム画面：ユーザーが学習を開始するためのランディングページ
 * 認証情報の取得を避けて、シンプルなUI を表示
 */
export default function Home() {
  const [, navigate] = useLocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStartLearning = () => {
    // ログインなしで直接ダッシュボードへ遷移するように修正
    navigate("/dashboard");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">📚 英検7×7ナビ</h1>
          <div className="text-sm text-gray-600">
            不定詞と動名詞の時間軸学習法
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* タイトル */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              英検合格への最短ルート
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              不定詞と動名詞の「時間軸」を理解すれば、英文法はシンプルになります。
            </p>
            <p className="text-lg text-gray-600">
              7×7メソッドで、確実に習得しましょう。
            </p>
          </div>

          {/* 時間軸の説明 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              時間軸で理解する英文法
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* to do */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  to do
                </div>
                <div className="text-lg text-blue-700 font-semibold mb-4">
                  未来・目的
                </div>
                <p className="text-gray-700 mb-4">
                  「これからやることについて」話すときに使う
                </p>
                <div className="bg-white rounded p-4 text-sm">
                  <p className="font-semibold text-blue-900 mb-2">
                    I want to travel
                  </p>
                  <p className="text-gray-600">
                    これからしたいこと
                  </p>
                </div>
              </div>

              {/* doing */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  doing
                </div>
                <div className="text-lg text-green-700 font-semibold mb-4">
                  現在・経験
                </div>
                <p className="text-gray-700 mb-4">
                  「今やっていることや経験について」話すときに使う
                </p>
                <div className="bg-white rounded p-4 text-sm">
                  <p className="font-semibold text-green-900 mb-2">
                    I enjoy traveling
                  </p>
                  <p className="text-gray-600">
                    今の経験
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-300">
              <p className="text-center text-gray-700">
                <span className="font-bold text-purple-700">複雑な文法ルール</span>
                を「時の知り」で可視化。直感的に理解できるから、確実に定着します。
              </p>
            </div>
          </div>

          {/* 7×7メソッドの説明 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              7×7メソッド
            </h3>
            <p className="text-gray-700 mb-6">
              7つの動詞 × 7種類の練習形式 = 49問の完全マスター
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-bold text-blue-900 mb-2">7つのバリエーション</p>
                <p className="text-sm text-gray-700">
                  want, enjoy, finish, hope, stop, remember, try
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-green-900 mb-2">7種類の練習形式</p>
                <p className="text-sm text-gray-700">
                  選択肢、穴埋め、例文理解、時間軸理解、並び替え、対比、総合問題
                </p>
              </div>
            </div>
          </div>

          {/* CTA ボタン */}
          <div className="text-center">
            <Button
              onClick={handleStartLearning}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold rounded-lg shadow-lg"
            >
              学習を開始
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              ログインして、あなたの学習を始めましょう
            </p>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2026 英検7×7ナビ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
