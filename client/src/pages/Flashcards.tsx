import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGrammarQuestionsByGrade } from "@/lib/grammarTopicsData";
import { LearningQuestion, EikenGrade } from "@shared/types";
import { schedule, initCard, loadSrsState, saveSrsState, getDueCards, Rating } from "@/lib/srs";
import { BookOpen, Volume2 } from "lucide-react";

function extractFrontBack(q: LearningQuestion): { front: string; back: string } | null {
  if (q.questionType !== "multiple-choice" || !q.options) return null;
  const correct = q.options.find(o => o.isCorrect);
  if (!correct) return null;
  const parts = q.question.split("？");
  const english = parts[1]?.trim() || "";
  if (!english) return null;
  return { front: english, back: correct.text };
}

export default function Flashcards() {
  const { grade } = useParams<{ grade: EikenGrade }>();
  const [state, setState] = useState<Record<string, any>>({});
  const questions = useMemo(() => getGrammarQuestionsByGrade(grade || "5"), [grade]);
  const cards = useMemo(() => {
    const pairs: { id: string; front: string; back: string }[] = [];
    for (const q of questions) {
      const fb = extractFrontBack(q);
      if (fb) pairs.push({ id: q.id, front: fb.front, back: fb.back });
    }
    return pairs;
  }, [questions]);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const current = cards.find(c => c.id === currentId) || null;
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const s = loadSrsState();
    setState(s);
  }, []);

  useEffect(() => {
    if (!cards.length) return;
    const due = getDueCards(state);
    const nextId = due.find(id => cards.some(c => c.id === id)) || cards[0]?.id || null;
    setCurrentId(nextId);
    setShowBack(false);
  }, [cards, state]);

  const rate = (rating: Rating) => {
    if (!currentId) return;
    const card = state[currentId] || initCard(currentId);
    const updated = schedule(card, rating);
    const newState = { ...state, [currentId]: updated };
    setState(newState);
    saveSrsState(newState);
    setShowBack(false);
  };

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80">
              <BookOpen className="w-8 h-8" />
              <span>英検7×7ナビ</span>
            </a>
          </Link>
          <Badge variant="outline" className="text-sm">
            {grade}級 Flashcards
          </Badge>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        {!current ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">復習カードがありません。</p>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Front</CardTitle>
                <CardDescription>英文を読み、意味を思い出してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-900">{current.front}</p>
                  <Button variant="outline" size="sm" onClick={() => speak(current.front)}>
                    <Volume2 className="w-4 h-4 mr-2" />
                    音声
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setShowBack(true)}>答えを見る</Button>
            </div>
            {showBack && (
              <Card>
                <CardHeader>
                  <CardTitle>Back</CardTitle>
                  <CardDescription>正しい日本語の意味</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-900">{current.back}</p>
                </CardContent>
              </Card>
            )}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="destructive" onClick={() => rate("again")}>Again</Button>
              <Button variant="secondary" onClick={() => rate("hard")}>Hard</Button>
              <Button variant="default" onClick={() => rate("good")}>Good</Button>
              <Button variant="outline" onClick={() => rate("easy")}>Easy</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
