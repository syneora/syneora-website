function inferTopic(message = "") {
  const m = message.toLowerCase();
  if (/(security|vapt|pentest|vulnerability|iso 27001|soc|siem)/.test(m)) return "Security";
  if (/(hire|hiring|recruit|talent|staffing|interview)/.test(m)) return "Hiring / Talent";
  if (/(genai|llm|rag|chatbot|agent|prompt)/.test(m)) return "AI / GenAI";
  if (/(pipeline|etl|airflow|dbt|lakehouse|warehouse|snowflake|bigquery|databricks)/.test(m)) return "Data Engineering";
  if (/(partner|partnership|collab|alliance)/.test(m)) return "Partnerships";
  return "General";
}

function safeTag(topic) {
  const clean = String(topic || "General")
    .replace(/[\[\]\n\r]/g, "")
    .trim()
    .slice(0, 40);
  return `[Syneora:${clean || "General"}]`;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    // Honeypot (anti-bot)
    const website = (data?.website || "").trim();
    if (website) {
      // Pretend success to avoid tipping off bots
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

    let topic = (data?.topic || "General").trim();
    if (!topic) topic = "General";
    if (topic === "General") topic = inferTopic(message);

    const tag = safeTag(topic);

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!env?.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "RESEND_API_KEY not set in Cloudflare Pages env vars",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // -------------------------
    // 1) INTERNAL EMAIL
    // -------------------------
    const internalBody =
`New contact request from Syneora website

Topic: ${topic}
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
        subject: `${tag} New contact request`,
        text: internalBody,
      }),
    });

    if (!internalRes.ok) {
      const t = await internalRes.text().catch(() => "");
      return new Response(
        JSON.stringify({ ok: false, error: t || "Internal send failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // -------------------------
    // 2) AUTO-REPLY TO USER
    // -------------------------
    const autoReplyBody =
`Hi ${name},

Thank you for reaching out to Syneora.

We’ve received your message and someone from our team will review it shortly.
If you need to add context, reply to this email.

Best regards,
Syneora Team
https://syneora.com
`;

    // Auto-reply failure should NOT block success page.
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Syneora <connect@syneora.com>",
        to: [email],
        subject: `${tag} We’ve received your message`,
        text: autoReplyBody,
      }),
    }).catch(() => {});

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
