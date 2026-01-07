import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });
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
      setLoading(false);
      setStatus({
        type: "error",
        message: "Name, email, and message are required.",
      });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      // optional: store submission for success page
      sessionStorage.setItem(
        "syneora_contact_submission",
        JSON.stringify(payload)
      );

      window.location.href = "/success";
    } catch (err) {
      setLoading(false);
      setStatus({
        type: "error",
        message: String(err?.message || "Failed"),
      });
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500";

  const labelClass =
    "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            className={inputClass}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Work Email</label>
          <input
            type="email"
            name="email"
            className={inputClass}
            placeholder="name@company.com"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Company</label>
          <input
            name="company"
            className={inputClass}
            placeholder="Company name"
          />
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <input
            name="country"
            className={inputClass}
            placeholder="Country"
          />
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Tell us what you need…"
            required
          />
        </div>
      </div>

      {status.message && (
        <p
          className="mt-4 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-3 font-medium text-white hover:bg-sky-400 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
