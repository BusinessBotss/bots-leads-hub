import { json, redirect } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  if (!name || !email) {
    return json({ error: "Name and email are required" }, { status: 400 });
  }

  const lead = {
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  // Guarda en Cloudflare Workers KV
  await context.env.LEAD_KV.put(`lead:${Date.now()}`, JSON.stringify(lead));

  // Redirecciona a la página de agradecimiento
  return redir
