import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { ScrollReveal } from '@/components/animations';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { SkillBadge } from '@/components/shared/SkillBadge';
import heroImg from '@/assets/hero-illustration.jpg';
import discoverImg from '@/assets/discover-illustration.jpg';
import communityImg from '@/assets/community-illustration.jpg';
import { mockUsers } from '@/mocks/users.mock';

const HEADLINE_LINE_1 = ['TEACH', 'WHAT', 'YOU', 'KNOW.'];
const HEADLINE_LINE_2 = ['LEARN', 'WHAT', 'YOU', "DON'T."];

const HOW_STEPS = [
  { num: '01', title: 'List your skills', body: 'Tell us what you can teach and what you want to learn. We build your swap profile.' },
  { num: '02', title: 'Get matched', body: 'Our algorithm finds people whose teach-list matches your learn-list. No money required.' },
  { num: '03', title: 'Swap & grow', body: 'Schedule sessions, message, exchange skills, and review. Both sides level up.' },
];

const TESTIMONIALS = [
  { name: 'Meera S.', skill: 'Python ↔ Design', quote: 'I doubled my design skills in a month while teaching Python. Best community I\'ve found.' },
  { name: 'Diego M.', skill: 'Spanish ↔ React', quote: 'Zwap turned my downtime into a side hustle of skills. Money never had to enter the picture.' },
  { name: 'Yuki T.', skill: 'Photography ↔ Writing', quote: 'I\'ve made friends across 5 countries swapping skills. The peer-to-peer model just works.' },
];

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
    <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
    <div className="container mx-auto pt-16 pb-20 lg:pt-24 lg:pb-32 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs font-medium text-primary-glow mb-6"
          >
            <Sparkles className="h-3 w-3" /> Skill exchange · No money. Just skills.
          </motion.div>
          <h1 className="font-pixel text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            <div className="flex flex-wrap gap-x-4">
              {HEADLINE_LINE_1.map((w, i) => (
                <motion.span key={i}
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 3 ? 'text-primary-glow' : 'text-foreground'}
                >{w}</motion.span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 mt-2">
              {HEADLINE_LINE_2.map((w, i) => (
                <motion.span key={i}
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 3 ? 'text-primary-glow' : 'text-foreground'}
                >{w}</motion.span>
              ))}
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="mt-6 text-base font-semibold text-foreground"
          >
            Swap skills. Grow together.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-3 text-muted-foreground max-w-md"
          >
            Join thousands of learners and experts in a peer-to-peer skill exchange community. No money. Just skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link to={ROUTES.ONBOARDING}>
              <Button size="lg" className="bg-primary hover:bg-primary-hover font-pixel tracking-wider text-base h-12 px-6 group">
                START SWAPPING FREE <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={ROUTES.DISCOVER}>
              <Button size="lg" variant="outline" className="h-12 px-6 border-border hover:border-primary">
                Browse skills
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/30 blur-3xl rounded-full" />
          <motion.img
            src={heroImg} alt="People learning together" className="relative rounded-2xl border border-primary/30 shadow-elevated w-full"
            animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          {/* Floating skill cards */}
          <motion.div
            initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.7 }}
            className="absolute -left-4 top-8 hidden md:block"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="bg-card border border-border rounded-xl p-3 shadow-card flex items-center gap-2"
            >
              <PixelAvatar src={mockUsers[0].avatar} name={mockUsers[0].name} size="sm" online />
              <div className="text-xs">
                <div className="font-semibold">{mockUsers[0].name}</div>
                <div className="text-success">teaches Python</div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.9 }}
            className="absolute -right-4 bottom-12 hidden md:block"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1.2, ease: 'easeInOut' }}
              className="bg-card border border-border rounded-xl p-3 shadow-card flex items-center gap-2"
            >
              <PixelAvatar src={mockUsers[2].avatar} name={mockUsers[2].name} size="sm" online />
              <div className="text-xs">
                <div className="font-semibold">{mockUsers[2].name}</div>
                <div className="text-primary-glow">learns Design</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const StatsBar = () => (
  <ScrollReveal>
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { v: 24500, suffix: '+', label: 'Active swappers' },
          { v: 18, suffix: '+', label: 'Skill categories' },
          { v: 89000, suffix: '+', label: 'Sessions exchanged' },
          { v: 96, suffix: '%', label: 'Match satisfaction' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-gradient">
              <AnimatedCounter target={s.v} suffix={s.suffix} />
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  </ScrollReveal>
);

const LiveTicker = () => {
  const items = [
    'Meera teaches Python ↔ Alex teaches Design',
    'Diego teaches Spanish ↔ Yuki teaches Photography',
    'Rhea teaches UI/UX ↔ Kabir teaches Guitar',
    'Ayesha teaches ML ↔ Nora teaches Writing',
    'Arjun teaches React ↔ Diego teaches Public Speaking',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-border bg-card/50 py-3 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="text-sm text-muted-foreground flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const HowItWorks = () => (
  <section id="how" className="container mx-auto py-20">
    <ScrollReveal>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold">How Zwap works</h2>
        <p className="text-muted-foreground mt-3">Three steps from "I want to learn that" to "I just learned that."</p>
      </div>
    </ScrollReveal>
    <div className="grid md:grid-cols-3 gap-5">
      {HOW_STEPS.map((s, i) => (
        <ScrollReveal key={s.num} delay={i * 0.1}>
          <div className="bg-gradient-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
            <div className="font-pixel text-5xl text-primary-glow">{s.num}</div>
            <h3 className="text-xl font-semibold mt-3">{s.title}</h3>
            <p className="text-muted-foreground mt-2">{s.body}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const SkillsPreview = () => (
  <section className="container mx-auto py-20">
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <ScrollReveal>
        <img src={discoverImg} alt="Browse skills" className="rounded-2xl border border-border shadow-card" loading="lazy" />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="text-xs uppercase tracking-widest text-primary-glow mb-3">Browse skills</div>
        <h2 className="text-4xl font-bold leading-tight">Explore skills.<br /><span className="text-gradient">Find your next swap.</span></h2>
        <p className="text-muted-foreground mt-4 max-w-md">
          Discover skills you want to learn or teach. Connect with people who match what you bring to the table.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Python', 'UI/UX Design', 'Guitar', 'Spanish', 'Photography', 'Public Speaking', 'Excel', 'Writing'].map(s => (
            <SkillBadge key={s} name={s} type="neutral" />
          ))}
        </div>
        <Link to={ROUTES.DISCOVER} className="inline-block mt-6">
          <Button className="bg-primary hover:bg-primary-hover">Browse all skills <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

const Community = () => (
  <section id="community" className="container mx-auto py-20">
    <ScrollReveal>
      <div className="rounded-3xl overflow-hidden border border-border bg-gradient-card relative">
        <img src={communityImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
        <div className="relative z-10 p-10 md:p-16 text-center">
          <h2 className="text-4xl font-bold">A community that grows together.</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Discussions, study groups, live sessions, and weekly events — all free, all peer-led.
          </p>
          <Link to={ROUTES.ONBOARDING}>
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary-hover">Join the community</Button>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  </section>
);

const Testimonials = () => (
  <section className="container mx-auto py-20">
    <ScrollReveal>
      <h2 className="text-3xl font-bold text-center mb-12">Swappers love Zwap</h2>
    </ScrollReveal>
    <div className="grid md:grid-cols-3 gap-5">
      {TESTIMONIALS.map((t, i) => (
        <ScrollReveal key={t.name} delay={i * 0.1}>
          <div className="bg-card border border-border rounded-2xl p-6 h-full">
            <p className="text-foreground/90">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <PixelAvatar name={t.name} size="md" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.skill}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="container mx-auto pb-20">
    <ScrollReveal>
      <div className="bg-gradient-primary rounded-3xl p-10 md:p-16 text-center shadow-elevated">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to swap?</h2>
        <p className="text-white/80 mt-4 max-w-lg mx-auto">No money. Just skills. Build your swap profile in 2 minutes.</p>
        <Link to={ROUTES.ONBOARDING}>
          <Button size="lg" variant="secondary" className="mt-8 font-pixel tracking-wider text-base h-12 px-8">
            START SWAPPING FREE <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </ScrollReveal>
  </section>
);

const LandingPage = () => (
  <>
    <Hero />
    <LiveTicker />
    <StatsBar />
    <HowItWorks />
    <SkillsPreview />
    <Community />
    <Testimonials />
    <FinalCTA />
  </>
);

export default LandingPage;
