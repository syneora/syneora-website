export async function onRequestPost({ request }) {
  try {
    const data = await request.json();

    const name = (data?.name || "").trim();
    const email = (data?.email || "").trim();
    const company = (data?.company || "").trim();
    const country = (data?.country || "").trim();
    const message = (data?.message || "").trim();

    if (!name || !email || !message) {
      return new Response("Missing required fields.", { status: 400 });
    }

    // MVP: just succeed so your form flow works end-to-end.
    // Next step: send email / store in DB.
    const emailBody = `New contact request from Syneora website

      Name: ${name}
      Email: ${email}
      Company: ${company || "-"}
      Country: ${country || "-"}
      Message:
      ${message}
      `;

    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
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
          email: "no-reply@syneora.com",
          name: "Syneora Website",
        },
        subject: "New contact request – Syneora",
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
      }),
    });

    if (!res.ok) {
  const txt = await res.text().catch(() => "");
  return new Response(
    JSON.stringify({ ok: false, error: txt || "MailChannels failed" }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("Invalid JSON.", { status: 400 });
  }
}
