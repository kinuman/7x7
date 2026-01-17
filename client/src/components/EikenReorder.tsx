import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, RotateCcw, GripVertical } from "lucide-react";
import { LearningQuestion } from "@shared/types";

interface ReorderItem {
  id: string;
  text: string;
  correctPosition: number;
}

interface EikenReorderProps {
  question: LearningQuestion;
  onAnswer: (questionId: string, reorderedItems: string[], isCorrect: boolean) => void;
  onNext?: () => void;
  showFeedback?: boolean;
  timeLimit?: number;
}

export default function EikenReorder({
  question,
  onAnswer,
  onNext,
  showFeedback = true,
  timeLimit,
}: EikenReorderProps) {
  // Parse the question to extract reorderable items
  const parseReorderItems = (): ReorderItem[] => {
    // For now, assume the question has a structured format
    // In a real implementation, this would parse from the question data
    const items: ReorderItem[] = [
      { id: "1", text: "I", correctPosition: 0 },
      { id: "2", text: "to the park", correctPosition: 2 },
      { id: "3", text: "went", correctPosition: 1 },
      { id: "4", text: "yesterday", correctPosition: 3 },
    ];
    return items;
  };

  const [items, setItems] = useState<ReorderItem[]>(parseReorderItems());
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [isTimerActive, setIsTimerActive] = useState(!!timeLimit);
  const [draggedItem, setDraggedItem] = useState<ReorderItem | null>(null);

  // Handle timer
  useState(() => {
    if (timeLimit && isTimerActive) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  });

  const handleTimeUp = () => {
    if (!hasAnswered) {
      setHasAnswered(true);
      const currentOrder = items.map(item => item.id);
      onAnswer(question.id, currentOrder, false);
    }
  };

  const handleDragStart = (item: ReorderItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem: ReorderItem) => {
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const newItems = [...items];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = newItems.findIndex(item => item.id === targetItem.id);

    // Swap items
    newItems[draggedIndex] = targetItem;
    newItems[targetIndex] = draggedItem;

    setItems(newItems);
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    if (hasAnswered) return;

    const isCorrect = items.every(item => 
      items.indexOf(item) === item.correctPosition
    );
    
    const currentOrder = items.map(item => item.id);
    setHasAnswered(true);
    setIsTimerActive(false);
    onAnswer(question.id, currentOrder, isCorrect);
  };

  const handleReset = () => {
    setItems(parseReorderItems());
    setHasAnswered(false);
    setTimeRemaining(timeLimit || 0);
    setIsTimerActive(!!timeLimit);
  };

  const handleNext = () => {
    handleReset();
    onNext?.();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCorrect = items.every(item => 
    items.indexOf(item) === item.correctPosition
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Question Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline">
                Sentence Reordering
              </Badge>
            </div>
            {timeLimit && (
              <div className={`flex items-center gap-2 ${
                timeRemaining <= 10 ? "text-red-600" : "text-gray-600"
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
          <CardTitle className="text-lg">
            Drag and drop the words to make a correct sentence.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Question Context */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900">
                Rearrange the words below to form a grammatically correct sentence:
              </p>
            </div>

            {/* Reorderable Items */}
            <div className="space-y-3">
              {items.map((item, index) => {
                const itemIsCorrect = index === item.correctPosition;
                const showCorrect = hasAnswered && showFeedback;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    drag={!hasAnswered}
                    onDragStart={() => handleDragStart(item)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(item)}
                  >
                    <div
                      className={`p-4 rounded-lg border-2 cursor-move transition-all ${
                        showCorrect && itemIsCorrect
                          ? "bg-green-50 border-green-300"
                          : showCorrect && !itemIsCorrect
                          ? "bg-red-50 border-red-300"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <span className="text-lg font-medium">{item.text}</span>
                        {showCorrect && (
                          <div className="ml-auto">
                            {itemIsCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Current Sentence Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Current sentence:</p>
              <p className="text-lg font-medium text-gray-900">
                {items.map(item => item.text).join(" ")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!hasAnswered ? (
                <>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    Submit Answer
                  </Button>
                </>
              ) : (
                <>
                  {showFeedback && (
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                      <p className="text-gray-700">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                  {onNext && (
                    <Button onClick={handleNext} className="flex-1">
                      Next Question
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Summary */}
      {hasAnswered && showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={isCorrect ? "border-green-200" : "border-red-200"}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Perfect!</h3>
                      <p className="text-green-700">
                        You arranged the words in the correct order.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-900">Not Quite Right</h3>
                      <p className="text-red-700">
                        The correct order is shown above. Review the explanation.
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Correct Answer */}
              {!isCorrect && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    Correct sentence:
                  </p>
                  <p className="text-green-900">
                    {parseReorderItems()
                      .sort((a, b) => a.correctPosition - b.correctPosition)
                      .map(item => item.text)
                      .join(" ")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
