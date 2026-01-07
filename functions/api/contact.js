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
      `New contact request from Syneora\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || "-"}\n` +
      `Country: ${country || "-"}\n\n` +
      `Message:\n${message}\n`;

    // IMPORTANT:
    // Use a real Google Workspace inbox as the sender.
    // Reply-To will be the user's email.
    const payload = {
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
      content: [{ type: "text/plain", value: emailBody }],

      // This header is commonly required to authorize the sending domain
      // in Cloudflare/MailChannels setups.
      headers: {
        "X-MailChannels-Auth": "syneora.com",
      },
    };

    const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const mcText = await mcRes.text().catch(() => "");

    if (!mcRes.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: mcText || "Mail send failed" }),
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
