export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  if (!name || !email) {
    return new Response("Missing fields", { status: 400 });
  }

  const lead = { name, email, message, createdAt: new Date().toISOString() };
  await env.LEAD_KV.put(`lead:${Date.now()}`, JSON.stringify(lead));

  return Response.redirect("/thank-you", 303);
}
