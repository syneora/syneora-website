export async function onRequestPost({ request }) {
  try {
    const data = await request.json();

    const name = (data?.name || "").trim();
    const email = (data?.email || "").trim();
    const company = (data?.company || "").trim();
    const country = (data?.country || "").trim();
    const message = (data?.message || "").trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailBody =
      `New contact request from Syneora website\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || "-"}\n` +
      `Country: ${country || "-"}\n\n` +
      `Message:\n${message}\n`;

    // IMPORTANT: use a real Workspace inbox as From to avoid policy blocks
    const fromEmail = "connect@syneora.com";

    const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "connect@syneora.com" }],
            reply_to: { email }, // replies go to the user
          },
        ],
        from: { email: fromEmail, name: "Syneora Website" },
        subject: "New contact request – Syneora",
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });

    const mcText = await mcRes.text().catch(() => "");

    if (!mcRes.ok) {
      return new Response(JSON.stringify({ ok: false, error: mcText || "MailChannels failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
