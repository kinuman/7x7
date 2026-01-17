import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Target,
  BookOpen,
  Volume2,
  RotateCcw,
} from "lucide-react";
import { useLearningProgress } from "@/contexts/LearningProgressContext";
import { LearningQuestion, QuestionType, EikenGrade } from "@shared/types";
import EikenMultipleChoice from "@/components/EikenMultipleChoice";
import EikenReorder from "@/components/EikenReorder";
import VoicePractice from "@/components/VoicePractice";
import { getGrammarQuestionsByGrade, grammarTopics } from "@/lib/grammarTopicsData";

interface EikenPracticeProps {}

const SAMPLE_QUESTIONS: LearningQuestion[] = [
  {
    id: "mcq-1",
    topicId: "infinitive-gerund",
    grade: "5",
    questionType: "multiple-choice",
    question: "I enjoy _____ books every evening.",
    options: [
      { id: "a", text: "to read", isCorrect: false, explanation: "'Enjoy' is followed by gerund (-ing form), not infinitive" },
      { id: "b", text: "reading", isCorrect: true, explanation: "'Enjoy' is followed by gerund (-ing form)" },
      { id: "c", text: "read", isCorrect: false, explanation: "'Enjoy' needs the gerund form (-ing)" },
      { id: "d", text: "to reading", isCorrect: false, explanation: "This is incorrect grammar structure" },
    ],
    explanation: "The verb 'enjoy' is followed by a gerund (-ing form), not an infinitive.",
    difficulty: "easy",
  },
  {
    id: "reorder-1",
    topicId: "infinitive-gerund",
    grade: "5",
    questionType: "reorder",
    question: "Rearrange the words to make a correct sentence:",
    correctAnswer: "I want to go to the park",
    explanation: "The verb 'want' is followed by an infinitive (to + verb).",
    difficulty: "medium",
  },
  {
    id: "voice-1",
    topicId: "infinitive-gerund",
    grade: "5",
    questionType: "fill-blank",
    question: "Repeat this sentence: 'I like swimming in the ocean'",
    correctAnswer: "I like swimming in the ocean",
    explanation: "Practice your pronunciation of the gerund form 'swimming'.",
    difficulty: "easy",
  },
];

const VOICE_PHRASES = [
  { english: "I enjoy reading books", japanese: "私は本を読むのが好きです" },
  { english: "She wants to learn English", japanese: "彼女は英語を学びたいです" },
  { english: "They decided to go home", japanese: "彼らは家に帰ることに決めました" },
];

const getQuestionsForGrade = (grade: EikenGrade | undefined): LearningQuestion[] => {
  const targetGrade = grade || "5";
  const grammarQuestions = getGrammarQuestionsByGrade(targetGrade);
  if (grammarQuestions.length > 0) {
    return grammarQuestions;
  }
  return SAMPLE_QUESTIONS;
};

export default function EikenPractice({}: EikenPracticeProps) {
  const { grade } = useParams<{ grade: EikenGrade }>();
  const { recordAnswer } = useLearningProgress();
  const questions = getQuestionsForGrade(grade);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<{questionId: string; isCorrect: boolean; timeSpent: number}>>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const remaining = Math.max(questions.length - (currentQuestionIndex + 1), 0);
  const topic = currentQuestion ? grammarTopics.find(t => t.id === currentQuestion.topicId) : undefined;
  const difficultyLabel = currentQuestion?.difficulty === "easy" ? "やさしい" : currentQuestion?.difficulty === "medium" ? "ふつう" : "むずかしい";
  const timelineLabel = (pos: string | undefined) => {
    if (pos === "past") return "過去";
    if (pos === "present") return "現在";
    if (pos === "future") return "未来";
    return "時制";
  };

  const handleAnswer = (questionId: string, answer: string | string[], isCorrect: boolean) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Record answer in learning progress
    recordAnswer(questionId, isCorrect, timeSpent);
    
    // Add to local answers
    setAnswers(prev => [...prev, { questionId, isCorrect, timeSpent }]);
    
    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      setStartTime(Date.now());
    } else {
      setShowResults(true);
    }
  };

  const handleVoiceComplete = (result: any) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = result.similarity >= 75;
    
    recordAnswer(currentQuestion.id, isCorrect, timeSpent);
    setAnswers(prev => [...prev, { 
      questionId: currentQuestion.id, 
      isCorrect, 
      timeSpent 
    }]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      setStartTime(Date.now());
    } else {
      setShowResults(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      setStartTime(Date.now());
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setStartTime(Date.now());
    setShowResults(false);
    setCurrentVoiceIndex(0);
  };

  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalTime = answers.reduce((sum: number, a) => sum + a.timeSpent, 0);
  const accuracy = answers.length > 0 ? Math.round((correctAnswers / answers.length) * 100) : 0;

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.questionType) {
      case "multiple-choice":
        return (
          <EikenMultipleChoice
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            timeLimit={60}
          />
        );
      
      case "reorder":
        return (
          <EikenReorder
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            timeLimit={90}
          />
        );
      
      case "fill-blank":
        const voicePhrase = VOICE_PHRASES[currentVoiceIndex % VOICE_PHRASES.length];
        return (
          <VoicePractice
            targetPhrase={voicePhrase.english}
            japaneseTranslation={voicePhrase.japanese}
            onComplete={handleVoiceComplete}
            onNext={() => setCurrentVoiceIndex(prev => prev + 1)}
          />
        );
      
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                Question type not supported yet.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/dashboard">
              <a className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80">
                <BookOpen className="w-8 h-8" />
                <span>英検7×7ナビ</span>
              </a>
            </Link>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Practice Complete!</CardTitle>
                <CardDescription>
                  Here's how you did on the {grade}級 Eiken format practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Summary */}
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">
                    <span className={accuracy >= 80 ? "text-green-600" : accuracy >= 60 ? "text-yellow-600" : "text-red-600"}>
                      {accuracy}%
                    </span>
                  </div>
                  <Badge variant={accuracy >= 80 ? "default" : accuracy >= 60 ? "secondary" : "destructive"} className="mb-4">
                    {accuracy >= 80 ? "Excellent" : accuracy >= 60 ? "Good" : "Keep Practicing"}
                  </Badge>
                  <p className="text-gray-600">
                    {correctAnswers} out of {answers.length} questions correct
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{correctAnswers}</p>
                    <p className="text-sm text-blue-700">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{Math.round(totalTime / 60)}m</p>
                    <p className="text-sm text-green-700">Total Time</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{Math.round(totalTime / answers.length)}s</p>
                    <p className="text-sm text-purple-700">Avg Time</p>
                  </div>
                </div>

                {/* Performance by Question Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Performance by Type</h3>
                  <div className="space-y-2">
                    {["multiple-choice", "reorder", "fill-blank"].map((type, index) => {
                      const typeAnswers = answers.filter((_, i) => 
                        questions[i]?.questionType === type
                      );
                      const typeCorrect = typeAnswers.filter(a => a.isCorrect).length;
                      const typeAccuracy = typeAnswers.length > 0 ? 
                        Math.round((typeCorrect / typeAnswers.length) * 100) : 0;
                      
                      return (
                        <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium capitalize">
                            {type.replace("-", " ")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {typeCorrect}/{typeAnswers.length}
                            </span>
                            <Progress value={typeAccuracy} className="w-20 h-2" />
                            <span className="text-sm font-medium w-12 text-right">
                              {typeAccuracy}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button onClick={handleRestart} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Link href={`/study/${grade}`}>
                    <a className="flex-1">
                      <Button className="w-full">
                        Continue Studying
                      </Button>
                    </a>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80">
              <BookOpen className="w-8 h-8" />
              <span>英検7×7ナビ</span>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {grade}級 Eiken Practice
            </Badge>
            <Link href="/dashboard">
              <a>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 flex items-center justify-between">
              <span className="text-xs text-blue-700">級</span>
              <span className="text-sm font-semibold text-blue-900">{grade}級</span>
            </div>
            <div className="p-3 rounded-lg bg-green-50 flex items-center justify-between">
              <span className="text-xs text-green-700">難易度</span>
              <span className="text-sm font-semibold text-green-900">{difficultyLabel}</span>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 flex items-center justify-between">
              <span className="text-xs text-purple-700">残り</span>
              <span className="text-sm font-semibold text-purple-900">{remaining}</span>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 flex items-center justify-between">
              <span className="text-xs text-orange-700">時制</span>
              <span className="text-sm font-semibold text-orange-900">
                {timelineLabel(topic?.timelinePosition || (currentQuestion as any)?.timelineHint)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {renderQuestion()}
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" onClick={handleNextQuestion}>
                Skip
              </Button>
              <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => prev)}>
                Flag
              </Button>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {topic ? topic.title : "文法情報"}
                </CardTitle>
                <CardDescription>
                  {topic ? topic.description : "この問題の関連情報"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">級</span>
                  <span className="text-sm font-semibold text-gray-900">{topic?.grade || grade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">時制</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {timelineLabel(topic?.timelinePosition || (currentQuestion as any)?.timelineHint)}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">ポイント</h4>
                  <p className="text-sm text-gray-700">
                    {topic?.explanation || "この問題は時制や用法の理解を問います。"}
                  </p>
                </div>
                {topic?.examples?.[0] && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">{topic.examples[0].english}</p>
                    <p className="text-xs text-gray-600 mt-1">{topic.examples[0].japanese}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
