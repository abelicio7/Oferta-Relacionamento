import quizDisappointed from "@/assets/quiz-disappointed.jpg";
import quizAnxious from "@/assets/quiz-anxious.jpg";
import quizPretending from "@/assets/quiz-pretending.jpg";
import quizConfused from "@/assets/quiz-confused.jpg";
import quizHesitating from "@/assets/quiz-hesitating.jpg";
import quizBored from "@/assets/quiz-bored.jpg";

export interface QuizQuestionData {
  question: string;
  options: string[];
  image?: string;
}

export const quizQuestions: QuizQuestionData[] = [
  {
    question: "Você costuma iniciar conversas com facilidade?",
    options: ["Sim, mas não duram muito", "Não, tenho dificuldade", "Depende da pessoa"],
    image: quizHesitating,
  },
  {
    question: "O que mais acontece com você?",
    options: [
      "A pessoa perde o interesse",
      "Levo ghosting",
      "A conversa fica sem graça",
      "Nem consigo começar",
    ],
    image: quizDisappointed,
  },
  {
    question: "Quando alguém demora a responder, você:",
    options: [
      "Fica ansioso(a)",
      "Manda outra mensagem",
      "Finge que não liga",
      "Perde o interesse",
    ],
    image: quizAnxious,
  },
  {
    question: "Você sente que sabe o que dizer na hora certa?",
    options: ["Sim", "Às vezes", "Quase nunca"],
  },
  {
    question: "Como você descreveria suas conversas?",
    options: [
      "Normais, mas sem evolução",
      "Meio forçadas",
      "Interessantes no começo",
      "Travadas",
    ],
    image: quizBored,
  },
  {
    question: "Você já pensou algo assim?",
    options: [
      "Eu não sou interessante o suficiente",
      "Sempre dá errado comigo",
      "As pessoas perdem interesse rápido",
      "Nunca pensei nisso",
    ],
  },
  {
    question: "Você costuma adaptar sua personalidade pra agradar?",
    options: ["Sim", "Às vezes", "Não"],
    image: quizPretending,
  },
  {
    question: "Qual sua maior dificuldade hoje?",
    options: [
      "Iniciar conversa",
      "Manter interesse",
      "Criar conexão",
      "Não ser ignorado(a)",
    ],
    image: quizConfused,
  },
  {
    question: "Você já tentou melhorar isso antes?",
    options: [
      "Sim, mas não funcionou",
      "Nunca tentei",
      "Vi dicas soltas na internet",
    ],
  },
  {
    question: "Se você pudesse mudar uma coisa hoje:",
    options: [
      "Ter mais confiança",
      "Saber o que dizer",
      "Não ser ignorado(a)",
      "Ter conversas naturais",
    ],
  },
];
