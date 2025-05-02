import { useState, useRef, useEffect } from "react";

export const useVoiceToText = (onResult: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error);
      };
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  }, [onResult]);

  const startRecording = () => {
    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
