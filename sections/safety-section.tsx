import { HeartPulse, Shield, Siren, TentTree, UserRoundCheck } from "lucide-react";

const safetyItems = [
  { label: "Trained trip leaders", icon: UserRoundCheck, description: "Every expedition led by qualified outdoor professionals." },
  { label: "Certified guides", icon: Shield, description: "Locally certified guides with deep regional knowledge." },
  { label: "First aid support", icon: HeartPulse, description: "Medical kit and trained first-responders on every trip." },
  { label: "Emergency protocols", icon: Siren, description: "Clear emergency response plans for every destination." },
  { label: "Safe accommodations", icon: TentTree, description: "Vetted, safe, and comfortable stays throughout." },
] as const;

export function SafetySection() {
  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16 grid md:grid-cols-2 md:items-end gap-8">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
              Safety & Trust
            </p>
            <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-7xl">
              Adventure,
              <br />
              <em>Responsibly.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base font-light leading-7 text-[#424844] md:pb-2">
            Every Ibex Adventure program is designed with safety as the first principle — 
            so you can focus entirely on the experience.
          </p>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

        {/* Safety items — horizontal editorial list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {safetyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="border-t-2 border-[#172C21]/20 pt-6 hover:border-[#D4AF37] transition-colors duration-300 group"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#172C21]/8 text-[#172C21] group-hover:bg-[#172C21] group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-[#1C1C18]">{item.label}</p>
                <p className="mt-2 text-xs font-light leading-5 text-[#424844]/70">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
