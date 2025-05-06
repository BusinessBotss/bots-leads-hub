export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    if (!name || !email) {
      return new Response("Missing required fields", { status: 400 });
    }

    const lead = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    // Store lead in KV
    await env.LEAD_KV.put(`lead:${Date.now()}`, JSON.stringify(lead));

    // Optional: send to external service (n8n, Zapier, etc.)
    await fetch("https://n8n.yourdomain.com/webhook/lead-intake", {
      method: "POST",
      body: J
