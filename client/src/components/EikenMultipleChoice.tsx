import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";
import { LearningQuestion, QuestionOption } from "@shared/types";

interface EikenMultipleChoiceProps {
  question: LearningQuestion;
  onAnswer: (questionId: string, selectedOption: string, isCorrect: boolean) => void;
  onNext?: () => void;
  showFeedback?: boolean;
  timeLimit?: number;
}

export default function EikenMultipleChoice({
  question,
  onAnswer,
  onNext,
  showFeedback = true,
  timeLimit,
}: EikenMultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [isTimerActive, setIsTimerActive] = useState(!!timeLimit);

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
      onAnswer(question.id, "", false);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || hasAnswered) return;

    const selectedOptionData = question.options?.find(opt => opt.id === selectedOption);
    const isCorrect = selectedOptionData?.isCorrect || false;
    
    setHasAnswered(true);
    setIsTimerActive(false);
    onAnswer(question.id, selectedOption, isCorrect);
  };

  const handleNext = () => {
    setSelectedOption("");
    setHasAnswered(false);
    setTimeRemaining(timeLimit || 0);
    setIsTimerActive(!!timeLimit);
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

  const selectedOptionData = question.options?.find(opt => opt.id === selectedOption);

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
                Multiple Choice
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
            Read the question and choose the best answer.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Question Text */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium text-blue-900 leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const isSelected = selectedOption === option.id;
                const showCorrect = hasAnswered && showFeedback;
                const isCorrect = option.isCorrect;
                const isSelectedCorrect = isSelected && isCorrect;
                const isSelectedWrong = isSelected && !isCorrect;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full justify-start text-left p-4 h-auto whitespace-normal ${
                        showCorrect && isCorrect ? "bg-green-100 border-green-300" : ""
                      } ${
                        showCorrect && isSelectedWrong ? "bg-red-100 border-red-300" : ""
                      }`}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={hasAnswered}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? "bg-primary border-primary" : "border-gray-300"
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{option.text}</p>
                          {showCorrect && isCorrect && (
                            <div className="flex items-center gap-1 mt-2 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Correct Answer</span>
                            </div>
                          )}
                          {showCorrect && isSelectedWrong && (
                            <div className="flex items-center gap-1 mt-2 text-red-600">
                              <XCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Your Answer</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {!hasAnswered ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              ) : (
                <>
                  {showFeedback && selectedOptionData && (
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                      <p className="text-gray-700">
                        {selectedOptionData.explanation || question.explanation}
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
      {hasAnswered && showFeedback && selectedOptionData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={selectedOptionData.isCorrect ? "border-green-200" : "border-red-200"}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {selectedOptionData.isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Correct!</h3>
                      <p className="text-green-700">Well done! You chose the right answer.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-900">Incorrect</h3>
                      <p className="text-red-700">
                        The correct answer is highlighted above. Review the explanation.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
