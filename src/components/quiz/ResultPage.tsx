import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.png";
import quizMirror from "@/assets/quiz-mirror.jpg";

interface ResultPageProps {
  onCheckout: () => void;
}

const ResultPage = ({ onCheckout }: ResultPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="quiz-container"
    >
      {/* Result diagnosis */}
      <div className="text-center mb-8">
        <img src={quizMirror} alt="" className="quiz-image mb-6" />
        <p className="text-sm text-primary font-medium mb-2 tracking-wide uppercase">
          Com base nas suas respostas...
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight">
          Seu maior bloqueio é:{" "}
          <span className="gold-text">Falta de Estrutura na Comunicação</span>
        </h1>
        <p className="text-secondary-foreground text-sm leading-relaxed mb-4">
          O principal problema não é sua personalidade. Você apenas não aprendeu
          ainda como conduzir uma conversa de forma natural.
        </p>
        <div className="section-card text-left mb-4">
          <p className="text-sm text-secondary-foreground mb-3">Isso faz com que:</p>
          <ul className="space-y-2">
            {[
              "As conversas morram rápido",
              "As pessoas percam interesse",
              "Você se sinta inseguro(a)",
            ].map((item) => (
              <li key={item} className="check-item text-sm">
                <span className="text-primary mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm italic text-muted-foreground">
          "Isso acontece com muita gente — e não é culpa sua."
        </p>
      </div>

      {/* Transition to offer */}
      <div className="w-full text-center mb-8">
        <h2 className="font-display text-xl font-semibold gold-text mb-2">
          A boa notícia: isso pode ser corrigido rapidamente
        </h2>
      </div>

      {/* Offer */}
      <div className="section-card w-full mb-6">
        <div className="flex justify-center mb-4">
          <img
            src={ebookCover}
            alt="Código da Atração Natural"
            className="w-48 drop-shadow-xl"
          />
        </div>
        <h3 className="font-display text-xl font-bold text-center gold-text mb-4">
          Código da Atração Natural
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Um método simples que ensina exatamente:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            "O que dizer em cada fase da conversa",
            "Como manter interesse sem esforço",
            "Como evitar erros que causam rejeição",
            "Como criar conexão real sem fingir",
          ].map((item) => (
            <li key={item} className="check-item text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="section-card w-full text-center mb-4">
        <p className="text-sm text-muted-foreground mb-1">Acesso imediato por apenas</p>
        <p className="font-display text-3xl font-bold gold-text mb-1">197 MZN</p>
        <p className="text-xs text-primary animate-pulse-gold">
          Disponível hoje por esse valor
        </p>
      </div>

      {/* Guarantee */}
      <div className="flex items-center gap-3 w-full section-card mb-6">
        <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold">7 dias de garantia total</p>
          <p className="text-xs text-muted-foreground">
            Se não gostar, devolvemos seu dinheiro.
          </p>
        </div>
      </div>

      {/* CTA */}
      <button onClick={onCheckout} className="gold-button w-full flex items-center justify-center gap-2 mb-3">
        QUERO DESTRAVAR MINHAS CONVERSAS AGORA
        <ArrowRight className="w-5 h-5" />
      </button>
      <button
        onClick={onCheckout}
        className="w-full text-center text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
      >
        Começar Agora
      </button>
    </motion.div>
  );
};

export default ResultPage;
