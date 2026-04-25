import { type PropsWithChildren } from 'react';
import { Navbar } from '@/components/shared/Navbar';

export const LandingLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen w-full bg-background">
    <Navbar landing />
    <main>{children}</main>
    <footer className="border-t border-border/60 py-10 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Zwap. Built for swappers.</span>
        <div className="flex gap-6">
          <a className="hover:text-foreground" href="#">Privacy</a>
          <a className="hover:text-foreground" href="#">Terms</a>
          <a className="hover:text-foreground" href="#">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);
