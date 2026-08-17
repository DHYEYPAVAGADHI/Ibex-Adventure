"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { PrimaryButton } from "@/components/primary-button";

import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";

interface ContactClientProps {
  addressQuery: string;
}

export function ContactClient({ addressQuery }: ContactClientProps) {
  const { phone, email, address } = useContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      alert("Thank you!\n\nYour enquiry has been submitted successfully.");
    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Contact Form Error:", error);
      }
      alert(error.message || "Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
      setSubmitted(false);
    }
  };



  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FCF9F2" }}>
      <Navbar />

      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b" style={{ borderColor: "#C2C8C2", backgroundColor: "#172C21" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center max-w-3xl">
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Contact</p>
          <h1 className="text-4xl md:text-6xl font-serif font-normal text-white mb-6">Let's plan your journey.</h1>
          <p className="text-lg text-white/65 font-light leading-relaxed">
            We&apos;re here to help you plan your next great adventure. Get in touch with us for inquiries, program details, or custom expedition requests.
          </p>
        </div>
      </section>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start py-16 lg:py-24">
          
          {/* Contact Information */}
          <div className="grid gap-6">
            <div>
              <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">Get in Touch</p>
              <h2 className="font-serif text-4xl leading-tight text-[#1C1C18]">Official contact information.</h2>
              <p className="mt-4 text-sm font-light leading-7 text-[#424844]">Reach out to our team directly through the channels below.</p>
            </div>
            
            <a 
              href={addressQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 md:p-8 border border-[#C2C8C2] hover:border-[#172C21] transition-colors" style={{ borderRadius: "2px" }}
              aria-label="View office location on Google Maps"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#172C21]/8 border border-[#172C21]/15 group-hover:bg-[#172C21] group-hover:border-[#172C21] transition-colors">
                  <MapPin className="h-4 w-4 text-[#172C21] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1C1C18] mb-2">Office Address</h3>
                  <p className="text-sm text-[#424844] font-light leading-relaxed whitespace-pre-wrap">
                    {address}
                  </p>
                </div>
              </div>
            </a>

            <a 
              href={buildTelLink(phone)}
              className="group block p-6 md:p-8 border border-[#C2C8C2] hover:border-[#172C21] transition-colors" style={{ borderRadius: "2px" }}
              aria-label="Call Ibex Adventure"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#172C21]/8 border border-[#172C21]/15 group-hover:bg-[#172C21] group-hover:border-[#172C21] transition-colors">
                  <Phone className="h-4 w-4 text-[#172C21] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1C1C18] mb-1">Phone Number</h3>
                  <p className="text-lg text-[#172C21] font-light tracking-wide">{phone}</p>
                </div>
              </div>
            </a>

            <a 
              href={`mailto:${email}`}
              className="group block p-6 md:p-8 border border-[#C2C8C2] hover:border-[#172C21] transition-colors" style={{ borderRadius: "2px" }}
              aria-label="Email Ibex Adventure"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#172C21]/8 border border-[#172C21]/15 group-hover:bg-[#172C21] group-hover:border-[#172C21] transition-colors">
                  <Mail className="h-4 w-4 text-[#172C21] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1C1C18] mb-1">Email Address</h3>
                  <p className="text-lg text-[#172C21] font-light">{email}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="border border-[#C2C8C2] p-6 sm:p-10 h-full" style={{ borderRadius: "2px" }}>
            <h3 className="font-serif text-2xl font-medium text-[#1C1C18] mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="grid gap-5">
              <label className="grid gap-2 w-full min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">Name</span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full min-w-0 border border-[#C2C8C2] bg-transparent px-4 py-3 text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition focus:border-[#172C21]"
                  placeholder="Your full name"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                <label className="grid gap-2 w-full min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full min-w-0 border border-[#C2C8C2] bg-transparent px-4 py-3 text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition focus:border-[#172C21]"
                    placeholder="your@email.com"
                  />
                </label>

                <label className="grid gap-2 w-full min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">Phone Number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full min-w-0 border border-[#C2C8C2] bg-transparent px-4 py-3 text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition focus:border-[#172C21]"
                    placeholder="Mobile number"
                  />
                </label>
              </div>

              <label className="grid gap-2 w-full min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">Subject</span>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full min-w-0 border border-[#C2C8C2] bg-transparent px-4 py-3 text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition focus:border-[#172C21]"
                  placeholder="How can we help?"
                />
              </label>

              <label className="grid gap-2 w-full min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#172C21] mb-2">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full min-w-0 border border-[#C2C8C2] bg-transparent px-4 py-3 text-[#1C1C18] placeholder:text-[#424844]/40 outline-none transition focus:border-[#172C21] resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </label>

              <PrimaryButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full justify-center py-4 text-base"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
              </PrimaryButton>
            </form>
          </div>

        </div>
      </AnimatedSection>
    </main>
  );
}
