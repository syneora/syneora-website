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
    console.log("Contact submission:", { name, email, company, country });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("Invalid JSON.", { status: 400 });
  }
}
