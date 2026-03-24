import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.link/f9drof";

const ThankYouPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="quiz-container items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <CheckCircle className="w-16 h-16 text-primary mb-4" />
      </motion.div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">
        Pagamento realizado com sucesso!
      </h1>

      <p className="text-muted-foreground text-sm mb-8">
        Obrigado pela sua compra. Clique no botão abaixo para acessar o seu conteúdo.
      </p>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="gold-button w-full flex items-center justify-center gap-2 text-center"
      >
        CLIQUE AQUI PRA ACESSAR
      </a>
    </motion.div>
  );
};

export default ThankYouPage;
