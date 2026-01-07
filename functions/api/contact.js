export async function onRequestPost({ request }) {
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

    const emailBody =
`New contact request from Syneora

Name: ${name}
Email: ${email}
Company: ${company || "-"}
Country: ${country || "-"}

Message:
${message}
`;

    const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "connect@syneora.com" }],
            reply_to: { email },
          },
        ],
        from: {
          email: "connect@syneora.com",
          name: "Syneora Website",
        },
        subject: "New contact request – Syneora",
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
        headers: {
          "X-MailChannels-Auth": "syneora.com",
        },
      }),
    });

    const text = await mcRes.text().catch(() => "");

    if (!mcRes.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: text || "MailChannels rejected request" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
