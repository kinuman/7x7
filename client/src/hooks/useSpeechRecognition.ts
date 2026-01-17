import { useState, useEffect, useCallback } from "react";
import { SpeechRecognitionResult } from "@shared/types";

interface UseSpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  maxAlternatives?: number;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  results: SpeechRecognitionResult[];
}

export const useSpeechRecognition = (
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SpeechRecognitionResult[]>([]);

  const {
    continuous = false,
    interimResults = true,
    lang = "en-US",
    maxAlternatives = 1,
  } = options;

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
    } else {
      setError("Speech recognition is not supported in this browser");
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = lang;
      recognition.maxAlternatives = maxAlternatives;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setResults([]);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";
        let maxConfidence = 0;

        const newResults: SpeechRecognitionResult[] = [];

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const confidence = result[0].confidence;

          if (result.isFinal) {
            finalTranscript += transcript;
            maxConfidence = Math.max(maxConfidence, confidence);
            
            newResults.push({
              transcript,
              confidence,
              isFinal: true,
              timestamp: new Date(),
            });
          } else {
            interimTranscript += transcript;
          }
        }

        setResults(prev => [...prev, ...newResults]);
        setTranscript(finalTranscript || interimTranscript);
        setConfidence(maxConfidence);
      };

      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setError("Failed to start speech recognition");
      setIsListening(false);
    }
  }, [isSupported, continuous, interimResults, lang, maxAlternatives]);

  const stopListening = useCallback(() => {
    if (!isListening) return;

    // The recognition will stop automatically when onend is called
    setIsListening(false);
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setConfidence(0);
    setResults([]);
    setError(null);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    results,
  };
};
