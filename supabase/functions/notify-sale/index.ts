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

    return new Response(
      JSON.stringify({ success: true, pushcutStatus }),
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
