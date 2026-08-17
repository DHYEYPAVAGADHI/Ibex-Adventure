import { testimonials } from "@/lib/static-data";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-spacing"
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
            Testimonials
          </p>
          <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-7xl max-w-2xl">
            Stories worth
            <br />
            <em>telling.</em>
          </h2>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

        {/* Editorial pull-quote grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col border-t border-[#C2C8C2] pt-8">
              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-[#D4AF37]">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="font-serif text-xl font-normal italic leading-8 text-[#1C1C18]">
                  &ldquo;{t.text}&rdquo;
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1C1C18]">{t.name}</p>
                  <p className="text-xs text-[#424844]/70">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
