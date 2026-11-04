"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

import weddingConfig from '../data/weddingConfig.json';

import Envelope from '../components/Envelope';
import BlessingSection from '../components/BlessingSection';
import ScratchCard from '../components/ScratchCard';
import Countdown from '../components/Countdown';
import Ceremonies from '../components/Ceremonies';
import OurStory from '../components/OurStory';
import VenueSection from '../components/VenueSection';
import ClosingSection from '../components/ClosingSection';
import FloralBailBorder from '../components/FloralBailBorder';
import { FloralDivider } from '../components/Icons';

// Floating Petals Component
const FloatingPetals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (i * 8.3) % 100,
    size: 10 + (i % 5) * 2,
    duration: 8 + (i % 4) * 2,
    delay: (i * 0.7) % 5,
    color: ['#FF9933', '#C9A84C', '#F9E4D4', '#FFD700', '#FF6B6B', '#FFA07A', '#E8C15D', '#FFB6C1', '#FF69B4', '#DDA0DD', '#FFE4B5', '#FFDAB9'][i],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            backgroundColor: petal.color,
            opacity: 0.35,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Howl for background music with strict single-instance management
    const sound = new Howl({
      src: [weddingConfig.assets.audioSong],
      loop: true,
      volume: 0.5,
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    audioRef.current = sound;

    return () => {
      sound.stop();
      sound.unload();
      audioRef.current = null;
    };
  }, []);

  const handleStartOpen = () => {
    if (audioRef.current) {
      try {
        // Prevent overlapping dual playback if already playing
        if (audioRef.current.playing()) {
          setIsPlaying(true);
          return;
        }
        audioRef.current.stop();
        audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio autoplay blocked by mobile browser:", err);
      }
    }
  };

  const handleOpen = () => {
    setIsOpened(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.playing()) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Music play error:", err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-beige selection:bg-gold/30 selection:text-forest">
      <AnimatePresence>
        {!isOpened && (
          <Envelope key="envelope" onOpen={handleOpen} onStartOpen={handleStartOpen} />
        )}
      </AnimatePresence>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative pt-4 md:pt-6"
        >
          {/* Royal Floral Bail Border Frame */}
          <FloralBailBorder />

          {/* Floating Petals throughout */}
          <FloatingPetals />

          {/* Floating Music Control */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            onClick={toggleMusic}
            className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border-2 ${isPlaying ? 'border-gold' : 'border-gold/20'} text-gold hover:scale-110 transition-transform active:scale-90 ${isPlaying ? 'sound-btn-playing' : ''}`}
            aria-label={isPlaying ? 'Mute music' : 'Unmute music'}
          >
            {isPlaying ? (
              <Volume2 size={22} className="animate-pulse-soft" />
            ) : (
              <VolumeX size={22} />
            )}
          </motion.button>

          {/* Wedding Card Content */}
          <article className="max-w-[100vw] overflow-x-hidden">
            <BlessingSection />

            {/* Scratch to Reveal Section */}
            <section className="py-16 md:py-20 bg-forest/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="font-script text-4xl md:text-5xl text-gold">Save the Date</h2>
                  <p className="font-heading text-lg md:text-xl opacity-60 italic">Scratch to unveil our special day</p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 md:gap-8">
                  <ScratchCard revealContent={weddingConfig.dates.scratchDay} />
                  <ScratchCard revealContent={weddingConfig.dates.scratchMonth} isMonth />
                  <ScratchCard revealContent={weddingConfig.dates.scratchYear} />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="font-script text-2xl md:text-3xl text-forest pt-8"
                >
                  We can't wait to see you!
                </motion.p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </section>

            <section className="py-16 md:py-20 px-4 md:px-6 text-center space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="font-script text-4xl md:text-5xl text-gold">Time for Togetherness</h2>
                <p className="font-heading text-lg md:text-xl text-forest/75 italic font-medium">Counting down to 26th November 2026, 12:00 PM</p>
              </motion.div>
              <Countdown />
            </section>

            {/* Our Story Photo Carousel */}
            {/* <OurStory /> */}

            <Ceremonies />

            <VenueSection />

            <ClosingSection />
          </article>
        </motion.div>
      )}
    </main>
  );
}
