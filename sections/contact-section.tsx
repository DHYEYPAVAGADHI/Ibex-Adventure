"use client";

import { FormEvent, useMemo, useState } from "react";
import { useContact } from "@/components/providers/contact-provider";
import { buildContactInquiry } from "@/lib/contact";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

type ContactForm = {
  name: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = { name: "", phone: "", message: "" };

export function ContactSection() {
  const { phone, email, address } = useContact();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const whatsappHref = useMemo(
    () =>
      buildContactInquiry(phone, {
        name: form.name,
        userPhone: form.phone,
        message: form.message,
      }),
    [phone, form]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone number must be 10 digits";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((c) => ({ ...c, [field]: value }));
    if (errors[field]) setErrors((c) => { const n = { ...c }; delete n[field]; return n; });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      setForm(initialForm);
      setSubmitted(false);
    }, 500);
  };

  const inputBase =
    "w-full rounded-sm border bg-transparent px-4 py-3.5 text-sm font-light text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition-colors focus:border-[#172C21]";

  return (
    <section
      id="contact"
      className="section-spacing"
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <div className="container-shell grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left — editorial statement + contact info */}
        <div>
          <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
            Contact
          </p>
          <h2 className="font-serif text-5xl font-normal leading-[1.1] text-[#1C1C18] sm:text-6xl md:text-7xl">
            Let&apos;s plan
            <br />
            <em>your journey.</em>
          </h2>

          <div className="mt-12 h-px bg-[#C2C8C2]" />

          <div className="mt-8 space-y-6">
            {address && (
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C2C8C2]">
                  <MapPin className="h-3.5 w-3.5 text-[#172C21]" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#172C21]/50 mb-1">
                    Address
                  </p>
                  <p className="text-sm font-light text-[#424844] leading-6 max-w-xs">{address}</p>
                </div>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C2C8C2]">
                  <Phone className="h-3.5 w-3.5 text-[#172C21]" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#172C21]/50 mb-1">
                    Phone
                  </p>
                  <a href={`tel:${phone}`} className="text-sm font-medium text-[#1C1C18] hover:text-[#172C21] transition-colors">
                    {phone}
                  </a>
                </div>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C2C8C2]">
                  <Mail className="h-3.5 w-3.5 text-[#172C21]" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#172C21]/50 mb-1">
                    Email
                  </p>
                  <a href={`mailto:${email}`} className="text-sm font-medium text-[#1C1C18] hover:text-[#172C21] transition-colors">
                    {email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right — editorial form */}
        <form
          onSubmit={handleSubmit}
          className="border border-[#C2C8C2] p-8 md:p-10"
          style={{ borderRadius: "2px" }}
        >
          <h3 className="font-serif text-2xl text-[#1C1C18] mb-8">Send an enquiry</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">
                Your Name
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`${inputBase} ${
                  errors.name ? "border-red-400" : "border-[#C2C8C2]"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">
                Phone Number
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                className={`${inputBase} ${
                  errors.phone ? "border-red-400" : "border-[#C2C8C2]"
                }`}
                placeholder="10-digit mobile"
                maxLength={10}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">
                Message
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`${inputBase} min-h-[120px] resize-none ${
                  errors.message ? "border-red-400" : "border-[#C2C8C2]"
                }`}
                placeholder="Which program or destination interests you?"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="mt-8 w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#172C21] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#2D4236] hover:shadow-lg hover:shadow-[#172C21]/25 disabled:opacity-60 disabled:cursor-wait"
          >
            {submitted ? "Opening WhatsApp…" : "Enquire on WhatsApp"}
            {!submitted && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="mt-4 text-center text-xs text-[#424844]/50">
            We respond to all enquiries within 2 hours on WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}
