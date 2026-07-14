"use client";

import { motion, Variants } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  staggerDelay?: number;
};

export const globalEasing = [0.4, 0, 0.2, 1] as const;

export const slideUpVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: globalEasing },
  },
};

export function AnimatedSection({
  id,
  className,
  children,
  staggerDelay = 0.15,
}: AnimatedSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {children}
    </motion.section>
  );
}
