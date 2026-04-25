import { type PropsWithChildren } from 'react';
import { ZwapLogo } from '@/components/shared/ZwapLogo';

export const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen w-full bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
    <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
    <div className="relative z-10 min-h-screen flex flex-col">
      <header className="p-6"><ZwapLogo /></header>
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  </div>
);
