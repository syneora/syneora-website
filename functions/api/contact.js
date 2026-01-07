export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

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
        JSON.stringify({ ok: false, error: "RESEND_API_KEY not set in Cloudflare Pages env vars" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailBody =
`New contact request from Syneora

Name: ${name}
Email: ${email}
Company: ${company || "-"}
Country: ${country || "-"}

Message:
${message}
`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Syneora <connect@syneora.com>",
        to: ["connect@syneora.com"],
        reply_to: email,
        subject: "New contact request – Syneora",
        text: emailBody,
      }),
    });

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: text || `Resend failed (${res.status})` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

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
