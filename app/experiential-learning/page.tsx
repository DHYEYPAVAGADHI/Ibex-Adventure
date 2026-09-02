import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Compass, BookOpen, Heart, Leaf, 
  ArrowRight, Book, ClipboardCheck,
  Users, MessageSquare, Lightbulb, Shield, Globe,
  Map, Mountain, MessageCircle, Sparkles
} from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";

export default function ExperientialLearningPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col justify-end pb-20 pt-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1528150239922-384c5991d74a?auto=format&fit=crop&w=2000&q=80"
              alt="Students learning in the mountains"
              fill
              className="object-cover"
              priority
            />
            {/* Gradients to match the image dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="container-shell relative z-10 mx-auto px-6 max-w-7xl">
            <div className="max-w-3xl mb-12">
              <div className="text-[var(--color-accent-green)] text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link> 
                <span className="text-white/50">&gt;</span> 
                <span>Experiential Learning</span>
              </div>
              
              <h1 className="font-sans text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase text-white tracking-tight leading-[1.05] mb-6 drop-shadow-lg">
                THE WORLD IS OUR <br/>
                <span className="text-[var(--color-accent-green)]">CLASSROOM.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl drop-shadow-md">
                We believe the best learning happens beyond the walls of a classroom. 
                At IBEX, every journey is designed to help you experience, learn and grow.
              </p>
            </div>

            {/* 4 Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 max-w-4xl border-t border-white/20 pt-8">
              {[
                { icon: Compass, title: "EXPERIENCE", sub: "Live it." },
                { icon: BookOpen, title: "LEARN", sub: "Understand it." },
                { icon: Heart, title: "REFLECT", sub: "Make it yours." },
                { icon: Leaf, title: "GROW", sub: "Carry it forward." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-[var(--color-accent-green)] flex items-center justify-center text-[var(--color-accent-green)] transition-transform group-hover:scale-110 shrink-0">
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">{item.title}</h4>
                    <p className="text-white/70 text-xs font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. THE IBEX LEARNING APPROACH */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="container-shell mx-auto px-6 max-w-7xl">
            <h2 className="text-center font-sans text-2xl font-black uppercase tracking-widest text-[#222] mb-20">
              THE IBEX LEARNING APPROACH
            </h2>
            
            <div className="flex flex-col md:flex-row items-start justify-between relative max-w-5xl mx-auto">
              
              {/* Arrows for Desktop */}
              <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px border-t border-dashed border-gray-300 -z-10">
                <ArrowRight className="absolute -right-3 -top-2.5 w-5 h-5 text-gray-300" />
                <ArrowRight className="absolute left-1/3 -top-2.5 w-5 h-5 text-gray-300" />
              </div>

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center flex-1 px-4 mb-12 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-[#f4f7f4] border border-[#86A857]/30 flex items-center justify-center text-[#5D7C3F] mb-6 shadow-sm">
                  <Book className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5D7C3F] mb-3">BEFORE THE JOURNEY</h3>
                <p className="text-[13px] text-gray-600 font-medium mb-6 leading-relaxed max-w-[240px]">
                  We prepare you with the right context, knowledge and goals.
                </p>
                <ul className="text-left text-[11px] text-gray-500 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Pre-trip briefing & orientation</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Set learning objectives</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Understand the place & people</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center flex-1 px-4 mb-12 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-[#f4f7f4] border border-[#86A857]/30 flex items-center justify-center text-[#5D7C3F] mb-6 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5D7C3F] mb-3">DURING THE JOURNEY</h3>
                <p className="text-[13px] text-gray-600 font-medium mb-6 leading-relaxed max-w-[240px]">
                  You experience, explore, challenge yourself and connect.
                </p>
                <ul className="text-left text-[11px] text-gray-500 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Hands-on experiences</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Interactions with locals</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Real-world challenges</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Observation & exploration</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center flex-1 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f4f7f4] border border-[#86A857]/30 flex items-center justify-center text-[#5D7C3F] mb-6 shadow-sm">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5D7C3F] mb-3">AFTER THE JOURNEY</h3>
                <p className="text-[13px] text-gray-600 font-medium mb-6 leading-relaxed max-w-[240px]">
                  We help you reflect, discuss and apply your learning.
                </p>
                <ul className="text-left text-[11px] text-gray-500 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Reflection sessions</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Group discussions</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Document & present</li>
                  <li className="flex items-start gap-2"><span className="text-[#86A857] mt-0.5">•</span> Apply learnings in real life</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS FOR LIFE */}
        <section className="py-20 bg-[#F9FAF8]">
          <div className="container-shell mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
              
              <div className="lg:w-1/3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5D7C3F] mb-4">LEARNING BEYOND BOOKS</h4>
                <h2 className="font-sans text-4xl md:text-5xl font-black text-[#222] leading-tight mb-6 tracking-tight">
                  Skills for Life.<br/>
                  Lessons for a Lifetime.
                </h2>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8 max-w-sm">
                  Our experiential journeys help develop essential life skills that stay with you forever.
                </p>
                <Link href="/journeys" className="inline-flex items-center justify-center gap-2 rounded bg-[#5D7C3F] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#4A6432]">
                  EXPLORE JOURNEYS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                {[
                  { icon: Users, title: "Leadership", desc: "Lead with confidence" },
                  { icon: Users, title: "Teamwork", desc: "Work better together" },
                  { icon: MessageSquare, title: "Communication", desc: "Express. Listen. Connect." },
                  { icon: Lightbulb, title: "Problem Solving", desc: "Think. Adapt. Overcome." },
                  { icon: Shield, title: "Resilience", desc: "Stay strong in challenges" },
                  { icon: Globe, title: "Environmental Awareness", desc: "Care for nature. Protect tomorrow." }
                ].map((skill, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-[#5D7C3F] mb-4">
                      <skill.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h5 className="font-bold text-[#222] text-sm mb-2">{skill.title}</h5>
                    <p className="text-xs text-gray-500 max-w-[140px] leading-relaxed">{skill.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 4. JOURNEYS THAT TEACH */}
        <section className="py-24 bg-white">
          <div className="container-shell mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5D7C3F] mb-3">LEARNING IN ACTION</h4>
                <h2 className="font-sans text-3xl md:text-4xl font-black text-[#222] tracking-tight">
                  Journeys That Teach
                </h2>
              </div>
              <Link href="/journeys" className="text-xs font-bold uppercase tracking-widest text-[#5D7C3F] hover:text-[#4A6432] flex items-center gap-2">
                VIEW ALL JOURNEYS <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { 
                  title: "LADAKH", 
                  image: "https://images.unsplash.com/photo-1548679847-38e9ed301593?auto=format&fit=crop&w=800&q=80",
                  tags: "Adventure • Culture • Resilience",
                  focus: "Resilience, Geography, High Altitude Ecology"
                },
                { 
                  title: "RISHIKESH", 
                  image: "https://images.unsplash.com/photo-1596484552834-8a58f96e2a22?auto=format&fit=crop&w=800&q=80",
                  tags: "Adventure • Nature • Spirituality",
                  focus: "Risk Management, River Ecology, Mindfulness"
                },
                { 
                  title: "KUTCH", 
                  image: "https://images.unsplash.com/photo-1623835695034-7162d04a60f9?auto=format&fit=crop&w=800&q=80",
                  tags: "Culture • Craft • Community",
                  focus: "Craft, Livelihood, Design Thinking, Community Engagement"
                },
                { 
                  title: "RAJASTHAN", 
                  image: "https://images.unsplash.com/photo-1599661559875-927dcaf9637c?auto=format&fit=crop&w=800&q=80",
                  tags: "Heritage • Culture • History",
                  focus: "History, Architecture, Cultural Heritage"
                },
                { 
                  title: "SPITI VALLEY", 
                  image: "https://images.unsplash.com/photo-1626714485860-264024227c44?auto=format&fit=crop&w=800&q=80",
                  tags: "Adventure • Remote • Community",
                  focus: "Sustainability, Local Life, Resourcefulness"
                }
              ].map((card, i) => (
                <div key={i} className="flex flex-col group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#172C21] text-white px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow">
                        {card.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      {card.tags}
                    </div>
                    <div className="mb-4 flex-grow">
                      <div className="text-[10px] text-gray-400 mb-1 font-medium">Learning Focus</div>
                      <div className="text-xs font-semibold text-[#222] leading-snug">
                        {card.focus}
                      </div>
                    </div>
                    <Link href="/journeys" className="text-[10px] font-bold uppercase tracking-widest text-[#5D7C3F] flex items-center gap-1 mt-auto hover:text-[#4A6432]">
                      VIEW JOURNEY <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHAT MAKES IBEX DIFFERENT? */}
        <section className="py-24 bg-[#111A15] relative overflow-hidden">
          {/* Subtle background overlay to match the dark nature feel */}
          <div className="absolute inset-0 opacity-20">
            <Image src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=2000&q=80" alt="Dark mountains" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111A15] to-[#111A15]/80" />

          <div className="container-shell relative z-10 mx-auto px-6 max-w-7xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#86A857] mb-4">WHAT MAKES IBEX DIFFERENT?</h4>
            
            <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
              
              <div className="lg:w-7/12">
                <h2 className="font-sans text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-16">
                  We Don't Just Take You Places.<br/>
                  We Help You Understand Them.
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  {[
                    { icon: Map, label: "Purposeful Itineraries" },
                    { icon: Users, label: "Local Interactions" },
                    { icon: Mountain, label: "Real-world Challenges" },
                    { icon: MessageCircle, label: "Reflection & Debrief" },
                    { icon: Sparkles, label: "Lasting Impact" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full border border-[#86A857]/30 flex items-center justify-center text-[#86A857] mb-3">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-4/12 border-l border-white/10 pl-8 lg:pl-16 flex items-center">
                <blockquote className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
                  "Education is not the learning of facts, but the training of the mind to think."
                  <footer className="mt-4 text-[#86A857] font-sans text-sm font-bold not-italic">
                    — Albert Einstein
                  </footer>
                </blockquote>
              </div>

            </div>
          </div>
        </section>

        {/* 6. STUDENT VOICES */}
        <section className="py-24 bg-white">
          <div className="container-shell mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5D7C3F] mb-3">STUDENT VOICES</h4>
                <h2 className="font-sans text-3xl md:text-4xl font-black text-[#222] tracking-tight">
                  Real Learnings. Real Impact.
                </h2>
              </div>
              <Link href="/stories" className="text-xs font-bold uppercase tracking-widest text-[#5D7C3F] hover:text-[#4A6432] flex items-center gap-2">
                VIEW ALL STORIES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  quote: "IBEX trips changed the way I see the world. I learned more in 7 days than in a semester.",
                  name: "Ananya Sharma",
                  role: "Student, Delhi",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                },
                { 
                  quote: "Interacting with villagers in Kutch taught me empathy and respect in a way no book could.",
                  name: "Kush Patel",
                  role: "Student, Vadodara",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                },
                { 
                  quote: "The Himalayan trek pushed me beyond my limits and taught me what I'm really capable of.",
                  name: "Rohan Verma",
                  role: "Student, Pune",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                },
                { 
                  quote: "From rafting to reflection sessions, every moment had a lesson that stayed with me.",
                  name: "Arjun Nair",
                  role: "Student, Kochi",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
                }
              ].map((testimonial, i) => (
                <div key={i} className="border border-gray-100 bg-[#FAFAFA] rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow">
                  <div className="text-[#86A857] text-4xl font-serif mb-4 leading-none">"</div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed flex-grow mb-8">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-[#222]">{testimonial.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
              alt="Mountain landscape"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#172C21]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="container-shell relative z-10 mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#86A857] mb-4">LEARN. GROW. INSPIRE.</h4>
              <h2 className="font-sans text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                YOUR NEXT LESSON <br/>
                AWAITS BEYOND THE ROAD.
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded bg-[#5D7C3F] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#4A6432]">
                PLAN AN EXPERIENTIAL JOURNEY <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded border border-white/30 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10">
                <MessageCircle className="w-4 h-4" /> TALK TO OUR EXPERTS
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
