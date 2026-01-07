export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    // Honeypot (anti-bot)
    const website = (data?.website || "").trim();
    if (website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const name = (data?.name || "").trim();
    const email = (data?.email || "").trim();
    const company = (data?.company || "").trim();
    const country = (data?.country || "").trim();
    const message = (data?.message || "").trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!env?.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ ok: false, error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    /* ---------------------------
       1) INTERNAL EMAIL (to Syneora)
    ---------------------------- */
    const internalBody =
`New contact request from Syneora website

Name: ${name}
Email: ${email}
Company: ${company || "-"}
Country: ${country || "-"}

Message:
${message}
`;

    const internalRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Syneora <connect@syneora.com>",
        to: ["connect@syneora.com"],
        reply_to: email,
        subject: "[Syneora Website] New contact request",
        text: internalBody,
      }),
    });

    if (!internalRes.ok) {
      const t = await internalRes.text();
      return new Response(
        JSON.stringify({ ok: false, error: t }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    /* ---------------------------
       2) AUTO-REPLY TO USER
    ---------------------------- */
    const autoReplyBody =
`Hi ${name},

Thank you for reaching out to Syneora.

We’ve received your message and someone from our team will review it shortly.
If your query is urgent, feel free to reply directly to this email.

Best regards,
Syneora Team
https://syneora.com
`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Syneora <connect@syneora.com>",
        to: [email],
        subject: "We’ve received your message – Syneora",
        text: autoReplyBody,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
