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
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      company: (fd.get("company") || "").toString().trim(),
      country: (fd.get("country") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setLoading(false);
      setStatus({ type: "error", message: "Please fill Name, Email, and Message." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Request failed (${res.status})`);
      }

      sessionStorage.setItem("syneora_contact_submission", JSON.stringify(payload));
      window.location.href = "/success.html";
    } catch (err) {
      setLoading(false);
      setStatus({
        type: "error",
        message: err?.message || "Message failed to send. Please try again.",
      });
    }
  }

  // EXACT SAME INPUT STYLES YOU HAD IN App.jsx
  const inputClass =
  "w-full rounded-lg border border-slate-300 shadow-sm bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-white dark:text-slate-900";
  const labelClass =
  "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div className="lg:col-span-2">
      {/* Optional: wrap in a card so it visually matches the left block */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Send us a message
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          We’ll reply within 1–2 business days.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className={labelClass}>Name</label>
              <input name="name" required className={inputClass} placeholder="Your name" />
            </div>

            <div className="sm:col-span-1">
              <label className={labelClass}>Work Email</label>
              <input
                type="email"
                name="email"
                required
                className={inputClass}
                placeholder="name@company.com"
              />
            </div>

            <div className="sm:col-span-1">
              <label className={labelClass}>Company</label>
              <input name="company" className={inputClass} placeholder="Company name" />
            </div>

            <div className="sm:col-span-1">
              <label className={labelClass}>Country</label>
              <input name="country" className={inputClass} placeholder="Country" />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Message</label>
              <textarea
                name="message"
                required
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Tell us what you need…"
              />
            </div>
          </div>

          {status.message ? (
            <p
              className="mt-4 text-sm text-slate-700 dark:text-slate-200"
              role={status.type === "error" ? "alert" : "status"}
            >
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-3 font-medium text-white hover:bg-sky-400 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
