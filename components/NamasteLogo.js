"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LotusIcon, MandalaIcon } from './Icons';

export default function NamasteLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-2 select-none">
      {/* Sacred Rotating Mandala Halo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="opacity-15"
        >
          <MandalaIcon className="w-56 h-56 sm:w-64 sm:h-64 text-gold" />
        </motion.div>
      </div>

      {/* Radiating Divine Aura Shockwave / Glow on fold */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: [0, 0.7, 0.35], scale: [0.6, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-radial from-gold/30 via-gold/10 to-transparent pointer-events-none blur-xl"
      />

      {/* The Folding Hands Container */}
      <div className="relative w-48 h-52 sm:w-56 sm:h-60 flex items-center justify-center">
        {/* Left Hand: Slides in smoothly from left and folds */}
        <motion.div
          initial={{ x: -26, rotate: -5, opacity: 0 }}
          whileInView={{ x: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/assets/namaste-left.png"
            alt="Namaste Left Hand"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Right Hand: Slides in smoothly from right and folds */}
        <motion.div
          initial={{ x: 26, rotate: 5, opacity: 0 }}
          whileInView={{ x: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/assets/namaste-right.png"
            alt="Namaste Right Hand"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Unified Resting Hands with gentle breathing pulse once joined */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 1.0 }}
          className="absolute inset-0 z-20"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1], y: [0, -2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="/assets/namaste-logo.png"
              alt="Folded Hands Namaskar"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Auspicious Sparkle at fingertips */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="absolute -top-1 z-30 flex flex-col items-center pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold text-sm"
          >
            ✨
          </motion.div>
        </motion.div>
      </div>

      {/* Lotus Pedestal & Traditional Blessing at Base */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="-mt-3 flex flex-col items-center gap-1.5 z-20"
      >
        <LotusIcon className="w-8 h-8 text-gold/70" />
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-heading text-xs tracking-[0.35em] uppercase text-gold font-bold">
            सादर प्रणाम
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </motion.div>
    </div>
  );
}

