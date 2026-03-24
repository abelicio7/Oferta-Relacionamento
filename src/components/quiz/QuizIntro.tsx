import { motion } from "framer-motion";
import quizImage from "@/assets/quiz-disappointed.jpg";

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="quiz-container text-center"
    >
      <img
        src={quizImage}
        alt="Pessoa olhando o celular"
        className="quiz-image mb-8"
      />
      <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight mb-4">
        Por que você{" "}
        <span className="gold-text">não consegue criar conexão</span>{" "}
        (mesmo tentando)?
      </h1>
      <p className="text-muted-foreground text-base mb-2">
        Descubra o que está sabotando suas conversas e como resolver isso.
      </p>
      <p className="text-muted-foreground text-sm mb-8 italic">
        — você não está sozinho(a)
      </p>
      <button onClick={onStart} className="gold-button w-full max-w-xs">
        Começar agora
      </button>
      <p className="text-muted-foreground text-xs mt-4">
        Quiz rápido · 2 minutos
      </p>
    </motion.div>
  );
};

export default QuizIntro;
