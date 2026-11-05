"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloralDivider } from './Icons';
import { ScheduleAnimals } from './TraditionalBackgroundAnimation';
import { Clock, MapPin, Sparkles, Music, Heart } from 'lucide-react';
import weddingConfig from '../data/weddingConfig.json';

const EventCard = ({ title, date, time, venue, note, color, bgGradient, image, icon: Icon, accentColor }) => (
  <motion.div 
    initial={{ y: 60, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="ceremony-card relative overflow-hidden rounded-3xl shadow-2xl border border-gold/20"
  >
    {/* Card Background */}
    <div className={`absolute inset-0 ${bgGradient}`} />
    
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
      <div className="absolute top-4 right-4 w-24 h-24 border-2 border-gold rounded-full" />
      <div className="absolute top-8 right-8 w-16 h-16 border border-gold rounded-full" />
    </div>

    <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
      {/* Image: 400px height for expansive, rich view */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Image 
          src={image} 
          fill 
          sizes="(max-width: 768px) 100vw, 550px"
          className="object-cover" 
          alt={title} 
          unoptimized={typeof image === 'string' && image.endsWith('.gif')} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"/>
        
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className={`absolute top-4 right-4 w-12 h-12 rounded-full ${accentColor} flex items-center justify-center shadow-lg`}
        >
          <Icon size={22} className="text-white" />
        </motion.div>
      </div>
      
      {/* Title */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-script text-5xl md:text-6xl text-forest font-bold"
      >
        {title}
      </motion.h2>

      {/* Date & Time */}
      <div className="flex flex-col gap-2 font-heading text-lg">
        <div className="flex items-center justify-center gap-2">
          <Clock size={20} className="text-[#8C651A]" />
          <p className="font-extrabold text-forest text-xl md:text-2xl">{date}</p>
        </div>
        <p className="text-forest text-2xl md:text-3xl font-extrabold">{time}</p>
      </div>

      {/* Note instead of dress code */}
      {note && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3.5 border border-gold/25"
        >
          <p className="text-forest font-heading text-lg md:text-xl font-bold italic">{note}</p>
        </motion.div>
      )}

      {/* Venue */}
      <div className="mt-2 pt-4 border-t border-forest/15 w-full">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MapPin size={18} className="text-[#8C651A]" />
          <p className="text-base uppercase tracking-widest font-extrabold text-[#8C651A]">Venue</p>
        </div>
        <p className="font-heading text-forest font-bold text-lg md:text-xl">{venue}</p>
      </div>
    </div>
  </motion.div>
);

// Wedding Day Schedule Component
const ScheduleItem = ({ time, event, description, index, isLast }) => (
  <motion.div
    initial={{ x: index % 2 === 0 ? -40 : 40, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.15 }}
    className="relative flex items-start gap-4 md:gap-6"
  >
    {/* Timeline dot */}
    <div className="flex flex-col items-center self-stretch">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        className="w-4 h-4 rounded-full bg-gold border-2 border-white shadow-lg z-10 shrink-0"
      />
      {!isLast && <div className="w-[2px] flex-1 my-1 timeline-line min-h-[60px]" />}
    </div>

    {/* Content */}
    <div className="pb-8 -mt-1">
      <p className="font-heading text-base md:text-lg text-[#8C651A] font-extrabold uppercase tracking-wider">{time}</p>
      <h4 className="font-script text-3xl md:text-4xl text-forest font-bold mt-1">{event}</h4>
      {description && (
        <p className="text-forest font-heading text-xl md:text-2xl mt-1.5 max-w-md font-bold leading-snug">{description}</p>
      )}
    </div>
  </motion.div>
);

const iconMap = {
  Sparkles,
  Music
};

export default function Ceremonies() {
  const { ganeshPuja, day1, weddingDay } = weddingConfig.ceremonies;
  const weddingSchedule = weddingDay.schedule;

  return (
    <section className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-24 relative overflow-hidden">
      {/* Ganesh Puja - 20th November */}
      {ganeshPuja && (
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <FloralDivider />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="inline-block bg-gold/15 px-7 py-2.5 rounded-full border border-gold/30">
                <p className="font-heading text-base sm:text-lg uppercase tracking-[0.3em] text-[#8C651A] font-extrabold">
                  {ganeshPuja.title || "Auspicious Beginning"}
                </p>
              </div>
              <h2 className="font-script text-6xl md:text-7xl text-[#8C651A] font-bold pt-2">
                {ganeshPuja.heading || "Shri Ganesh Puja"}
              </h2>
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-forest font-bold italic">{ganeshPuja.dateText}</p>
            </motion.div>
          </div>

          <div className="max-w-xl mx-auto">
            {ganeshPuja.events.map((event) => (
              <EventCard 
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                note={event.note}
                venue={event.venue}
                bgGradient={event.bgGradient}
                image={event.image}
                icon={iconMap[event.icon] || Sparkles}
                accentColor={event.accentColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Day 1 Heading */}
      <div className="text-center space-y-4">
        <FloralDivider />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <div className="inline-block bg-gold/15 px-7 py-2.5 rounded-full border border-gold/30">
            <p className="font-heading text-base sm:text-lg uppercase tracking-[0.3em] text-[#8C651A] font-extrabold">{day1.title}</p>
          </div>
          <h2 className="font-script text-6xl md:text-7xl text-[#8C651A] font-bold pt-2">Day 1</h2>
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-forest font-bold italic">{day1.dateText}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {day1.events.map((event) => (
          <EventCard 
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            note={event.note}
            venue={event.venue}
            bgGradient={event.bgGradient}
            image={event.image}
            icon={iconMap[event.icon] || Sparkles}
            accentColor={event.accentColor}
          />
        ))}
      </div>

      {/* Wedding Day */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <FloralDivider />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-block bg-gold/15 px-7 py-2.5 rounded-full border border-gold/30">
              <p className="font-heading text-base sm:text-lg uppercase tracking-[0.3em] text-[#8C651A] font-extrabold">{weddingDay.title}</p>
            </div>
            <h2 className="font-script text-6xl md:text-7xl text-[#8C651A] font-bold pt-2">The Wedding Day</h2>
            
            {/* Highlighted Wedding Date Banner */}
            <div className="pt-2 flex justify-center">
              <motion.div 
                initial={{ scale: 0.92, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-7 py-3.5 md:px-10 md:py-4 rounded-full bg-gradient-to-r from-[#FFF5DA] via-[#FFEBB0] to-[#FFF5DA] border-2 border-gold shadow-lg shadow-gold/25"
              >
                <Sparkles size={22} className="text-gold shrink-0 animate-pulse-soft" />
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-forest drop-shadow-sm">
                  {weddingDay.dateText}
                </span>
                <Sparkles size={22} className="text-gold shrink-0 animate-pulse-soft" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Wedding Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] md:h-[600px] w-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl group"
        >
          {/* Video Background */}
          <div className="absolute inset-0">
            <video 
              src="/assets/ramsita.mp4"
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col items-center justify-end pb-16 md:pb-20 text-white gap-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <motion.h3 
                className="font-script text-6xl md:text-7xl text-gold drop-shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                शुभ विवाह
              </motion.h3>
              <p className="font-heading text-2xl md:text-3xl tracking-[0.2em] font-bold">Garima weds Anurag</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-gold/60" />
                <Heart size={16} className="text-gold" fill="currentColor" />
                <div className="w-12 h-[1px] bg-gold/60" />
              </div>
              <p className="font-heading text-lg uppercase tracking-widest font-semibold opacity-95">Joining Two Souls Into One</p>
            </motion.div>
          </div>

          {/* Animated corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />
        </motion.div>

        {/* Wedding Day Schedule */}
        <div className="relative">
          {/* Schedule Animals: Camel on left, Elephant shifted slightly below on right */}
          <ScheduleAnimals />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center mb-10">
              <h3 className="font-script text-5xl md:text-6xl text-forest font-bold">Wedding Day Schedule</h3>
              <div className="inline-block mt-3">
                <span className="font-heading text-base md:text-lg font-extrabold text-forest bg-gold/30 px-6 py-2 rounded-full border border-gold/50 tracking-widest uppercase shadow-sm">
                  26th November 2026
                </span>
              </div>
            </div>

            <div className="relative">
              {/* Background line */}
              <div className="absolute left-[7px] top-2 bottom-8 w-[2px] bg-gold/15" />
              
              {weddingSchedule.map((item, index) => (
                <ScheduleItem key={index} {...item} index={index} isLast={index === weddingSchedule.length - 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
