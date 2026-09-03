import { studentGains } from "@/lib/static-data";

export function StudentGainsSection() {
  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "#F4EFE3" }}
    >
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-forest-band)]">
            What Students Gain
          </p>
          <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl max-w-2xl">
            Growth measured in
            <em> experiences.</em>
          </h2>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

        {/* Editorial numbered list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {studentGains.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group border-t border-[var(--color-hair)] pt-6 hover:border-[var(--color-forest-band)] transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-forest-band)]/8 text-[var(--color-forest-band)] group-hover:bg-[var(--color-forest-band)] group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-forest-band)]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1C18] leading-tight">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
