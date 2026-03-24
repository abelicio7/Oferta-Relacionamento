import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.png";

interface CheckoutPageProps {
  onBack: () => void;
}

const CheckoutPage = ({ onBack }: CheckoutPageProps) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [payment, setPayment] = useState<"mpesa" | "emola" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Checkout será integrado em breve! Obrigado pelo interesse.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="quiz-container"
    >
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img src={ebookCover} alt="Ebook" className="w-20 rounded-lg shadow-lg" />
        <div>
          <h2 className="font-display text-lg font-bold">Código da Atração Natural</h2>
          <p className="gold-text font-bold text-xl">197 MZN</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Seu nome completo"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">WhatsApp</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            placeholder="+258 84 000 0000"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Pagamento</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayment("mpesa")}
              className={`option-card text-center py-3 ${payment === "mpesa" ? "selected" : ""}`}
            >
              <span className="text-sm font-semibold">M-Pesa</span>
            </button>
            <button
              type="button"
              onClick={() => setPayment("emola")}
              className={`option-card text-center py-3 ${payment === "emola" ? "selected" : ""}`}
            >
              <span className="text-sm font-semibold">E-Mola</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!name || !whatsapp || !payment}
          className="gold-button w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          FINALIZAR COMPRA
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4" />
          Pagamento seguro · 7 dias de garantia
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutPage;
