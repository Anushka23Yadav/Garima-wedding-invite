"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCard({ revealContent, onReveal, isMonth, className = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const strokePointsRef = useRef(0);
  const isRevealingRef = useRef(false);

  const isLongText = Boolean(isMonth) || (typeof revealContent === 'string' && revealContent.length > 5);
  const isMediumText = typeof revealContent === 'string' && revealContent.length > 2 && revealContent.length <= 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerReveal = useCallback(() => {
    if (isRevealed || isRevealingRef.current) return;
    isRevealingRef.current = true;
    setIsRevealed(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#2D5016', '#FAF3E0', '#FFD700'],
        gravity: 1.2,
        ticks: 200
      });
    } catch {
      // Fallback if confetti fails
    }

    if (onReveal) onReveal();
  }, [isRevealed, onReveal]);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = window.devicePixelRatio || 1;

      // Set internal resolution to match device pixel ratio for crisp rendering (no blur)
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'source-over';

      // Shimmer gold background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#C9A84C');
      gradient.addColorStop(0.2, '#E8C15D');
      gradient.addColorStop(0.5, '#F8DC88');
      gradient.addColorStop(0.8, '#E8C15D');
      gradient.addColorStop(1, '#C9A84C');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Gold border
      ctx.strokeStyle = '#977A28';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, width - 2, height - 2);

      // Crisp noise dots
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const opacity = Math.random() * 0.35;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scratch text hint with adaptive sizing to never overflow
      const hintText = width < 115 ? '✨ SCRATCH ✨' : '✨ SCRATCH HERE ✨';
      ctx.fillStyle = '#2D5016';
      ctx.font = width < 115 ? 'bold 9px sans-serif' : 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = width < 115 ? '0.5px' : '1px';
      ctx.fillText(hintText, width / 2, height - 16);

      ctx.restore();
      setIsCanvasReady(true);
    };

    setupCanvas();

    const handleResize = () => {
      if (isRevealed) return;
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted, isRevealed]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed || !isCanvasReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    strokePointsRef.current += 1;

    // After 1-2 small scratch motions (4+ points recorded), reveal completely!
    if (strokePointsRef.current >= 4) {
      triggerReveal();
      return;
    }

    // Secondary check: if even a tiny percentage (>= 3%) is cleared, reveal immediately
    try {
      const { width, height } = canvas;
      const sampleCtx = canvas.getContext('2d', { willReadFrequently: true });
      const imageData = sampleCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparent = 0;
      const step = 32; // Fast sampled check
      const totalSamples = pixels.length / step;

      for (let i = 3; i < pixels.length; i += step) {
        if (pixels[i] === 0) transparent++;
      }

      if ((transparent / totalSamples) * 100 > 3) {
        triggerReveal();
      }
    } catch {
      // Fallback
    }
  };

  const defaultDimensionClasses = isLongText 
    ? 'w-[124px] sm:w-40 md:w-52 h-28 sm:h-32 md:h-40' 
    : 'w-[94px] sm:w-32 md:w-44 h-28 sm:h-32 md:h-40';

  if (!isMounted) {
    return (
      <div 
        className={`${className || defaultDimensionClasses} bg-gold/20 rounded-xl animate-pulse`} 
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative ${className || defaultDimensionClasses} rounded-xl overflow-hidden border-2 border-gold shadow-xl group bg-[#FFFDF9] flex-shrink-0`}
    >
      {/* Target Revealed Content: Ultra-crisp, high-contrast, perfectly fitted with zero side clipping */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFDF9] via-[#FFF9ED] to-[#FFF0D4] text-forest p-2 text-center transition-opacity duration-300 ${
          isCanvasReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ filter: 'none', transform: 'translateZ(0)' }}
      >
        <span 
          className={`font-heading text-forest drop-shadow-sm select-none whitespace-nowrap px-1 max-w-full ${
            isLongText 
              ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-normal' 
              : isMediumText
              ? 'text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide'
              : 'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider'
          }`}
        >
          {revealContent}
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider sm:tracking-[0.2em] text-[#8C651A] mt-1 select-none whitespace-nowrap">
          ✦ Revealed ✦
        </span>
      </div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-300 ${
          isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } z-10`}
        onMouseDown={() => {
          setIsDrawing(true);
          if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('wedding-user-interacting'));
        }}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={draw}
        onMouseLeave={() => setIsDrawing(false)}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsDrawing(true);
          if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('wedding-user-interacting'));
        }}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={(e) => {
          e.preventDefault();
          draw(e);
        }}
        onClick={triggerReveal}
      />
      
      {/* Scratch Hint Overlay */}
      {!isRevealed && isCanvasReady && !isDrawing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-forest/80 px-2.5 py-1 rounded-full border border-gold/40 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] md:text-[11px] font-bold text-amber-200 uppercase tracking-widest whitespace-nowrap">
              Scratch Me
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

