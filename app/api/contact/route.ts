export async function POST(request: Request) {
  const body = await request.json();
  const name = body?.name?.trim() || "Anonymous";
  const email = body?.email?.trim();
  const company = body?.company?.trim() || "";
  const message = body?.message?.trim();

  if (!email || !message) {
    return Response.json({ error: "Email and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  // Sanitize inputs
  const safeName = name.slice(0, 100);
  const safeEmail = email.slice(0, 255);
  const safeCompany = company.slice(0, 100);
  const safeMessage = message.slice(0, 2000);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return Response.json({ error: "Contact service is not configured." }, { status: 500 });
  }

  const text = [
    `📬 <b>New contact form message</b>`,
    ``,
    `<b>Name:</b> ${safeName}`,
    `<b>Email:</b> ${safeEmail}`,
    safeCompany ? `<b>Company:</b> ${safeCompany}` : null,
    `<b>Message:</b>`,
    safeMessage,
  ].filter(Boolean).join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }

  return Response.json({ message: "Message sent! We'll get back to you soon." });
}
