import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ebookCover from "@/assets/ebook-cover.png";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PRODUCT_PRICE = 197;
const PRODUCT_NAME = "Código da Atração Natural";

const CheckoutPage = ({ onBack, onSuccess }: CheckoutPageProps) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState<"mpesa" | "emola">("mpesa");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(10 * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `00:${m}:${s}`;
  };

  const validatePhone = () => {
    const validMpesa = /^8[45]/.test(phone);
    const validEmola = /^8[67]/.test(phone);
    if (payment === "mpesa" && !validMpesa) {
      toast.error("Use um número M-Pesa válido (84 ou 85)");
      return false;
    }
    if (payment === "emola" && !validEmola) {
      toast.error("Use um número E-Mola válido (86 ou 87)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !whatsapp || !phone) {
      toast.error("Por favor preencha todos os campos.");
      return;
    }

    if (!validatePhone()) return;

    setLoading(true);

    try {
      // Get OAuth token
      const tokenResp = await fetch(
        "https://e2payments.explicador.co.mz/oauth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "9fa16fb1-6d57-4492-8330-577439e15598",
            client_secret: "J2b5zbMDzOA3C3mPFVl3qx12jVb3n2qcwDbQDZyA",
          }),
        }
      );

      const tokenData = await tokenResp.json();
      const token = tokenData.access_token;

      if (!token) throw new Error("Token inválido");

      // Process payment
      const endpoint =
        payment === "mpesa"
          ? "https://e2payments.explicador.co.mz/v1/c2b/mpesa-payment/993729"
          : "https://e2payments.explicador.co.mz/v1/c2b/emola-payment/993730";

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: new URLSearchParams({
          client_id: "9fa16fb1-6d57-4492-8330-577439e15598",
          amount: String(PRODUCT_PRICE),
          reference: "codigoatracao",
          phone: phone,
        }),
      });

      const result = await resp.json();
      console.log("Payment response:", result);

      if (result.success && result.success.includes("sucesso")) {
        // Store for tracking
        localStorage.setItem("whatsapp", whatsapp);
        localStorage.setItem("telefone", phone);

        // Facebook Pixel Purchase event
        try {
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Purchase", {
              value: PRODUCT_PRICE,
              currency: "MZN",
            });
          }
        } catch (err) {
          console.warn("FB Pixel error:", err);
        }

        // Push notification
        fetch(
          "https://api.pushcut.io/LwrUR20CODgHBOG_HuUOK/notifications/Venda%20Codigo%20Atracao",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "💰 Venda Realizada!",
              text: `Cliente: ${name} - Valor: ${PRODUCT_PRICE} MT`,
              sound: "default",
            }),
          }
        ).catch(() => {});

        // UTMify conversion
        fetch("https://api.utmify.com.br/v1/conversao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer OfVfyXd4CySQhlccI4KMH4wLeXybXDxLz42C",
          },
          body: JSON.stringify({
            valor: PRODUCT_PRICE,
            nome: "codigoatracao",
            email: email,
            telefone: phone,
            utm_source: localStorage.getItem("utm_source"),
            utm_medium: localStorage.getItem("utm_medium"),
            utm_campaign: localStorage.getItem("utm_campaign"),
            utm_content: localStorage.getItem("utm_content"),
          }),
        }).catch(() => {});

        onSuccess();
      } else {
        toast.error("Pagamento não concluído. A transação foi cancelada ou falhou.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão. Não foi possível processar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="quiz-container"
    >
      {/* Countdown bar */}
      <div className="w-full bg-destructive/90 text-destructive-foreground text-center py-2 rounded-xl text-sm font-bold mb-4">
        Oferta expira em {formatTime(countdown)}
      </div>

      <button
        onClick={onBack}
        className="self-start flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      {/* Secure badge */}
      <div className="flex justify-between items-center w-full text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1 font-semibold text-foreground">
          ✅ COMPRA 100% SEGURA
        </span>
        <span className="flex items-center gap-1">
          🇲🇿 Moçambique
        </span>
      </div>

      {/* Product */}
      <div className="flex items-center gap-4 mb-6 w-full">
        <img src={ebookCover} alt="Ebook" className="w-16 rounded-lg shadow-lg" />
        <div>
          <h2 className="font-display text-base font-bold">{PRODUCT_NAME}</h2>
          <p className="text-xs text-muted-foreground">Acesso imediato</p>
          <p className="gold-text font-bold text-lg">{PRODUCT_PRICE},00 MT</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Nome completo</label>
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
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Método de pagamento</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayment("mpesa")}
              className={`option-card text-center py-3 ${payment === "mpesa" ? "selected" : ""}`}
            >
              <span className="text-sm font-semibold">📱 M-Pesa</span>
            </button>
            <button
              type="button"
              onClick={() => setPayment("emola")}
              className={`option-card text-center py-3 ${payment === "emola" ? "selected" : ""}`}
            >
              <span className="text-sm font-semibold">📲 E-Mola</span>
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Número de pagamento</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder={payment === "mpesa" ? "84/85 xxx xxxx" : "86/87 xxx xxxx"}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Price summary */}
        <div className="section-card w-full">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{PRODUCT_NAME}</span>
            <span className="font-bold">{PRODUCT_PRICE},00 MT</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="gold-button w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            "COMPRAR AGORA"
          )}
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
