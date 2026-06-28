export async function POST(request: Request) {
  const body = await request.json();
  const email = body?.email?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Signal Studio <hello@signal-studio.app>",
      to: email,
      subject: "🎉 You're on the waitlist — here's your exclusive discount",
      html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#fff;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:#9B5CFF;border-radius:16px;padding:12px 20px;">
              <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-1px;">Signal Studio</span>
            </div>
          </div>
          <h1 style="font-size:28px;font-weight:800;color:#0A0A0B;margin-bottom:12px;line-height:1.2;">
            You're in. 🎉
          </h1>
          <p style="font-size:16px;color:#6B6B80;line-height:1.7;margin-bottom:28px;">
            Welcome to the Signal Studio early access waitlist. We launch <strong style="color:#0A0A0B;">July 1st at 9:00 AM CET</strong> — and you'll be among the first to get in.
          </p>
          <div style="background:#F0EBFF;border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
            <p style="font-size:12px;font-weight:700;color:#9B5CFF;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;">Your exclusive discount code</p>
            <div style="background:#fff;border:2px dashed #9B5CFF;border-radius:12px;padding:16px 32px;display:inline-block;">
              <span style="font-size:32px;font-weight:800;color:#9B5CFF;letter-spacing:4px;">EARLY10</span>
            </div>
            <p style="font-size:13px;color:#6B6B80;margin-top:12px;">10% off your first month · Valid once at registration</p>
          </div>
          <p style="font-size:15px;color:#6B6B80;line-height:1.7;margin-bottom:32px;">
            Enter this code when you register on July 1st and your first month will be <strong style="color:#0A0A0B;">10% off</strong> — automatically applied.
          </p>
          <div style="border-top:1px solid #DDD6F0;padding-top:24px;text-align:center;">
            <p style="font-size:13px;color:#6B6B80;">Questions? <a href="mailto:hello@signal-studio.app" style="color:#9B5CFF;font-weight:600;">hello@signal-studio.app</a></p>
            <p style="font-size:12px;color:#B0A8C0;margin-top:8px;">© 2026 Signal Studio · AI-Powered Banner Generation</p>
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Resend error:", err);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  return Response.json({ message: "You're on the list! Check your inbox." });
}
