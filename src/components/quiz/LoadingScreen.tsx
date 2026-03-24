import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const messages = [
  "Analisando suas respostas...",
  "Identificando seu principal bloqueio...",
  "Preparando seu diagnóstico personalizado...",
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 1.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setMessageIndex(1), 1200);
    const t2 = setTimeout(() => setMessageIndex(2), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="quiz-container text-center"
    >
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-muted border-t-primary animate-spin" />
      </div>

      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-medium mb-6 gold-text"
      >
        {messages[messageIndex]}
      </motion.p>

      <div className="w-full max-w-xs mx-auto">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
