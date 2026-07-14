import {
  Binoculars,
  Compass,
  Flame,
  HeartHandshake,
  Leaf,
  Mountain,
  PawPrint,
  ShieldCheck,
  Tent,
  Users,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/#programs" },
  { label: "Destinations", href: "/#destinations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

export const featureExperience = {
  eyebrow: "Featured Journey",
  title: "Explore a deeper program experience before you enquire.",
  description:
    "A premium snapshot of how an Ibex itinerary feels: visually rich, clearly structured, and built to turn curiosity into action.",
  overview:
    "Multi-day outdoor journeys blending trekking, immersive stays, and guided learning moments.",
  activities: ["Guided treks", "Camp-based bonding", "Nature interpretation", "Leadership challenges"],
  bestTime: "March to June, and September to November",
  heroImage:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80",
  ],
} as const;

export const studentGains = [
  { title: "Leadership & Decision-Making", icon: Compass },
  { title: "Teamwork & Collaboration", icon: Users },
  { title: "Confidence & Independence", icon: Mountain },
  { title: "Discipline & Responsibility", icon: ShieldCheck },
  { title: "Cultural Awareness", icon: HeartHandshake },
  { title: "Environmental Sensitivity", icon: Leaf },
  { title: "Problem-Solving & Adaptability", icon: Tent },
] as const;

export const safetyHighlights = [
  "Trained trip leaders",
  "Certified guides",
  "First aid support",
  "Emergency protocols",
  "Safe accommodations",
] as const;

export const programDetails = [
  { label: "Duration", value: "1-15 days" },
  { label: "Accommodation", value: "Tents, camps, hotels" },
  { label: "Food", value: "Hygienic vegetarian meals" },
  { label: "Transport", value: "Included" },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Asha Patel",
    role: "Student, Delhi Public School",
    text: "The trekking expedition changed how I see challenges. I learned that limits are often self-imposed. Every student should experience this once.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "trekking-expeditions",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Teacher, Heritage Academy",
    text: "The cultural immersion program gave our students a deeper understanding of Indian heritage. The guides were knowledgeable and engaging throughout.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "heritage-tours",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Parent, Mumbai",
    text: "My son came back more confident and responsible. The rural immersion program opened his eyes to different ways of living. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "rural-immersion",
  },
  {
    id: 4,
    name: "Arjun Singh",
    role: "School Coordinator, Bangalore",
    text: "Best team-building activity we've done! Students returned with renewed confidence and better team dynamics. Professional and safe throughout.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "leadership-team-building",
  },
  {
    id: 5,
    name: "Neha Desai",
    role: "Parent, Ahmedabad",
    text: "The survival skills training was exactly what our son needed. He's more independent and aware now. The instructors were incredibly supportive.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "survival-skills",
  },
  {
    id: 6,
    name: "Vikram Reddy",
    role: "Principal, Hyderabad School",
    text: "Outstanding programs! Our students bonded like never before. The camping experience was safe, fun, and educationally valuable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    stars: 5,
    program: "camping-experiences",
  },
] as const;
