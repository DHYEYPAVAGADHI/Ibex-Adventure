export function AboutSection() {
  return (
    <section
      id="about"
      className="section-spacing"
      style={{ backgroundColor: "#172C21" }}
    >
      <div className="container-shell">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — large editorial statement */}
          <div>
            <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              The Ibex Philosophy
            </p>
            <h2 className="font-serif text-5xl font-normal leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              Beyond the Map.
              <br />
              <em className="text-[#D4AF37]">Into the Self.</em>
            </h2>
            <div className="mt-8 h-px w-24 bg-[#D4AF37]/40" />
          </div>

          {/* Right — editorial copy */}
          <div className="space-y-6">
            <p className="text-lg font-light leading-8 text-white/80 border-l-2 border-[#D4AF37]/40 pl-6">
              At Ibex Adventure, we design immersive outdoor programs that go beyond recreation. 
              We integrate adventure with education, enabling students to connect classroom 
              knowledge with real-world experiences.
            </p>
            <p className="text-base font-light leading-7 text-white/60">
              Every itinerary is built to balance inspiration, safety, and experiential learning — 
              so participants leave with more than memories. They leave transformed.
            </p>

            {/* Three pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {["Inspire", "Explore", "Transform"].map((item, i) => (
                <div key={item} className="border-t border-white/15 pt-4">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]/60 mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-serif text-lg text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
