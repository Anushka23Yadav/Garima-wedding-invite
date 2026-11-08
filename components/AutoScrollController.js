"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AutoScrollController
 * - Starts automatically 4 seconds after clicking "Tap to Reveal" (envelope opening).
 * - Also restarts automatically 4 seconds after clicking/revealing "Scratch Me" (the wedding date).
 * - Smooth buttery continuous glide downward.
 * - Instant Smart-Pause: Pauses immediately on touch, swipe, wheel, keydown.
 * - Auto-Resume on Idle: Resumes automatically after 10 seconds if user has stopped interacting.
 * - Floating control pill at bottom-left allowing 1-click toggle anytime.
 * - Automatically stops when the bottom of the invitation is reached.
 */
export default function AutoScrollController({ isOpened, allDatesRevealed }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const animFrameRef = useRef(null);
  
  const idleResumeTimerRef = useRef(null);
  const scratchStartTimerRef = useRef(null);
  const envelopeStartTimerRef = useRef(null);
  
  const isScratchTriggeredRef = useRef(false);
  const isEnvelopeStartingRef = useRef(false);
  const hasEnvelopeStartedRef = useRef(false);
  const hasScratchStartedRef = useRef(false);

  isPlayingRef.current = isPlaying;

  const stopScroll = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const startScroll = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 20) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    isPlayingRef.current = true;
    setIsPlaying(true);
  }, []);

  const toggleScroll = useCallback(() => {
    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = null;
    }
    if (scratchStartTimerRef.current) {
      clearTimeout(scratchStartTimerRef.current);
      scratchStartTimerRef.current = null;
    }
    if (envelopeStartTimerRef.current) {
      clearTimeout(envelopeStartTimerRef.current);
      envelopeStartTimerRef.current = null;
    }
    isScratchTriggeredRef.current = false;
    isEnvelopeStartingRef.current = false;

    if (isPlayingRef.current) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [startScroll, stopScroll]);

  // Main scroll loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const speed = 0.5; // ~87px per second at 60Hz (responsive, smooth glide)
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const pixelsToMove = (speed * delta) / 16.667;
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScroll >= maxScroll - 6) {
        stopScroll();
        if (idleResumeTimerRef.current) {
          clearTimeout(idleResumeTimerRef.current);
          idleResumeTimerRef.current = null;
        }
        return;
      }

      window.scrollBy(0, pixelsToMove);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isPlaying, stopScroll]);

  // 1. Auto-start 4 seconds after envelope opens ("Tap to Reveal")
  useEffect(() => {
    if (isOpened && !hasEnvelopeStartedRef.current) {
      isEnvelopeStartingRef.current = true;
      envelopeStartTimerRef.current = setTimeout(() => {
        isEnvelopeStartingRef.current = false;
        hasEnvelopeStartedRef.current = true;
        startScroll();
      }, 4000);

      return () => {
        if (envelopeStartTimerRef.current) {
          clearTimeout(envelopeStartTimerRef.current);
        }
      };
    }
  }, [isOpened, startScroll]);

  // 2. Trigger auto-scroll start 4 seconds after clicking "Scratch Me" / revealing date
  const startScratchTimer = useCallback(() => {
    if (hasScratchStartedRef.current) return;
    hasScratchStartedRef.current = true;
    isScratchTriggeredRef.current = true;

    // Clear any other start timers
    if (envelopeStartTimerRef.current) {
      clearTimeout(envelopeStartTimerRef.current);
      isEnvelopeStartingRef.current = false;
    }
    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = null;
    }
    if (scratchStartTimerRef.current) {
      clearTimeout(scratchStartTimerRef.current);
    }

    // Stop scrolling while user views the reveal
    stopScroll();

    // Automatically start scroller after 4 seconds
    scratchStartTimerRef.current = setTimeout(() => {
      isScratchTriggeredRef.current = false;
      startScroll();
    }, 4000);
  }, [startScroll, stopScroll]);

  // Listen for allDatesRevealed prop change
  useEffect(() => {
    if (allDatesRevealed) {
      startScratchTimer();
    }
  }, [allDatesRevealed, startScratchTimer]);

  // Also listen for custom window event
  useEffect(() => {
    const handleScratchEvent = () => {
      startScratchTimer();
    };

    window.addEventListener('wedding-scratch-revealed', handleScratchEvent);
    return () => {
      window.removeEventListener('wedding-scratch-revealed', handleScratchEvent);
    };
  }, [startScratchTimer]);

  // Schedule auto-resume after 10 seconds of inactivity
  const scheduleIdleResume = useCallback(() => {
    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = null;
    }

    if (!isOpened) return;

    idleResumeTimerRef.current = setTimeout(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < maxScroll - 30) {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }
    }, 10000); // 10 seconds of inactivity
  }, [isOpened]);

  // Instant Smart-Pause on user interaction + 10s idle auto-resume
  useEffect(() => {
    const handleUserInteraction = () => {
      // If within the 4-second initial delays (after Tap to Reveal or Scratch Me), don't cancel the 4s auto-start
      if (isScratchTriggeredRef.current || isEnvelopeStartingRef.current) {
        return;
      }

      // Pause immediate auto-scrolling
      if (isPlayingRef.current) {
        stopScroll();
      }

      // Start/reset 10-second idle countdown to resume scrolling
      scheduleIdleResume();
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('wedding-user-interacting', handleUserInteraction);

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('wedding-user-interacting', handleUserInteraction);
      if (idleResumeTimerRef.current) {
        clearTimeout(idleResumeTimerRef.current);
      }
      if (scratchStartTimerRef.current) {
        clearTimeout(scratchStartTimerRef.current);
      }
      if (envelopeStartTimerRef.current) {
        clearTimeout(envelopeStartTimerRef.current);
      }
    };
  }, [stopScroll, scheduleIdleResume]);

  if (!isOpened) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={toggleScroll}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      className={`fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border-2 ${
        isPlaying ? 'border-gold shadow-gold/30' : 'border-gold/30'
      } text-forest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer`}
      aria-label={isPlaying ? 'Pause auto scroll' : 'Start auto scroll'}
      title={isPlaying ? 'Pause auto scroll' : 'Start auto scroll'}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-forest text-gold animate-pulse' : 'bg-gold/20 text-forest'}`}>
        {isPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current translate-x-[1px]" />}
      </div>
      <span className="font-heading text-xs font-bold uppercase tracking-wider text-forest select-none">
        {isPlaying ? 'Pause' : 'Auto Scroll'}
      </span>
    </motion.button>
  );
}
