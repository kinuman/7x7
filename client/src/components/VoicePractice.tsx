import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  Play,
  Pause
} from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { PronunciationCheckResult } from "@shared/types";

interface VoicePracticeProps {
  targetPhrase: string;
  japaneseTranslation: string;
  onComplete: (result: PronunciationCheckResult) => void;
  onNext?: () => void;
}

export default function VoicePractice({
  targetPhrase,
  japaneseTranslation,
  onComplete,
  onNext,
}: VoicePracticeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState<PronunciationCheckResult | null>(null);

  const {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    continuous: false,
    interimResults: true,
    lang: "en-US",
  });

  // Text-to-speech for target phrase
  const speakTargetPhrase = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(targetPhrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple pronunciation scoring (in real app, would use more sophisticated algorithm)
  const calculatePronunciationScore = (userTranscript: string, target: string): number => {
    const userWords = userTranscript.toLowerCase().trim().split(/\s+/);
    const targetWords = target.toLowerCase().trim().split(/\s+/);
    
    let matches = 0;
    for (const targetWord of targetWords) {
      if (userWords.some(userWord => 
        userWord.includes(targetWord) || targetWord.includes(userWord)
      )) {
        matches++;
      }
    }
    
    return Math.round((matches / targetWords.length) * 100);
  };

  const generateFeedback = (score: number): string => {
    if (score >= 90) return "Excellent! Your pronunciation is very clear and accurate.";
    if (score >= 75) return "Good job! Your pronunciation is quite good with minor improvements needed.";
    if (score >= 60) return "Not bad! Keep practicing to improve your clarity and accuracy.";
    if (score >= 40) return "Keep trying! Focus on speaking more clearly and slowly.";
    return "Don't give up! Listen carefully to the target phrase and try again.";
  };

  const generateSuggestions = (score: number, userTranscript: string, target: string): string[] => {
    const suggestions = [];
    
    if (score < 70) {
      suggestions.push("Try speaking more slowly and clearly");
      suggestions.push("Listen to the target phrase multiple times");
    }
    
    if (userTranscript.split(/\s+/).length < target.split(/\s+/).length) {
      suggestions.push("Make sure to pronounce all words in the phrase");
    }
    
    if (score < 50) {
      suggestions.push("Practice individual words first");
      suggestions.push("Pay attention to word endings and sounds");
    }
    
    return suggestions;
  };

  const handleStopListening = () => {
    stopListening();
    
    if (transcript.trim()) {
      const score = calculatePronunciationScore(transcript, targetPhrase);
      const feedback = generateFeedback(score);
      const suggestions = generateSuggestions(score, transcript, targetPhrase);
      
      const result: PronunciationCheckResult = {
        transcript,
        targetPhrase,
        similarity: score,
        feedback,
        suggestions,
      };
      
      setPronunciationResult(result);
      setBestScore(Math.max(bestScore, score));
      setAttempts(attempts + 1);
      setShowResult(true);
      
      onComplete(result);
    }
  };

  const handleRetry = () => {
    resetTranscript();
    setShowResult(false);
    setPronunciationResult(null);
  };

  const handleNext = () => {
    handleRetry();
    setAttempts(0);
    setBestScore(0);
    onNext?.();
  };

  useEffect(() => {
    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [isListening, stopListening]);

  if (!isSupported) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Speech Recognition Not Supported
            </h3>
            <p className="text-gray-600">
              Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Target Phrase Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice Practice
          </CardTitle>
          <CardDescription>
            Listen to the phrase and repeat it clearly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-lg font-medium text-blue-900 mb-2">
              {targetPhrase}
            </p>
            <p className="text-sm text-blue-700">
              {japaneseTranslation}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={speakTargetPhrase}
              disabled={isPlaying}
              variant="outline"
              className="flex-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Playing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Listen to Phrase
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recording Interface */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {/* Microphone Button */}
            <Button
              size="lg"
              onClick={isListening ? handleStopListening : startListening}
              disabled={showResult}
              className={`w-20 h-20 rounded-full ${
                isListening 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                {isListening ? "Listening..." : "Tap the microphone to start"}
              </p>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Transcript Display */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <p className="text-lg">{transcript}</p>
                {confidence > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Confidence</span>
                      <span>{Math.round(confidence * 100)}%</span>
                    </div>
                    <Progress value={confidence * 100} className="h-2" />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResult && pronunciationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {pronunciationResult.similarity >= 75 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-orange-500" />
                )}
                Pronunciation Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <span className={
                    pronunciationResult.similarity >= 75 ? "text-green-600" :
                    pronunciationResult.similarity >= 50 ? "text-orange-600" : "text-red-600"
                  }>
                    {pronunciationResult.similarity}%
                  </span>
                </div>
                <Badge variant={
                  pronunciationResult.similarity >= 75 ? "default" :
                  pronunciationResult.similarity >= 50 ? "secondary" : "destructive"
                }>
                  {pronunciationResult.similarity >= 75 ? "Excellent" :
                   pronunciationResult.similarity >= 50 ? "Good" : "Keep Practicing"}
                </Badge>
              </div>

              {/* Feedback */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{pronunciationResult.feedback}</p>
              </div>

              {/* Suggestions */}
              {pronunciationResult.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Suggestions:</h4>
                  <ul className="space-y-1">
                    {pronunciationResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-600 mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{attempts}</p>
                  <p className="text-sm text-gray-600">Attempts</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{bestScore}%</p>
                  <p className="text-sm text-gray-600">Best Score</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleRetry} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                {onNext && (
                  <Button onClick={handleNext} className="flex-1">
                    Next Phrase
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
