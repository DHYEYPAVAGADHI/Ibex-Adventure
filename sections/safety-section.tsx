"use client";

import { Shield, PlusSquare, Radio, Phone, TreePine, Mountain } from "lucide-react";

const SAFETY_FEATURES = [
  { icon: <Mountain className="w-8 h-8" />, label: "35 YEARS OF\nEXPERIENCE" },
  { icon: <Shield className="w-8 h-8" />, label: "RISK\nMANAGEMENT" },
  { icon: <PlusSquare className="w-8 h-8" />, label: "WFR\nCERTIFIED" },
  { icon: <Phone className="w-8 h-8" />, label: "SAT\nPHONES" },
  { icon: <Radio className="w-8 h-8" />, label: "VHF\nRADIOS" },
  { icon: <TreePine className="w-8 h-8" />, label: "LEAVE NO\nTRACE" },
];

export function SafetySection() {
  return (
    <section id="safety" className="py-16 bg-white border-b border-[#eee]">
      <div className="container-shell max-w-[1400px] mx-auto">
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          
          <div className="shrink-0">
            <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#222] md:text-3xl max-w-[300px]">
              YOUR SAFETY.
              <br />
              <span className="text-[#86A857]">OUR RESPONSIBILITY.</span>
            </h2>
          </div>

          <div className="flex-grow grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
            {SAFETY_FEATURES.map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f4f4] text-[#444] transition-colors group-hover:bg-[#5D7C3F] group-hover:text-white">
                  {feature.icon}
                </div>
                <span className="whitespace-pre-line text-[10px] font-bold uppercase tracking-widest text-[#222]">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
