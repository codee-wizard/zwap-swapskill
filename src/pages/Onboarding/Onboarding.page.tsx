import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { SkillBadge } from '@/components/shared/SkillBadge';
import { AvailabilityGrid } from '@/components/shared/AvailabilityGrid';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { MASTER_SKILLS } from '@/constants/skills';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/auth.store';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, GraduationCap, Sparkles, Users } from 'lucide-react';
import type { Availability } from '@/types';
import { empty } from '@/mocks/users.mock';

const STEPS = ['Account', 'Type', 'Teach', 'Learn', 'When', 'Photo'];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const loginAsGuest = useAuthStore(s => s.loginAsGuest);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState<'learner' | 'teacher' | 'both'>('both');
  const [teach, setTeach] = useState<string[]>([]);
  const [learn, setLearn] = useState<string[]>([]);
  const [avail, setAvail] = useState<Availability>(empty());
  const [photo, setPhoto] = useState<string | null>(null);

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const finish = async () => {
    await loginAsGuest();
    navigate(ROUTES.HOME);
  };

  const toggle = (id: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
      <StepIndicator steps={STEPS} current={step} />

      <div className="mt-8 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Let's set up your profile</h2>
                  <p className="text-muted-foreground text-sm mt-1">Just the basics — you can edit anytime.</p>
                </div>
                <div className="space-y-1.5">
                  <Label>Full name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Rivera" />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Short bio</Label>
                  <Textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="One line about you and what you're learning." />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">What brings you to Zwap?</h2>
                  <p className="text-muted-foreground text-sm mt-1">You can always change this.</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'learner', label: 'I want to learn', icon: GraduationCap },
                    { id: 'teacher', label: 'I want to teach', icon: Sparkles },
                    { id: 'both', label: 'Both — let\'s swap!', icon: Users },
                  ].map(o => {
                    const active = role === o.id;
                    return (
                      <motion.button
                        key={o.id} type="button"
                        whileHover={{ y: -2 }}
                        onClick={() => setRole(o.id as 'learner' | 'teacher' | 'both')}
                        className={`p-5 rounded-xl border-2 text-left transition-colors ${
                          active ? 'border-primary bg-primary/10' : 'border-border bg-card-hover hover:border-primary/40'
                        }`}
                      >
                        <o.icon className={`h-6 w-6 mb-3 ${active ? 'text-primary-glow' : 'text-muted-foreground'}`} />
                        <div className="font-semibold">{o.label}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {(step === 2 || step === 3) && (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{step === 2 ? 'What can you teach?' : 'What do you want to learn?'}</h2>
                  <p className="text-muted-foreground text-sm mt-1">Pick as many as you like.</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {MASTER_SKILLS.map(s => {
                    const list = step === 2 ? teach : learn;
                    const setter = step === 2 ? setTeach : setLearn;
                    const active = list.includes(s.id);
                    return (
                      <SkillBadge
                        key={s.id} name={s.name} selected={active}
                        type={step === 2 ? 'teach' : 'learn'}
                        onClick={() => toggle(s.id, list, setter)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">When are you free?</h2>
                  <p className="text-muted-foreground text-sm mt-1">Tap slots to mark your usual availability.</p>
                </div>
                <div className="flex justify-center overflow-x-auto pb-2">
                  <AvailabilityGrid availability={avail} editable onChange={setAvail} />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5 text-center">
                <h2 className="text-2xl font-bold">Add a profile photo</h2>
                <p className="text-muted-foreground text-sm">Or pick a pixel avatar — totally fine.</p>
                <div className="flex justify-center">
                  <div className="relative">
                    <PixelAvatar src={photo ?? undefined} name={name || 'You'} size="xl" />
                    <button
                      onClick={() => setPhoto(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${Date.now()}`)}
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2"
                      aria-label="Change avatar"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Button onClick={() => setPhoto(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`)} variant="outline" className="mt-3">
                  Randomize avatar
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next} className="bg-primary hover:bg-primary-hover">
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={finish} className="bg-primary hover:bg-primary-hover">
            Finish & enter Zwap <Sparkles className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
