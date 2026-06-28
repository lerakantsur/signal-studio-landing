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
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        
        <!-- HEADER with gradient -->
        <tr><td style="border-radius:20px 20px 0 0;background:linear-gradient(135deg,#9B5CFF 0%,#C084FC 50%,#60A5FA 100%);padding:40px 40px 36px;text-align:center;">
          <div style="font-size:32px;margin-bottom:8px;">⚡</div>
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Signal Studio</div>
        </td></tr>

        <!-- BODY dark -->
        <tr><td style="background:#1a1a1a;border-radius:0 0 20px 20px;padding:40px;">
          
          <h1 style="font-size:26px;font-weight:800;color:#ffffff;margin:0 0 12px;line-height:1.2;">
            You're in! 🎉
          </h1>
          <p style="font-size:15px;color:#a0a0a0;line-height:1.7;margin:0 0 32px;">
            Welcome to the Signal Studio early access waitlist. We launch <strong style="color:#fff;">July 1st at 9:00 AM CET</strong> — and you'll be among the first to get in.
          </p>

          <!-- Discount code box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#2a1a4a;border:1px solid #9B5CFF40;border-radius:16px;padding:28px;text-align:center;">
              <div style="font-size:11px;font-weight:700;color:#9B5CFF;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;">Your exclusive discount code</div>
              <div style="background:#0f0f0f;border:2px dashed #9B5CFF;border-radius:12px;padding:16px 32px;display:inline-block;margin-bottom:14px;">
                <span style="font-size:36px;font-weight:800;color:#9B5CFF;letter-spacing:6px;">EARLY10</span>
              </div>
              <div style="font-size:13px;color:#a0a0a0;">10% off your first month · Valid once at registration</div>
            </td></tr>
          </table>

          <p style="font-size:14px;color:#a0a0a0;line-height:1.7;margin:0 0 32px;">
            Enter this code when you register on July 1st and your first month will be <strong style="color:#fff;">10% off</strong> — automatically applied at checkout.
          </p>

          <!-- Footer -->
          <div style="border-top:1px solid #2a2a2a;padding-top:24px;text-align:center;">
            <p style="font-size:13px;color:#666;margin:0 0 6px;">Questions? <a href="mailto:hello@signal-studio.app" style="color:#9B5CFF;text-decoration:none;font-weight:600;">hello@signal-studio.app</a></p>
            <p style="font-size:12px;color:#444;margin:0;">© 2026 Signal Studio · AI-Powered Banner Generation</p>
          </div>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
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
