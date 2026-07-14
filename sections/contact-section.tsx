"use client";

import { FormEvent, useMemo, useState } from "react";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { buildContactInquiry } from "@/lib/contact";
import { PrimaryButton } from "@/components/primary-button";

type ContactForm = {
  name: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  phone: "",
  message: "",
};

export function ContactSection() {
  const { phone, whatsapp, email } = useContact();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const whatsappHref = useMemo(() => buildContactInquiry(phone, { name: form.name, userPhone: form.phone, message: form.message }), [phone, form]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((current) => {
        const newErrors = { ...current };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
    // Open WhatsApp after a brief delay for UX feedback
    setTimeout(() => {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      // Reset form after submission
      setForm(initialForm);
      setSubmitted(false);
    }, 500);
  };

  return (
    <AnimatedSection id="contact" className="section-spacing">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading
          eyebrow="Contact"
          title="Ready to start your adventure?"
          description="Share your details and we'll connect with you on WhatsApp to discuss your perfect program."
        />

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Name</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className={`rounded-2xl border px-4 py-3 text-white outline-none transition ${
                  errors.name
                    ? "border-red-500/50 bg-red-500/10 focus:border-red-500/80"
                    : "border-white/10 bg-slate-950/60 focus:border-amber-300/50"
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Phone Number</span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "").slice(0, 10);
                  handleChange("phone", value);
                }}
                className={`rounded-2xl border px-4 py-3 text-white outline-none transition ${
                  errors.phone
                    ? "border-red-500/50 bg-red-500/10 focus:border-red-500/80"
                    : "border-white/10 bg-slate-950/60 focus:border-amber-300/50"
                }`}
                placeholder="10-digit mobile number"
                maxLength={10}
              />
              {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-white/80">Message</span>
              <textarea
                required
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                className={`min-h-36 rounded-2xl border px-4 py-3 text-white outline-none transition ${
                  errors.message
                    ? "border-red-500/50 bg-red-500/10 focus:border-red-500/80"
                    : "border-white/10 bg-slate-950/60 focus:border-amber-300/50"
                }`}
                placeholder="Tell us which program or destination interests you..."
              />
              {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
            </label>
          </div>

          <PrimaryButton
            type="submit"
            disabled={submitted}
            className={`mt-6 w-full ${
              submitted ? "cursor-wait opacity-80" : ""
            }`}
          >
            {submitted ? "Opening WhatsApp..." : "Enquire on WhatsApp"}
          </PrimaryButton>

          <p className="mt-4 text-center text-xs text-white/50">
            We&apos;ll respond to your enquiry within 2 hours on WhatsApp.
          </p>
        </form>
      </div>
    </AnimatedSection>
  );
}
