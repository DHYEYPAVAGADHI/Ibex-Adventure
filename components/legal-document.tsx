import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import type { LegalDoc } from "@/lib/legal";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader eyebrow={doc.updated} title={doc.title} compact />
        <div className="container-shell max-w-3xl py-16 md:py-24">
          <p className="text-lg font-medium leading-relaxed text-[var(--color-ink)]">{doc.intro}</p>
          <div className="mt-12 space-y-12">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="display-hed mb-4 text-xl text-[var(--color-forest)]">{s.heading}</h2>
                <div className="space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-16 border-t border-[var(--color-hair)] pt-6 text-xs text-[var(--color-ink-muted)]">
            This page contains placeholder policy text. Replace it with content reviewed by a legal
            advisor before publishing.
          </p>
        </div>
      </main>
    </>
  );
}
