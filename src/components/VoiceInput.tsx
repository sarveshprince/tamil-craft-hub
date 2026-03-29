import { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  lang: 'en-IN' | 'ta-IN';
  onResult: (text: string) => void;
  label: string;
}

const VoiceInput = ({ lang, onResult, label }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' ';
        }
      }
      if (transcript.trim()) {
        onResult(transcript.trim());
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, lang, onResult]);

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
        isListening
          ? 'bg-destructive text-destructive-foreground animate-pulse'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
      title={label}
    >
      {isListening ? (
        <>
          <MicOff className="w-3.5 h-3.5" /> Stop
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5" /> {label}
        </>
      )}
    </button>
  );
};

export default VoiceInput;
