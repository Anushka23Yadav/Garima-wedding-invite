"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Traditional Wedding Background Animals Pair
 * Left: Adorned Royal Rajasthani Camel (facing inwards towards center via -scale-x-100)
 * Right: Caparisoned Royal Auspicious Elephant (facing inwards towards center)
 * 
 * Strict responsive rules:
 * - Positioned at left-5 / right-5 on mobile (20px from edge) so they are strictly INSIDE the 8px border
 * - Positive left/right coordinates on desktop (never negative) so overflow-hidden NEVER cuts them off
 * - Compact on mobile (w-12 to w-14) so they stay in side margins and NEVER go behind center text or cards
 * - Expansive on desktop (w-48 to w-56) for rich palace aesthetics
 */
export const BackgroundAnimalsPair = ({
  camelTop = "top-[48%]",
  elephantTop = "top-[48%]",
  opacity = "opacity-[0.14] sm:opacity-[0.18]",
  camelPosition = "left-5 sm:left-6 md:left-10 lg:left-16",
  elephantPosition = "right-5 sm:right-6 md:right-10 lg:right-16",
  camelSize = "w-12 h-12 sm:w-16 sm:h-16 md:w-48 md:h-48 lg:w-56 lg:h-56",
  elephantSize = "w-14 h-12 sm:w-18 sm:h-16 md:w-52 md:h-48 lg:w-60 lg:h-56",
  className = ""
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Left: Royal Rajasthani Camel (Facing Inwards to the Right via -scale-x-100) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${camelPosition} ${camelTop} ${camelSize} ${opacity}`}
      >
        <Image
          src="/assets/royal_camel_transparent.png"
          alt=""
          fill
          sizes="(max-width: 768px) 60px, 260px"
          className="object-contain -scale-x-100"
        />
      </motion.div>

      {/* Right: Royal Auspicious Elephant (Facing Inwards to the Left) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className={`absolute ${elephantPosition} ${elephantTop} ${elephantSize} ${opacity}`}
      >
        <Image
          src="/assets/royal_elephant_transparent.png"
          alt=""
          fill
          sizes="(max-width: 768px) 70px, 280px"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

/**
 * Wedding Day Schedule Animals
 * Desktop (md:): Left Camel at top-[20%], Right Elephant shifted slightly below at top-[50%] in open margins
 * Mobile (< md): Positioned flanking the schedule header (above the timeline events, never behind text)
 */
export const ScheduleAnimals = () => {
  return (
    <>
      {/* Desktop View: Wide margins flanking schedule timeline (POSITIVE left/right, NEVER cut off by overflow-hidden) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute left-4 md:left-8 lg:left-14 top-[18%] w-40 h-40 lg:w-48 lg:h-48 opacity-[0.16] pointer-events-none select-none"
      >
        <Image
          src="/assets/royal_camel_transparent.png"
          alt=""
          fill
          sizes="220px"
          className="object-contain -scale-x-100"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute right-4 md:right-8 lg:right-14 top-[50%] w-44 h-40 lg:w-52 lg:h-48 opacity-[0.16] pointer-events-none select-none"
      >
        <Image
          src="/assets/royal_elephant_transparent.png"
          alt=""
          fill
          sizes="240px"
          className="object-contain"
        />
      </motion.div>

      {/* Mobile View: Flanking the Schedule Title & Date Banner (above timeline, NEVER overlapping timeline text) */}
      <div className="md:hidden flex items-center justify-between px-5 -mb-2 pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-12 h-12 opacity-[0.20]"
        >
          <Image
            src="/assets/royal_camel_transparent.png"
            alt=""
            fill
            sizes="50px"
            className="object-contain -scale-x-100"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="relative w-14 h-12 opacity-[0.20]"
        >
          <Image
            src="/assets/royal_elephant_transparent.png"
            alt=""
            fill
            sizes="60px"
            className="object-contain"
          />
        </motion.div>
      </div>
    </>
  );
};
