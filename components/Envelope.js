"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './Icons';

export default function Envelope({ onOpen, onStartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSunburst, setShowSunburst] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasTriggeredRef = React.useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation?.();
    }
    if (hasTriggeredRef.current || isOpen) return;
    hasTriggeredRef.current = true;

    // Immediately trigger sound playback synchronously on user gesture
    if (onStartOpen) {
      onStartOpen();
    }

    setIsOpen(true);
    setShowSunburst(true);

    // Delay before transitioning to the full invitation
    setTimeout(() => {
      onOpen();
    }, 3000);
  };

  // Generate sun rays
  const sunRays = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    rotation: (360 / 16) * i,
    delay: i * 0.05,
  }));

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-beige overflow-hidden select-none">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2D5016 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Royal Background Motifs: Inward-facing Camel (left) and Elephant (right) */}
      {/* Left: Royal Rajasthani Camel (Facing Inwards to the Center via -scale-x-100) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={
          isOpen 
            ? { opacity: 0, scale: 0.8, x: -40 } 
            : { opacity: 0.85, x: 0, y: [0, -8, 0] }
        }
        transition={
          isOpen
            ? { duration: 1.2, ease: "easeInOut" }
            : {
                opacity: { duration: 1 },
                x: { duration: 1 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
        }
        className="absolute pointer-events-none select-none z-10 
                   bottom-3 left-3 w-20 h-20 
                   sm:bottom-5 sm:left-6 sm:w-28 sm:h-28 
                   md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6 lg:left-14 md:w-44 md:h-44 lg:w-56 lg:h-56"
      >
        <Image
          src="/assets/royal_camel_transparent.png"
          alt=""
          fill
          sizes="(max-width: 768px) 110px, 240px"
          className="object-contain -scale-x-100 drop-shadow-sm"
          priority
        />
      </motion.div>

      {/* Right: Royal Auspicious Elephant (Facing Inwards to the Center) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={
          isOpen 
            ? { opacity: 0, scale: 0.8, x: 40 } 
            : { opacity: 0.85, x: 0, y: [0, -8, 0] }
        }
        transition={
          isOpen
            ? { duration: 1.2, ease: "easeInOut" }
            : {
                opacity: { duration: 1 },
                x: { duration: 1 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }
        }
        className="absolute pointer-events-none select-none z-10 
                   bottom-3 right-3 w-22 h-20 
                   sm:bottom-5 sm:right-6 sm:w-30 sm:h-28 
                   md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-6 lg:right-14 md:w-48 md:h-44 lg:w-60 lg:h-56"
      >
        <Image
          src="/assets/royal_elephant_transparent.png"
          alt=""
          fill
          sizes="(max-width: 768px) 120px, 260px"
          className="object-contain drop-shadow-sm"
          priority
        />
      </motion.div>

      {/* Floating Sparkles in background (Only after mount to avoid hydration mismatch) */}
      {!isOpen && mounted && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-gold/40"
              style={{
                left: `${15 + (i * 11) % 70}%`,
                top: `${10 + (i * 13) % 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      <motion.div 
        className="relative w-[90vw] max-w-[500px] h-[350px] preserve-3d cursor-pointer active:scale-98 transition-transform"
        onClick={handleOpen}
        initial={{ y: 0, opacity: 1 }}
        animate={isOpen ? { y: 200, opacity: 0, scale: 0.8 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="text-center mb-8 absolute -top-24 w-full cursor-pointer z-40">
          <motion.p 
            className="font-script text-3xl md:text-4xl text-gold mb-2 drop-shadow-sm font-bold"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            Tap to Reveal
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gold text-2xl font-bold"
          >
            ↓
          </motion.div>
        </div>

        {/* Envelope Body */}
        <div className="absolute inset-0 bg-white shadow-2xl border-2 border-gold/20 rounded-lg">
          {/* Internal Content (Wedding Card Preview) */}
          <div className="absolute inset-4 bg-beige/50 border border-gold/10 rounded flex items-center justify-center">
             <div className="text-forest/30 font-script text-4xl">To New Beginnings</div>
          </div>
        </div>

        {/* Left Flap */}
        <div 
          className="absolute inset-0 bg-zinc-50 shadow-inner"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' }}
        />
        
        {/* Right Flap */}
        <div 
          className="absolute inset-0 bg-zinc-50 shadow-inner"
          style={{ clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)' }}
        />

        {/* Bottom Flap */}
        <div 
          className="absolute inset-0 bg-zinc-100 shadow-inner border-t border-zinc-200"
          style={{ clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)' }}
        />

        {/* Top Flap (Animated) */}
        <motion.div 
          className="absolute inset-0 bg-zinc-100 shadow-2xl origin-top z-20"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%)' }}
          animate={isOpen ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="animate-glow rounded-full"
              >
                <WaxSeal className="w-20 h-20 md:w-24 md:h-24 shadow-2xl" onClick={handleOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-8 absolute -bottom-16 w-full pointer-events-none">
          <p className="font-script text-2xl text-forest italic">To New Beginnings</p>
        </div>
      </motion.div>

      {/* ===== SUNBURST LIGHT ANIMATION ===== */}
      <AnimatePresence>
        {showSunburst && (
          <>
            {/* Golden radial burst */}
            <motion.div
              className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.2, 0.7, 1] }}
            >
              {/* Central sun glow */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  background: 'radial-gradient(circle, #FFF9E6 0%, #FFD700 20%, #FF9933 40%, #C9A84C 60%, transparent 80%)',
                  width: '200px',
                  height: '200px',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 8, 15],
                  opacity: [0, 1, 0.8, 0],
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />

              {/* Sun rays */}
              {sunRays.map((ray) => (
                <motion.div
                  key={ray.id}
                  className="absolute"
                  style={{
                    width: '4px',
                    height: '300px',
                    background: 'linear-gradient(to top, transparent, rgba(255, 215, 0, 0.8), transparent)',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${ray.rotation}deg)`,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: [0, 1, 3],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{ 
                    duration: 2.2, 
                    delay: ray.delay,
                    ease: "easeOut" 
                  }}
                />
              ))}

              {/* Floating golden particles */}
              {particles.map((p) => (
                <motion.div
                  key={`p-${p.id}`}
                  className="absolute rounded-full bg-gold"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -50 - Math.random() * 100],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay + 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Full screen warm golden wash */}
            <motion.div
              className="fixed inset-0 z-[61] pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 249, 230, 0.95) 0%, rgba(255, 215, 0, 0.6) 30%, rgba(255, 153, 51, 0.4) 60%, rgba(250, 243, 224, 0.9) 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.15, 0.6, 1], ease: "easeInOut" }}
            />

            {/* Om/Shubh overlay text */}
            <motion.div
              className="fixed inset-0 z-[62] pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.3, 0.7, 1] }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 1.2, 1] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <p className="font-script text-6xl md:text-8xl text-gold drop-shadow-2xl" style={{ textShadow: '0 0 40px rgba(201, 168, 76, 0.6)' }}>
                  शुभ विवाह
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
