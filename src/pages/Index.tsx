import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import LoadingScreen from "@/components/quiz/LoadingScreen";
import ResultPage from "@/components/quiz/ResultPage";
import CheckoutPage from "@/components/quiz/CheckoutPage";
import ThankYouPage from "@/components/quiz/ThankYouPage";
import { quizQuestions } from "@/components/quiz/quizData";

type Step = "intro" | "quiz" | "loading" | "result" | "checkout" | "thankyou";

const Index = () => {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setStep("loading");
    }
  };

  const handleLoadingComplete = useCallback(() => {
    setStep("result");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <QuizIntro key="intro" onStart={() => setStep("quiz")} />
        )}
        {step === "quiz" && (
          <QuizQuestion
            key={`q-${questionIndex}`}
            question={quizQuestions[questionIndex].question}
            options={quizQuestions[questionIndex].options}
            image={quizQuestions[questionIndex].image}
            questionIndex={questionIndex}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswer}
          />
        )}
        {step === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {step === "result" && (
          <ResultPage key="result" onCheckout={() => setStep("checkout")} />
        )}
        {step === "checkout" && (
          <CheckoutPage
            key="checkout"
            onBack={() => setStep("result")}
            onSuccess={() => setStep("thankyou")}
          />
        )}
        {step === "thankyou" && (
          <ThankYouPage key="thankyou" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
