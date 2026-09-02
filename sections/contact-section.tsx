"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapPin, Phone, Mail, ArrowRight, Check } from "lucide-react";
import { useContact } from "@/components/providers/contact-provider";
import { buildContactInquiry } from "@/lib/contact";

type Form = { name: string; email: string; phone: string; message: string };
const EMPTY: Form = { name: "", email: "", phone: "", message: "" };

export function ContactSection() {
  const { phone, email, address, whatsapp } = useContact();
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const waHref = useMemo(
    () =>
      buildContactInquiry(whatsapp || phone, {
        name: form.name,
        userPhone: form.phone,
        message: form.message,
      }),
    [whatsapp, phone, form]
  );

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10 || form.message.trim().length < 5) {
      setStatus("error");
      setErrorMsg("Please add your name, a 10-digit phone number and a short message.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Website enquiry" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const field =
    "w-full rounded-sm border bg-white px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-muted)]/50 focus:border-[var(--color-moss)]";

  return (
    <section id="contact" className="section-spacing bg-[var(--color-sand)]">
      <div className="container-wide grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            Contact
          </p>
          <h2 className="display-hed text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-ink)]">
            Let&rsquo;s plan
            <br />
            your journey.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            Tell us who&rsquo;s travelling and what you&rsquo;re looking for. Our team replies within a
            few working hours.
          </p>

          <div className="mt-10 space-y-5">
            {address && (
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-hair)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--color-moss)]" />
                </span>
                <p className="max-w-xs text-sm leading-6 text-[var(--color-ink-muted)]">{address}</p>
              </div>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-4 text-sm text-[var(--color-ink)] hover:text-[var(--color-moss)]">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-hair)]">
                  <Phone className="h-3.5 w-3.5 text-[var(--color-moss)]" />
                </span>
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-sm text-[var(--color-ink)] hover:text-[var(--color-moss)]">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-hair)]">
                  <Mail className="h-3.5 w-3.5 text-[var(--color-moss)]" />
                </span>
                {email}
              </a>
            )}
          </div>
        </div>

        {status === "done" ? (
          <div className="flex flex-col items-start rounded-sm border border-[var(--color-hair)] bg-white p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-light-green)] text-[var(--color-moss)]">
              <Check className="h-6 w-6" />
            </span>
            <h3 className="display-hed mt-5 text-2xl text-[var(--color-ink)]">Enquiry received</h3>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Thank you — we&rsquo;ve got your details and will be in touch shortly. For anything urgent,
              message us on WhatsApp.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[var(--color-moss-dark)]"
            >
              Continue on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-sm border border-[var(--color-hair)] bg-white p-8 md:p-10">
            <h3 className="display-hed text-xl text-[var(--color-ink)]">Send an enquiry</h3>
            <div className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  className={`${field} border-[var(--color-hair)]`}
                  placeholder="Your name *"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
                <input
                  className={`${field} border-[var(--color-hair)]`}
                  type="tel"
                  placeholder="Phone (10-digit) *"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
              <input
                className={`${field} border-[var(--color-hair)]`}
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <textarea
                className={`${field} min-h-[120px] resize-none border-[var(--color-hair)]`}
                placeholder="Which journey, dates, group size…? *"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                required
              />
            </div>

            {status === "error" && (
              <p className="mt-3 text-xs text-red-500">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-moss-dark)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Submit Enquiry"}
              {status !== "sending" && <ArrowRight className="h-4 w-4" />}
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded border border-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-moss)] transition-colors hover:bg-[var(--color-light-green)]"
            >
              Or message us on WhatsApp
            </a>
          </form>
        )}
      </div>
    </section>
  );
}
