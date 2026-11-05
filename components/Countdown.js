"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import weddingConfig from '../data/weddingConfig.json';

export default function Countdown() {
  const targetDate = new Date(weddingConfig.dates.targetIsoDate);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimerCard = ({ label, value, index }) => {
    const formatted = value.toString().padStart(2, '0');

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="flex flex-col items-center gap-2 md:gap-3"
      >
        <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28">
          {/* Glow behind */}
          <div className="absolute inset-0 bg-gold/20 rounded-xl blur-md" />
          
          <div className="relative w-full h-full bg-gradient-to-br from-forest via-forest to-[#1a3a0a] border-2 border-gold/40 rounded-xl flex items-center justify-center shadow-xl overflow-hidden">
            {/* Top shine */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/5 rounded-t-xl" />
            
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white relative z-10 tabular-nums tracking-wider select-none">
              {formatted}
            </span>
          </div>
        </div>
        <span className="text-[#8C651A] font-script text-xl sm:text-2xl font-bold">{label}</span>
      </motion.div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 py-8 md:py-12">
      <TimerCard label="Days" value={timeLeft.days} index={0} />
      <div className="flex items-center text-[#8C651A] font-script text-2xl sm:text-3xl pb-7 sm:pb-8 font-bold select-none">:</div>
      <TimerCard label="Hours" value={timeLeft.hours} index={1} />
      <div className="flex items-center text-[#8C651A] font-script text-2xl sm:text-3xl pb-7 sm:pb-8 font-bold select-none">:</div>
      <TimerCard label="Minutes" value={timeLeft.minutes} index={2} />
      <div className="flex items-center text-[#8C651A] font-script text-2xl sm:text-3xl pb-7 sm:pb-8 font-bold select-none">:</div>
      <TimerCard label="Seconds" value={timeLeft.seconds} index={3} />
    </div>
  );
}
