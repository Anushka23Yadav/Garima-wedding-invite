"use client";

import React from 'react';
import { MapPin, Navigation, Train } from 'lucide-react';
import { motion } from 'framer-motion';
import { BackgroundAnimalsPair } from './TraditionalBackgroundAnimation';
import weddingConfig from '../data/weddingConfig.json';

export default function VenueSection() {
  const { venue } = weddingConfig;

  return (
    <section className="py-20 px-6 bg-cream/50 relative overflow-hidden">
      {/* Background Traditional Animals Watermark (Desktop side margins only, never behind map on mobile) */}
      <BackgroundAnimalsPair camelTop="top-[25%]" elephantTop="bottom-[18%]" className="hidden md:block" />
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gold/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="inline-block bg-gold/10 px-6 py-2 rounded-full border border-gold/20 mb-2">
            <p className="font-heading text-sm uppercase tracking-[0.3em] text-gold font-bold">All Ceremonies at</p>
          </div>
          <h2 className="font-script text-5xl md:text-6xl text-gold">Find Us Here</h2>
          <p className="font-heading text-xl opacity-60 italic">We'd love to have you with us</p>
        </motion.div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <iframe 
            src={venue.embedIframeUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'contrast(1.05)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Address Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gold/10 space-y-6"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gold/10 p-4 rounded-full text-gold"
            >
              <MapPin size={32} />
            </motion.div>
            <div className="space-y-2">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-forest">{venue.name}</h3>
              <p className="font-heading text-lg text-forest/70 max-w-sm mx-auto">
                {venue.addressLine1}<br />
                {venue.addressLine2}
              </p>
            </div>
          </div>

          {/* Nearest Metro Station Info */}
          <div className="inline-flex items-center justify-center gap-3.5 bg-amber-50/80 px-6 py-3.5 rounded-2xl border border-amber-200/70 text-forest shadow-sm max-w-md mx-auto">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 font-bold shrink-0">
              <Train size={20} />
            </div>
            <div className="text-left">
              <p className="font-heading text-xs uppercase tracking-wider font-bold text-amber-800">Nearest Metro Station</p>
              <p className="font-heading text-sm md:text-base font-semibold text-forest">
                {venue.nearestMetro.stationName} <span className="text-amber-800/80 font-normal">({venue.nearestMetro.distance}, {venue.nearestMetro.line})</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href={venue.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 bg-forest text-beige rounded-full font-heading font-bold hover:bg-gold hover:text-forest transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Navigation size={18} />
              Get Directions
            </a>
          </div>

          <div className="pt-4 border-t border-gold/10">
            <p className="font-heading text-sm text-forest/50 italic">
              Delhi celebrations — Haldi, Mehndi, Sangeet & Wedding — will be held at this venue
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
