import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Search, Sparkles, GraduationCap, FileText, Video, Wrench,
  Mic, Code2, ClipboardList, Download, Upload, Star, ArrowRight,
  Figma, Github, Compass, Map,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import resourcesIllustration from '@/assets/resources-illustration.png';

type CategoryKey =
  | 'All' | 'Courses' | 'Books' | 'Articles' | 'Tutorials'
  | 'Cheatsheets' | 'Templates' | 'Tools' | 'Podcasts' | 'Videos';

const CATEGORIES: { key: CategoryKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'All', icon: Sparkles },
  { key: 'Courses', icon: GraduationCap },
  { key: 'Books', icon: BookOpen },
  { key: 'Articles', icon: FileText },
  { key: 'Tutorials', icon: Code2 },
  { key: 'Cheatsheets', icon: ClipboardList },
  { key: 'Templates', icon: FileText },
  { key: 'Tools', icon: Wrench },
  { key: 'Podcasts', icon: Mic },
  { key: 'Videos', icon: Video },
];

type Resource = {
  id: string;
  title: string;
  description: string;
  type: Exclude<CategoryKey, 'All'>;
  rating: number;
  reviews: string;
  tint: string;
  icon: React.ComponentType<{ className?: string }>;
};

const RECOMMENDED: Resource[] = [
  { id: '1', title: 'Python for Beginners', description: 'Learn Python from scratch with hands-on projects.', type: 'Courses', rating: 4.8, reviews: '1.2k', tint: 'bg-success/20 text-success', icon: Code2 },
  { id: '2', title: 'Clean Code', description: 'A handbook of agile software craftsmanship.', type: 'Books', rating: 4.9, reviews: '890', tint: 'bg-primary/20 text-primary-glow', icon: BookOpen },
  { id: '3', title: 'JavaScript Crash Course', description: 'Learn JavaScript in 1 hour with this beginner-friendly video.', type: 'Videos', rating: 4.7, reviews: '2.3k', tint: 'bg-destructive/20 text-destructive', icon: Video },
  { id: '4', title: 'Git Commands Cheat Sheet', description: 'Essential Git commands you should know.', type: 'Cheatsheets', rating: 4.8, reviews: '756', tint: 'bg-warning/20 text-warning', icon: FileText },
  { id: '5', title: 'VS Code Shortcuts', description: 'Boost your productivity with these VS Code shortcuts.', type: 'Tools', rating: 4.9, reviews: '1.1k', tint: 'bg-teal/20 text-teal', icon: Wrench },
];

const LEARNING_PATHS = [
  { name: 'Full Stack Web Development', progress: 72, icon: Code2, tint: 'bg-primary/20 text-primary-glow' },
  { name: 'Data Science Bootcamp', progress: 45, icon: Compass, tint: 'bg-teal/20 text-teal' },
  { name: 'UI/UX Design Fundamentals', progress: 60, icon: Map, tint: 'bg-warning/20 text-warning' },
  { name: 'Python Developer Path', progress: 30, icon: GraduationCap, tint: 'bg-success/20 text-success' },
];

const DOWNLOADS = [
  { ext: 'PDF', name: 'JavaScript Interview Questions', meta: 'PDF • 1.2 MB', count: '12.4k', tint: 'bg-destructive/20 text-destructive' },
  { ext: 'ZIP', name: 'React Project Starter Template', meta: 'ZIP • 3.4 MB', count: '8.7k', tint: 'bg-warning/20 text-warning' },
  { ext: 'PDF', name: 'SQL Cheat Sheet', meta: 'PDF • 0.8 MB', count: '7.1k', tint: 'bg-destructive/20 text-destructive' },
  { ext: 'DOCX', name: 'Design System Template', meta: 'DOCX • 2.3 MB', count: '5.6k', tint: 'bg-primary/20 text-primary-glow' },
  { ext: 'PDF', name: 'Python Data Structures', meta: 'PDF • 1.5 MB', count: '4.3k', tint: 'bg-destructive/20 text-destructive' },
];

const TOOLS = [
  { name: 'Figma', desc: 'Collaborative interface design tool.', icon: Figma, tint: 'bg-primary/20 text-primary-glow' },
  { name: 'CodeSandbox', desc: 'Online IDE for web development.', icon: Code2, tint: 'bg-card-hover text-foreground' },
  { name: 'GitHub', desc: 'Code hosting and collaboration.', icon: Github, tint: 'bg-card-hover text-foreground' },
  { name: 'Notion', desc: 'All-in-one workspace for teams.', icon: FileText, tint: 'bg-card-hover text-foreground' },
  { name: 'Postman', desc: 'API development made simple.', icon: Wrench, tint: 'bg-warning/20 text-warning' },
];

const ResourcesPage = () => {
  const [activeCat, setActiveCat] = useState<CategoryKey>('All');
  const [query, setQuery] = useState('');

  const filtered = RECOMMENDED.filter(r =>
    (activeCat === 'All' || r.type === activeCat) &&
    (!query || r.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-glow" />
              </div>
              <h1 className="text-4xl font-bold">Resources</h1>
            </div>
            <p className="text-muted-foreground max-w-md">
              Curated resources to help you learn, teach, and grow your skills.
            </p>
          </div>
          <img
            src={resourcesIllustration}
            alt="Stack of books and laptop"
            className="hidden md:block h-40 object-contain"
          />
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="h-12 pl-11 bg-card border-border rounded-xl"
          />
        </div>
      </FadeIn>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCat(key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all',
              activeCat === key
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            )}
          >
            <Icon className="h-4 w-4" />
            {key}
          </button>
        ))}
      </div>

      {/* Recommended */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-warning" />
            Recommended for you
          </h2>
          <button className="text-sm text-primary-glow hover:underline">View all</button>
        </div>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filtered.map(r => (
            <motion.div key={r.id} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="p-4 h-full bg-card border-border hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', r.tint)}>
                    <r.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">{r.type.slice(0, -1) || r.type}</Badge>
                </div>
                <h3 className="font-semibold mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-6 w-6 rounded-full bg-primary/30 border-2 border-card" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="font-medium text-foreground">{r.rating}</span>
                    <span>({r.reviews})</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </section>

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Paths */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-1">
            <h3 className="flex items-center gap-2 font-semibold">
              <Map className="h-5 w-5 text-warning" />
              Learning Paths
            </h3>
            <button className="text-xs text-primary-glow hover:underline">View all</button>
          </div>
          <p className="text-xs text-muted-foreground mb-5">Step-by-step guides to master a skill.</p>
          <div className="space-y-4">
            {LEARNING_PATHS.map(p => (
              <div key={p.name} className="flex items-center gap-3">
                <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0', p.tint)}>
                  <p.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium truncate">{p.name}</span>
                    <span className="text-muted-foreground ml-2">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-5 w-full justify-between text-primary-glow hover:bg-primary/10">
            Explore all learning paths <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        {/* Popular Downloads */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Download className="h-5 w-5 text-success" />
              Popular Downloads
            </h3>
            <button className="text-xs text-primary-glow hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {DOWNLOADS.map(d => (
              <div key={d.name} className="flex items-center gap-3 group">
                <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0', d.tint)}>
                  {d.ext}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.meta}</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{d.count}</span>
                  <Download className="h-4 w-4 group-hover:text-primary-glow transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Featured Tools */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Wrench className="h-5 w-5 text-teal" />
              Featured Tools
            </h3>
            <button className="text-xs text-primary-glow hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {TOOLS.map(t => (
              <div key={t.name} className="flex items-center gap-3">
                <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', t.tint)}>
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.desc}</div>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs">Visit</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Contribute */}
      <Card className="p-6 bg-card border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary-glow" />
          </div>
          <div>
            <h3 className="font-semibold">Contribute to the community</h3>
            <p className="text-sm text-muted-foreground">Share resources that helped you learn or teach others.</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Upload className="h-4 w-4 mr-2" /> Upload a Resource
        </Button>
      </Card>
    </div>
  );
};

export default ResourcesPage;
