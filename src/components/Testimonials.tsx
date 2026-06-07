import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    text: "The AI Starter Handbook finally made sense of everything. I have been circling AI tools for months and this cleared it all up in one read.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face",
    name: "Sarah M.",
    role: "Digital strategist",
    stars: 5,
  },
  {
    text: "I went from spending three hours on content to twenty minutes. The carousel bundle changed how I show up online completely.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Daniel K.",
    role: "Entrepreneur",
    stars: 4,
  },
  {
    text: "The Canva templates are so considered. Everything felt intentional. My brand finally looks like something I am proud of.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Leila T.",
    role: "Freelance designer",
    stars: 5,
  },
  {
    text: "StayGuided broke down AI in a way that actually stuck. No jargon, no fluff. Just clarity I could act on the same day.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Marcus O.",
    role: "Content creator",
    stars: 4,
  },
  {
    text: "I have bought a lot of digital products. Most sit in a folder. This one I actually used. That says everything.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    name: "Yasmin A.",
    role: "Marketing consultant",
    stars: 4,
  },
  {
    text: "The carousel pack helped me grow my LinkedIn from 200 to over 1,400 followers in six weeks. Worth every dollar.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Tom R.",
    role: "Business coach",
    stars: 5,
  },
  {
    text: "Good guide overall. Some sections I already knew but the AI tools breakdown was genuinely useful and saved me time.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    name: "Nina S.",
    role: "Solopreneur",
    stars: 3,
  },
  {
    text: "The automation guide saved me probably four hours a week. I set up three workflows in one afternoon using exactly what it described.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Emmanuel B.",
    role: "Startup founder",
    stars: 4,
  },
  {
    text: "I redesigned my entire digital presence using the brand kit templates. My clients noticed immediately. Completely worth it.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    name: "Priya N.",
    role: "Virtual assistant",
    stars: 5,
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function TestimonialCard({ text, image, name, role, stars }: typeof testimonials[0]) {
  return (
    <div className="vc" style={{ marginBottom: '1.25rem' }}>
      <div className="vc-stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
      <p className="vc-quote">"{text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '1rem' }}>
        <img
          src={image}
          alt={name}
          style={{ borderRadius: '50%', objectFit: 'cover', width: 32, height: 32, flexShrink: 0 }}
        />
        <p className="vc-who">
          <strong>{name}</strong>, {role}
        </p>
      </div>
    </div>
  )
}

function TestimonialsColumn({ items, duration = 15 }: {
  items: typeof testimonials
  duration?: number
}) {
  return (
    <div style={{ overflow: 'hidden', flex: 1 }}>
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
      <div className="testi-scroll-wrap">
        <TestimonialsColumn items={firstColumn} duration={18} />
        <TestimonialsColumn items={secondColumn} duration={22} />
        <TestimonialsColumn items={thirdColumn} duration={16} />
      </div>
    </section>
  )
}
