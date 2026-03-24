import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestionProps {
  question: string;
  options: string[];
  questionIndex: number;
  totalQuestions: number;
  image?: string;
  onAnswer: (answer: string) => void;
}

const QuizQuestion = ({
  question,
  options,
  questionIndex,
  totalQuestions,
  image,
  onAnswer,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => onAnswer(option), 400);
  };

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="quiz-container"
    >
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">
            Pergunta {questionIndex + 1} de {totalQuestions}
          </span>
          <span className="text-xs text-primary font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {image && (
        <img src={image} alt="" className="quiz-image mb-6" />
      )}

      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-6 text-center leading-snug">
        {question}
      </h2>

      <div className="w-full space-y-3">
        <AnimatePresence>
          {options.map((option, i) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelect(option)}
              className={`option-card text-left ${selected === option ? "selected" : ""}`}
            >
              <span className="text-sm font-medium">{option}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizQuestion;
