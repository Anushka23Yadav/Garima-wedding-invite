"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloralDivider, MandalaIcon } from './Icons';

import weddingConfig from '../data/weddingConfig.json';

export default function BlessingSection() {
  const { couple, assets } = weddingConfig;

  return (
    <section className="relative py-20 px-6 text-center space-y-12 overflow-hidden">
      {/* Background Mandalas */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <MandalaIcon className="w-80 h-80 animate-spin-slow" />
      </div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-5">
        <MandalaIcon className="w-80 h-80 animate-spin-slow" />
      </div>

      {/* Floating Petals */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${10 + i * 15}%`,
            backgroundColor: ['#FF9933', '#C9A84C', '#F9E4D4', '#FFD700', '#FF6B6B', '#FFA07A'][i],
            opacity: 0.4,
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Ganesh Ji Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl animate-glow"
        >
          <Image
            src={assets.ganeshImage}
            alt="Shri Ganesh Ji"
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-heading text-lg text-saffron tracking-widest uppercase"
        >
          {couple.blessingHeadline}
        </motion.p>
        
        <div className="space-y-4">
          <p className="text-2xl font-heading text-gold italic gold-gradient">
            "{couple.shloka}"
          </p>
          <p className="text-sm tracking-widest text-forest/60 uppercase">
            {couple.shlokaTranslation}
          </p>
        </div>

        <FloralDivider className="my-6 md:my-8" />

        {/* Invitation Announcement from The Khanka Family */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="space-y-4 max-w-2xl mx-auto px-4"
        >
          <p className="font-heading text-base md:text-xl text-forest/75 italic leading-relaxed">
            {couple.invitationOpening || "With the divine blessings of our elders and the love of our family,"}
          </p>
          <div className="space-y-2 pt-1">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-gold tracking-wider uppercase">
              {couple.invitingFamily || "The Khanka Family"}
            </h2>
            <p className="font-heading text-xs md:text-sm text-forest/70 tracking-[0.25em] uppercase font-medium">
              {couple.invitationCall || "cordially invites you to grace the auspicious occasion of the wedding of"}
            </p>
          </div>
        </motion.div>

        {/* Bride & Groom Section */}
        <div className="space-y-8 max-w-3xl mx-auto w-full pt-4">
          {/* Garima Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-alex text-7xl md:text-9xl text-gold drop-shadow-sm">
              {couple.bride.name}
            </h1>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold/20 shadow-lg space-y-4 max-w-xl mx-auto">
              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  Beloved Daughter of
                </p>
                <p className="font-heading text-lg md:text-2xl font-bold text-forest">
                  {couple.bride.parents}
                </p>
              </div>

              <div className="h-[1px] w-20 bg-gold/25 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  Granddaughter of
                </p>
                <p className="font-heading text-base md:text-xl font-semibold text-forest/90">
                  {couple.bride.grandparents}
                </p>
              </div>

              <div className="h-[1px] w-20 bg-gold/25 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  Maternal Granddaughter of
                </p>
                <p className="font-heading text-base md:text-xl font-semibold text-forest/90">
                  {couple.bride.maternalGrandparents}
                </p>
              </div>

              <div className="h-[1px] w-20 bg-gold/25 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  Beloved Sister of
                </p>
                <p className="font-heading text-base md:text-xl font-semibold text-forest/90">
                  {couple.bride.sibling}
                </p>
              </div>
            </div>
          </motion.div>

          {/* With Connector */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 max-w-xs mx-auto py-2"
          >
            <div className="h-[1px] flex-1 bg-gold/30" />
            <span className="font-alex text-4xl md:text-5xl text-gold px-3">With</span>
            <div className="h-[1px] flex-1 bg-gold/30" />
          </motion.div>

          {/* Anurag Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="font-alex text-7xl md:text-9xl text-forest drop-shadow-sm">
              {couple.groom.name}
            </h2>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold/20 shadow-lg space-y-2 max-w-xl mx-auto">
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold font-bold">
                Son of
              </p>
              <p className="font-heading text-lg md:text-2xl font-bold text-forest">
                {couple.groom.parents}
              </p>
            </div>
          </motion.div>
        </div>

        <FloralDivider className="my-8" />
      </motion.div>
    </section>
  );
}
