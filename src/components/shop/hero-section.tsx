"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const slides = HERO_SLIDES;

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[85vh] lg:h-[90vh] overflow-hidden bg-secondary" id="hero-section">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background gradient instead of image for now */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-subtle via-secondary to-brand-muted" />
          <div className="absolute inset-0 gradient-editorial" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4 font-medium">
                {slides[current].subtitle.split(" ").slice(0, 3).join(" ")}
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-[0.95]">
                {slides[current].title}
              </h2>
              <p className="text-base lg:text-lg text-white/80 mb-8 max-w-md leading-relaxed">
                {slides[current].subtitle}
              </p>
              <Link
                href={slides[current].href}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground rounded-2xl text-sm font-semibold hover:bg-brand hover:text-white transition-all duration-300 group"
              >
                {slides[current].cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute bottom-8 right-4 sm:right-8 lg:right-16 flex items-center gap-3">
            <button onClick={prev}
              className="p-2.5 border border-white/30 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
                  aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={next}
              className="p-2.5 border border-white/30 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Próximo">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
