"use client";

import { motion, Variants } from "framer-motion";
import { globalEasing } from "@/components/animated-section";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Override eyebrow color — defaults to forest green */
  eyebrowColor?: string;
  /** Override title color — defaults to #1C1C18 */
  titleColor?: string;
  /** Override description color — defaults to #424844 */
  descriptionColor?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowColor,
  titleColor,
  descriptionColor,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: globalEasing },
    },
  };

  return (
    <motion.div
      className={alignment}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {eyebrow ? (
        <motion.p
          variants={itemVariants}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: eyebrowColor ?? "var(--color-forest-band)" }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        variants={itemVariants}
        className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        style={{ color: titleColor ?? "#1C1C18" }}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base leading-7 font-light sm:text-lg"
          style={{ color: descriptionColor ?? "#424844" }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
