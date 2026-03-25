import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, amount, whatsapp, phone } = await req.json();

    // PushCut notification
    const pushcutResp = await fetch(
      "https://api.pushcut.io/LwrUR20CODgHBOG_HuUOK/notifications/Venda%20Codigo%20Atracao",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "💰 Venda Realizada!",
          text: `Cliente: ${name} - WhatsApp: ${whatsapp} - Valor: ${amount} MT`,
          sound: "default",
        }),
      }
    );

    const pushcutStatus = pushcutResp.status;
    const pushcutBody = await pushcutResp.text();
    console.log("PushCut response:", pushcutStatus, pushcutBody);

    // Resend email notification
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL");

    let resendStatus = 0;
    if (RESEND_API_KEY && NOTIFICATION_EMAIL) {
      const now = new Date().toLocaleString("pt-MZ", { timeZone: "Africa/Maputo" });
      const resendResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Código da Atração <onboarding@resend.dev>",
          to: [NOTIFICATION_EMAIL],
          subject: `💰 Nova Venda - ${name} - ${amount} MT`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #d4a017; border-bottom: 2px solid #d4a017; padding-bottom: 10px;">💰 Nova Venda Realizada!</h1>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Nome</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">WhatsApp</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">${whatsapp}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Telefone de Pagamento</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Valor</td>
                  <td style="padding: 12px; border: 1px solid #ddd; color: #16a34a; font-weight: bold;">${amount} MT</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Data/Hora</td>
                  <td style="padding: 12px; border: 1px solid #ddd;">${now}</td>
                </tr>
              </table>
              <p style="color: #666; font-size: 12px;">Código da Atração Natural — Notificação automática</p>
            </div>
          `,
        }),
      });

      resendStatus = resendResp.status;
      const resendBody = await resendResp.text();
      console.log("Resend response:", resendStatus, resendBody);
    } else {
      console.warn("RESEND_API_KEY or NOTIFICATION_EMAIL not configured");
    }

    return new Response(
      JSON.stringify({ success: true, pushcutStatus, resendStatus }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in notify-sale:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
