import { programDetails } from "@/lib/static-data";

export function ProgramDetailsSection() {
  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <div className="container-shell">
        <div className="mb-12">
          <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-forest-band)]">
            Program Details
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[#1C1C18] sm:text-5xl">
            Quick logistics for
            <em> fast planning.</em>
          </h2>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-12" />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {programDetails.map((detail, i) => (
            <div
              key={detail.label}
              className="border-t-2 border-[var(--color-forest-band)]/15 pt-6"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-forest-band)]/40 mb-3">
                {String(i + 1).padStart(2, "0")} — {detail.label}
              </p>
              <p className="font-serif text-2xl text-[#1C1C18]">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
