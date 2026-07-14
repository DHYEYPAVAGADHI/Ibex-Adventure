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
    <main className="min-h-screen bg-slate-950 text-white selection:bg-amber-300/30 selection:text-amber-300">
      <Navbar />

      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6">Contact Us</h1>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            We&apos;re here to help you plan your next great adventure. Get in touch with us for inquiries, program details, or custom expedition requests.
          </p>
        </div>
      </section>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Information Cards */}
          <div className="grid gap-6">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Official Contact Information"
              description="Reach out to our team directly through the channels below."
            />
            
            <a 
              href={addressQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="View office location on Google Maps"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  <MapPin className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Office Address</h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed whitespace-pre-wrap">
                    {address}
                  </p>
                </div>
              </div>
            </a>

            <a 
              href={buildTelLink(phone)}
              className="group block p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Call Ibex Adventure"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Phone Number</h3>
                  <p className="text-lg text-white/90 font-light tracking-wide">{phone}</p>
                </div>
              </div>
            </a>

            <a 
              href={`mailto:${email}`}
              className="group block p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Email Ibex Adventure"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email Address</h3>
                  <p className="text-lg text-white/90 font-light">{email}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur-sm h-full">
            <h3 className="font-serif text-2xl font-medium text-white mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="grid gap-5">
              <label className="grid gap-2 w-full min-w-0">
                <span className="text-sm font-medium text-white/80">Name</span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                  placeholder="Your full name"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                <label className="grid gap-2 w-full min-w-0">
                  <span className="text-sm font-medium text-white/80">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                    placeholder="your@email.com"
                  />
                </label>

                <label className="grid gap-2 w-full min-w-0">
                  <span className="text-sm font-medium text-white/80">Phone Number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                    placeholder="Mobile number"
                  />
                </label>
              </div>

              <label className="grid gap-2 w-full min-w-0">
                <span className="text-sm font-medium text-white/80">Subject</span>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                  placeholder="How can we help?"
                />
              </label>

              <label className="grid gap-2 w-full min-w-0">
                <span className="text-sm font-medium text-white/80">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </label>

              <PrimaryButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full justify-center group py-3.5 text-base rounded-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <div className="h-2 w-2 rounded-full bg-slate-900 group-hover:scale-150 transition-transform duration-300" />
                </span>
              </PrimaryButton>
            </form>
          </div>

        </div>
      </AnimatedSection>
    </main>
  );
}
