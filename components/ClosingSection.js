"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LotusIcon, FloralDivider, MandalaIcon } from './Icons';
import NamasteLogo from './NamasteLogo';
import { Heart, Sparkles } from 'lucide-react';
import weddingConfig from '../data/weddingConfig.json';

export default function ClosingSection() {
  const { couple, dates } = weddingConfig;

  return (
    <section className="py-24 md:py-32 px-6 bg-beige border-t-4 border-gold/10 overflow-hidden relative">
      {/* Decorative Rotating Mandala Background */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-[0.03] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[600px] md:w-[800px] h-[600px] md:h-[800px] border-[2px] border-forest rounded-full flex items-center justify-center">
            <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] border-[1px] border-forest rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <MandalaIcon className="w-[400px] h-[400px]" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <LotusIcon className="w-16 h-16 md:w-20 md:h-20 text-gold animate-pulse-soft" />

          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-forest leading-tight max-w-2xl">
            "{couple.closingQuote}"
          </h2>

          <FloralDivider className="w-full max-w-md" />

          <p className="font-heading text-xl md:text-2xl text-forest/70 max-w-xl italic">
            {couple.closingMessage}
          </p>

          {/* Decorative Diyas */}
          <div className="flex items-center gap-8 pt-4">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              🪔
            </motion.div>
            <Sparkles size={20} className="text-gold" />
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="text-2xl"
            >
              🪔
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="space-y-4 pt-8 md:pt-12"
        >
          {/* Couple Floral Crest */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto -mb-2 drop-shadow-md">
            <Image
              src="/assets/anurima-logo.png"
              alt="Anurima Crest"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gold/30" />
            <Heart size={14} className="text-gold" fill="currentColor" />
            <div className="w-16 h-[1px] bg-gold/30" />
          </div>
          <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold font-bold">With Love & Blessings</p>
          <h3 className="font-alex text-5xl md:text-6xl text-forest">
            {couple.bride.name} and {couple.groom.name}
          </h3>

          {/* Animated Folding Hand Logo (Namaskar / Pranam Mudra) */}
          <NamasteLogo />
          {/* <p className="font-heading text-lg text-forest/50 italic">{dates.weddingDateText}</p> */}
        </motion.div>

        <div className="pt-16 md:pt-20 opacity-30 font-heading text-xs tracking-widest text-forest">
          <p>Handcrafted with ❤️ for {couple.bride.name} & {couple.groom.name} • 2026</p>
        </div>
      </div>
    </section>
  );
}
