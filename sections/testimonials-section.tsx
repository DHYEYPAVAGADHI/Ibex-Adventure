import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/static-data";

export function TestimonialsSection() {
  return (
    <AnimatedSection id="testimonials" className="section-spacing">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Stories from students and educators."
          description="Real experiences from real people who have transformed through Ibex Adventure programs."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              text={testimonial.text}
              image={testimonial.image}
              stars={testimonial.stars}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
