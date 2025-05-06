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

    // Save lead in KV
    await env.LEAD_KV.put(`lead:${Date.now()}`, JSON.stringify(lead));

    // Optional: Send to external service (n8n, Zapier, etc.)
    await fetch("https://n8n.yourdomain.com/webhook/lead-intake", {
      method: "POST",
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      // Silent fail to avoid crashing the Worker if webhook fails
    });

    return Response.redirect("/thank-you", 303);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
