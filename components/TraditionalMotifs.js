"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Royal Elephant (गजराज - Auspicious Elephant with trunk raised in blessing)
export const RoyalElephant = ({ className = "", mirror = false }) => (
  <svg
    viewBox="0 0 280 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${mirror ? '-scale-x-100' : ''}`}
  >
    <defs>
      <linearGradient id="elephantGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCEAB8" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8C6314" />
      </linearGradient>

      <linearGradient id="elephantSoft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F6E2B0" stopOpacity="0.85" />
      </linearGradient>
    </defs>

    {/* Body & Head Silhouette */}
    <path
      d="M 50,110 C 42,90 52,65 72,55 C 92,45 130,50 155,62 C 172,52 195,50 215,62 C 228,70 234,84 228,98 C 238,90 252,78 260,60 C 264,50 272,45 280,48 C 286,52 284,65 275,82 C 264,102 245,125 235,138 C 230,145 226,155 228,168 L 216,168 C 218,152 216,140 206,132 C 198,125 190,130 182,140 L 186,188 C 186,192 182,195 174,195 C 166,195 162,192 162,188 L 165,152 C 155,156 142,156 132,152 L 134,188 C 134,192 130,195 122,195 C 114,195 110,192 110,188 L 112,142 C 98,145 82,144 72,138 L 75,188 C 75,192 70,195 62,195 C 54,195 50,192 50,188 L 52,148 C 44,142 38,128 42,115 Z"
      fill="url(#elephantSoft)"
      stroke="url(#elephantGold)"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Tusk with gold tip */}
    <path
      d="M 220,122 C 238,122 254,114 262,100 C 255,106 240,112 220,112 Z"
      fill="#FFFDF8"
      stroke="url(#elephantGold)"
      strokeWidth="1.4"
    />

    {/* Lotus in raised trunk */}
    <g transform="translate(280, 48) rotate(25)">
      <path d="M 0,-12 C 4,-6 4,-2 0,4 C -4,-2 -4,-6 0,-12 Z" fill="url(#elephantGold)" />
      <path d="M -3,-8 C -6,-4 -5,0 0,4 C -2,-2 -2,-6 -3,-8 Z" fill="url(#elephantGold)" opacity="0.7" />
      <path d="M 3,-8 C 6,-4 5,0 0,4 C 2,-2 2,-6 3,-8 Z" fill="url(#elephantGold)" opacity="0.7" />
    </g>

    {/* Royal Ear */}
    <path
      d="M 190,75 C 174,68 152,78 155,106 C 158,124 175,130 184,116 Z"
      fill="url(#elephantSoft)"
      stroke="url(#elephantGold)"
      strokeWidth="1.5"
    />
    <circle cx="204" cy="85" r="2.2" fill="#8C6314" />

    {/* Royal Saddle Blanket (झूल) */}
    <path
      d="M 95,68 C 118,64 152,64 165,72 L 160,120 C 145,124 110,124 96,120 Z"
      fill="url(#elephantGold)"
      fillOpacity="0.25"
      stroke="url(#elephantGold)"
      strokeWidth="1.5"
    />
    <rect x="100" y="72" width="56" height="42" rx="3" fill="none" stroke="url(#elephantGold)" strokeWidth="1.4" />
    <circle cx="128" cy="93" r="10" fill="none" stroke="url(#elephantGold)" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 128,85 C 124,91 124,95 128,101 C 132,95 132,91 128,85 Z" fill="url(#elephantGold)" />

    {/* Fringe bells */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <line x1={102 + i * 8} y1="120" x2={102 + i * 8} y2="126" stroke="url(#elephantGold)" strokeWidth="1" />
        <circle cx={102 + i * 8} cy="127" r="1.8" fill="url(#elephantGold)" />
      </g>
    ))}

    {/* Head Ornament / Tikka */}
    <path d="M 212,65 C 218,58 225,62 222,70 C 218,72 214,70 212,65 Z" fill="url(#elephantGold)" />
    <circle cx="218" cy="64" r="2" fill="#8C6314" />

    {/* Royal Umbrella (Chhatri) */}
    <g transform="translate(128, 48)">
      <line x1="0" y1="0" x2="0" y2="18" stroke="url(#elephantGold)" strokeWidth="1.6" />
      <path d="M -22,0 C -15,-12 0,-16 0,-16 C 0,-16 15,-12 22,0 Z" fill="url(#elephantSoft)" stroke="url(#elephantGold)" strokeWidth="1.4" />
      <circle cx="0" cy="-17" r="2" fill="url(#elephantGold)" />
    </g>

    {/* Tail with bell */}
    <path d="M 52,110 C 44,124 46,145 42,158" stroke="url(#elephantGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="42" cy="160" r="2.5" fill="url(#elephantGold)" />

    {/* Gold Anklets */}
    <line x1="50" y1="182" x2="72" y2="182" stroke="url(#elephantGold)" strokeWidth="2.2" />
    <line x1="110" y1="182" x2="132" y2="182" stroke="url(#elephantGold)" strokeWidth="2.2" />
    <line x1="162" y1="182" x2="184" y2="182" stroke="url(#elephantGold)" strokeWidth="2.2" />
  </svg>
);

// Royal Camel (शाही ऊँट - Rajasthani wedding camel)
export const RoyalCamel = ({ className = "", mirror = false }) => (
  <svg
    viewBox="0 0 250 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${mirror ? '-scale-x-100' : ''}`}
  >
    <defs>
      <linearGradient id="camelGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCEAB8" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8C6314" />
      </linearGradient>

      <linearGradient id="camelSoft" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F6E2B0" stopOpacity="0.85" />
      </linearGradient>
    </defs>

    {/* Camel Silhouette */}
    <path
      d="M 45,130 C 38,112 48,95 65,92 C 76,90 88,96 96,85 C 105,72 118,60 132,60 C 145,60 154,75 160,88 C 170,82 178,74 186,56 C 195,38 206,26 218,30 C 226,32 230,42 228,50 C 224,60 212,70 204,82 C 196,96 195,115 198,132 L 190,192 C 190,196 185,198 178,198 C 172,198 168,196 168,192 L 172,150 C 162,154 150,154 142,150 L 145,192 C 145,196 140,198 132,198 C 126,198 122,196 122,192 L 126,140 C 115,142 102,142 92,136 L 95,192 C 95,196 90,198 82,198 C 76,198 72,196 72,192 L 75,145 C 62,142 48,145 45,130 Z"
      fill="url(#camelSoft)"
      stroke="url(#camelGold)"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Eye & Ear */}
    <circle cx="218" cy="38" r="2" fill="#8C6314" />
    <path d="M 210,28 C 208,20 214,18 217,25 Z" fill="url(#camelGold)" />

    {/* Bridle & Neck Gorbandh Beads */}
    <path
      d="M 222,44 C 215,54 205,60 198,75 C 192,90 190,110 188,128"
      stroke="url(#camelGold)"
      strokeWidth="1.3"
      strokeDasharray="2 3"
      fill="none"
    />
    <circle cx="204" cy="74" r="2.5" fill="url(#camelGold)" />
    <circle cx="196" cy="96" r="3" fill="url(#camelGold)" />
    <circle cx="192" cy="118" r="2.5" fill="url(#camelGold)" />

    {/* Saddle & Pommels */}
    <path
      d="M 112,72 C 122,62 138,62 146,72 L 142,112 C 130,116 118,116 110,112 Z"
      fill="url(#camelGold)"
      fillOpacity="0.25"
      stroke="url(#camelGold)"
      strokeWidth="1.4"
    />
    <rect x="112" y="76" width="32" height="32" rx="2" fill="none" stroke="url(#camelGold)" strokeWidth="1.3" />
    <path d="M 112,76 C 110,66 118,64 120,76" stroke="url(#camelGold)" strokeWidth="1.6" fill="none" />
    <path d="M 144,76 C 146,66 138,64 136,76" stroke="url(#camelGold)" strokeWidth="1.6" fill="none" />

    {/* Saddle fringe */}
    <circle cx="114" cy="114" r="1.8" fill="url(#camelGold)" />
    <circle cx="122" cy="116" r="1.8" fill="url(#camelGold)" />
    <circle cx="130" cy="116" r="1.8" fill="url(#camelGold)" />
    <circle cx="138" cy="114" r="1.8" fill="url(#camelGold)" />

    {/* Tail */}
    <path d="M 46,128 C 38,140 40,155 36,165" stroke="url(#camelGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="36" cy="168" r="2.2" fill="url(#camelGold)" />

    {/* Anklets */}
    <line x1="72" y1="186" x2="92" y2="186" stroke="url(#camelGold)" strokeWidth="2" />
    <line x1="122" y1="186" x2="142" y2="186" stroke="url(#camelGold)" strokeWidth="2" />
    <line x1="168" y1="186" x2="188" y2="186" stroke="url(#camelGold)" strokeWidth="2" />
  </svg>
);

// Auspicious Gajaraj Blessing Pair (Two Elephants facing a sacred Diya/Kalash)
export const GajarajBlessingPair = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-2 sm:gap-4 select-none ${className}`}>
    {/* Left Elephant facing right */}
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20"
    >
      <RoyalElephant className="w-full h-full drop-shadow-sm" />
    </motion.div>

    {/* Sacred Center Diya / Kalash */}
    <div className="flex flex-col items-center">
      <div className="text-xl sm:text-2xl animate-pulse-soft">🪔</div>
      <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-1" />
    </div>

    {/* Right Elephant facing left */}
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20"
    >
      <RoyalElephant className="w-full h-full drop-shadow-sm" mirror />
    </motion.div>
  </div>
);

// Royal Wedding Procession Banner (शाही बारात - Elephants & Camels in festive procession)
export const RoyalProcessionBanner = ({ className = "" }) => (
  <div className={`py-6 select-none overflow-hidden ${className}`}>
    <div className="max-w-4xl mx-auto px-4 flex items-center justify-between gap-2 sm:gap-6 opacity-75">
      {/* Camel 1 */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-14 sm:w-24 sm:h-20 md:w-28 md:h-24 shrink-0"
      >
        <RoyalCamel className="w-full h-full" />
      </motion.div>

      {/* Decorative Floral Vine Divider */}
      <div className="flex items-center flex-1 gap-1 sm:gap-2 px-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold/60" />
        <span className="font-heading text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold font-bold whitespace-nowrap">
          शाही बारात
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold/60" />
      </div>

      {/* Elephant Leading Procession */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-20 h-16 sm:w-28 sm:h-22 md:w-32 md:h-26 shrink-0"
      >
        <RoyalElephant className="w-full h-full" />
      </motion.div>
    </div>
  </div>
);
