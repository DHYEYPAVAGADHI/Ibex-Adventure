"use client";

import { motion, Variants } from "framer-motion";
import { globalEasing } from "@/components/animated-section";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-serif tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={itemVariants}
          className="mt-6 text-sm leading-7 text-white/70 sm:text-base md:text-lg font-light"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
