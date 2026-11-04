"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// SVG Corner Floral Bail (शाही फूल-पत्ती बेल)
const CornerBail = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bailGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCEAB8" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8C6314" />
      </linearGradient>

      <linearGradient id="bailSoftGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F6E2B0" stopOpacity="0.85" />
      </linearGradient>
    </defs>

    {/* Main Swirling Vine Stem */}
    <path
      d="M 0,0 C 22,3 50,8 72,26 C 92,42 96,72 78,94 C 60,114 28,110 25,80 C 22,58 45,42 64,50 C 78,56 82,72 70,82"
      stroke="url(#bailGold)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Center Corner Lotus / Flower Blossom */}
    <g transform="translate(68, 68) rotate(45)">
      <path
        d="M 0,-22 C 7,-11 8,-3 0,6 C -8,-3 -7,-11 0,-22 Z"
        fill="url(#bailSoftGold)"
        stroke="url(#bailGold)"
        strokeWidth="1.5"
      />
      <path
        d="M -6,-16 C -11,-8 -8,0 0,6 C -3,-5 -3,-11 -6,-16 Z"
        fill="url(#bailSoftGold)"
        stroke="url(#bailGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 6,-16 C 11,-8 8,0 0,6 C 3,-5 3,-11 6,-16 Z"
        fill="url(#bailSoftGold)"
        stroke="url(#bailGold)"
        strokeWidth="1.2"
      />
      <circle cx="0" cy="3" r="3" fill="url(#bailGold)" />
    </g>

    {/* Branching Bail Leaves & Tendrils (Top Edge) */}
    <path
      d="M 35,4 C 48,-6 70,2 62,14 C 48,16 38,11 35,4 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.3"
    />
    <path
      d="M 78,5 C 98,-3 115,11 100,22 C 86,20 79,13 78,5 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.3"
    />
    <path
      d="M 112,14 C 124,5 138,8 144,19 C 132,25 120,22 112,14 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.2"
    />
    <path
      d="M 96,19 C 112,25 120,39 114,48 C 108,55 98,50 104,39"
      stroke="url(#bailGold)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Branching Bail Leaves & Tendrils (Left Edge) */}
    <path
      d="M 4,35 C -6,48 2,70 14,62 C 16,48 11,38 4,35 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.3"
    />
    <path
      d="M 5,78 C -3,98 11,115 22,100 C 20,86 13,79 5,78 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.3"
    />
    <path
      d="M 14,112 C 5,124 8,138 19,144 C 25,132 22,120 14,112 Z"
      fill="url(#bailSoftGold)"
      stroke="url(#bailGold)"
      strokeWidth="1.2"
    />
    <path
      d="M 19,96 C 25,112 39,120 48,114 C 55,108 50,98 39,104"
      stroke="url(#bailGold)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Ornate Gold Pearls / Dots */}
    <circle cx="11" cy="11" r="3.5" fill="url(#bailGold)" />
    <circle cx="22" cy="22" r="2.5" fill="url(#bailGold)" />
    <circle cx="152" cy="8" r="2.5" fill="url(#bailGold)" />
    <circle cx="8" cy="152" r="2.5" fill="url(#bailGold)" />
  </svg>
);

// Center Diamond Medallion Motif
const CenterMotif = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="centerGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCEAB8" />
        <stop offset="50%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8C6314" />
      </linearGradient>
      <linearGradient id="centerSoft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F6E2B0" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <path
      d="M 25,18 C 35,8 50,0 50,0 C 50,0 65,8 75,18 C 65,28 50,36 50,36 C 50,36 35,28 25,18 Z"
      fill="url(#centerSoft)"
      stroke="url(#centerGold)"
      strokeWidth="1.3"
    />
    <circle cx="50" cy="18" r="3.5" fill="url(#centerGold)" />
    <circle cx="15" cy="18" r="2" fill="url(#centerGold)" />
    <circle cx="85" cy="18" r="2" fill="url(#centerGold)" />
    <line x1="0" y1="18" x2="12" y2="18" stroke="url(#centerGold)" strokeWidth="1" />
    <line x1="88" y1="18" x2="100" y2="18" stroke="url(#centerGold)" strokeWidth="1" />
  </svg>
);

export default function FloralBailBorder() {
  const { scrollY } = useScroll();
  // Only the top border and top corner bails fade out on scroll
  const topBorderOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const topBorderY = useTransform(scrollY, [0, 50], [0, -25]);

  return (
    <aside
      aria-hidden="true"
      className="fixed inset-2 sm:inset-3 md:inset-5 pointer-events-none z-30 select-none overflow-hidden"
    >
      {/* Left Royal Gold Borders (Full height, always visible throughout site) */}
      <div className="absolute left-0 top-0 bottom-0 border-l border-gold/45 pointer-events-none" />
      <div className="absolute left-1 sm:left-1.5 md:left-2 top-0 bottom-0 border-l border-dashed border-gold/30 pointer-events-none" />

      {/* Right Royal Gold Borders (Full height, always visible throughout site) */}
      <div className="absolute right-0 top-0 bottom-0 border-r border-gold/45 pointer-events-none" />
      <div className="absolute right-1 sm:right-1.5 md:right-2 top-0 bottom-0 border-r border-dashed border-gold/30 pointer-events-none" />

      {/* Top Border Assembly (Fades out and lifts away smoothly on scroll) */}
      <motion.div
        style={{ opacity: topBorderOpacity, y: topBorderY }}
        className="absolute inset-x-0 top-0 pointer-events-none"
      >
        {/* Outer Top Solid Border Line */}
        <div className="absolute inset-x-0 top-0 border-t border-gold/45" />

        {/* Inner Top Dashed Border Line */}
        <div className="absolute inset-x-1 sm:inset-x-1.5 md:inset-x-2 top-1 sm:top-1.5 md:top-2 border-t border-dashed border-gold/30" />

        {/* Top-Left Corner Bail */}
        <CornerBail className="absolute -top-[1px] -left-[1px] w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 drop-shadow-sm" />

        {/* Top-Right Corner Bail */}
        <CornerBail className="absolute -top-[1px] -right-[1px] w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 -scale-x-100 drop-shadow-sm" />

        {/* Top-Center Medallion */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2">
          <CenterMotif className="w-16 sm:w-20 md:w-24 h-auto drop-shadow-xs" />
        </div>
      </motion.div>
    </aside>
  );
}

// Reusable Horizontal Floral Bail Divider with Traditional Motifs
export const HorizontalFloralBail = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-2 max-w-lg mx-auto py-4 select-none ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold" />
    <svg viewBox="0 0 120 28" fill="none" className="w-24 h-6 text-gold flex-shrink-0">
      <path
        d="M 10,14 C 25,6 35,22 50,14 C 55,10 60,8 60,14 C 60,8 65,10 70,14 C 85,22 95,6 110,14"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M 60,6 C 64,10 64,14 60,18 C 56,14 56,10 60,6 Z" fill="#FCEAB8" stroke="#C9A84C" strokeWidth="1" />
      <path d="M 35,12 C 40,8 45,12 40,16 C 36,16 34,14 35,12 Z" fill="#FCEAB8" stroke="#C9A84C" strokeWidth="0.8" />
      <path d="M 85,12 C 80,8 75,12 80,16 C 84,16 86,14 85,12 Z" fill="#FCEAB8" stroke="#C9A84C" strokeWidth="0.8" />
      <circle cx="60" cy="14" r="2" fill="#8C6314" />
      <circle cx="10" cy="14" r="1.5" fill="#C9A84C" />
      <circle cx="110" cy="14" r="1.5" fill="#C9A84C" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold" />
  </div>
);
