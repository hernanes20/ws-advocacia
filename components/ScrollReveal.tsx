"use client"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
