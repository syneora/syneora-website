import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const payload = {
      name: fd.get("name")?.trim(),
      email: fd.get("email")?.trim(),
      company: fd.get("company")?.trim(),
      country: fd.get("country")?.trim(),
      message: fd.get("message")?.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      sessionStorage.setItem(
        "syneora_contact_submission",
        JSON.stringify(payload)
      );

      window.location.href = "/success.html";
    } catch {
      setError("Message failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input name="name" required className="input" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Work Email</label>
          <input type="email" name="email" required className="input" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Company</label>
          <input name="company" className="input" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Country</label>
          <input name="country" className="input" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea name="message" rows={6} required className="input" />
        </div>
      </div>

      {error && <p className="mt-4 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-sky-500 px-6 py-3 text-white disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
