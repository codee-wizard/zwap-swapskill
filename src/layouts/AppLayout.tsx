import { type PropsWithChildren } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Navbar } from '@/components/shared/Navbar';

export const AppLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen flex w-full bg-background">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Navbar />
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">{children}</main>
    </div>
  </div>
);
