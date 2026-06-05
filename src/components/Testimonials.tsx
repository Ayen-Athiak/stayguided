import React from 'react'
import { motion } from 'motion/react'

const testimonials = [
  {
    text: "The AI Starter Handbook finally made sense of everything. I have been circling AI tools for months and this cleared it all up in one read.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face",
    name: "Amara K.",
    role: "Digital strategist",
  },
  {
    text: "I went from spending three hours on content to twenty minutes. The carousel bundle changed how I show up online completely.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Brian M.",
    role: "Entrepreneur",
  },
  {
    text: "The Canva templates are so considered. Everything felt intentional. My brand finally looks like something I am proud of.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Zara T.",
    role: "Freelance designer",
  },
  {
    text: "StayGuided broke down AI in a way that actually stuck. No jargon, no fluff. Just clarity I could act on the same day.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "David O.",
    role: "Content creator",
  },
  {
    text: "I have bought a lot of digital products. Most sit in a folder. This one I actually used. That says everything.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: "Fatima A.",
    role: "Marketing consultant",
  },
  {
    text: "The carousel pack helped me grow my LinkedIn from 200 to over 1,400 followers in six weeks. Worth every dollar.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "James R.",
    role: "Business coach",
  },
  {
    text: "Finally a guide that explains AI tools without making me feel stupid. Practical, clear, and actually useful.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Nadia S.",
    role: "Solopreneur",
  },
  {
    text: "The automation guide saved me probably four hours a week. I set up three workflows in one afternoon using exactly what it described.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Kofi B.",
    role: "Startup founder",
  },
  {
    text: "I redesigned my entire digital presence using the brand kit templates. My clients noticed immediately. Completely worth it.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    name: "Priya N.",
    role: "Virtual assistant",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function TestimonialCard({ text, image, name, role }: typeof testimonials[0]) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '0.5px solid var(--border2)',
      padding: '1.5rem',
      marginBottom: '1rem',
      maxWidth: '280px',
      width: '100%',
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: '0.98rem',
        color: 'var(--text)',
        lineHeight: 1.7,
        fontWeight: 300,
        marginBottom: '1.1rem',
      }}>
        "{text}"
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src={image}
          alt={name}
          width={36}
          height={36}
          style={{ borderRadius: '50%', objectFit: 'cover', width: 36, height: 36, flexShrink: 0 }}
        />
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--green)', lineHeight: 1.3 }}>{name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.3 }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsColumn({ items, duration = 15, className = '' }: {
  items: typeof testimonials
  duration?: number
  className?: string
}) {
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {[...new Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((t, j) => <TestimonialCard key={j} {...t} />)}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="voices" id="voices">
      <div style={{ maxWidth: 500, marginBottom: '3rem' }}>
        <p className="ey">Voices from the community</p>
        <h2 className="st">People who stayed <em>guided</em></h2>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        maxHeight: '600px',
        overflow: 'hidden',
      }}>
        <TestimonialsColumn items={firstColumn} duration={18} />
        <TestimonialsColumn items={secondColumn} duration={22} className="hidden-mobile" />
        <TestimonialsColumn items={thirdColumn} duration={16} className="hidden-tablet" />
      </div>
    </section>
  )
}
