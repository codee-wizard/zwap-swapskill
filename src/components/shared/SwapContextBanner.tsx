import { ArrowLeftRight } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';
import type { User, Skill } from '@/types';

interface Props {
  me: Pick<User, 'name' | 'avatar'>;
  them: Pick<User, 'name' | 'avatar'>;
  iTeach: Skill;
  theyTeach: Skill;
}

export const SwapContextBanner = ({ me, them, iTeach, theyTeach }: Props) => (
  <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-card/60 border border-border backdrop-blur">
    <div className="flex items-center gap-2">
      <PixelAvatar src={me.avatar} name={me.name} size="sm" />
      <div className="text-xs">
        <div className="font-semibold">{me.name}</div>
        <div className="text-muted-foreground">teaches {iTeach.name}</div>
      </div>
    </div>
    <ArrowLeftRight className="h-4 w-4 text-primary" />
    <div className="flex items-center gap-2">
      <div className="text-xs text-right">
        <div className="font-semibold">{them.name}</div>
        <div className="text-muted-foreground">teaches {theyTeach.name}</div>
      </div>
      <PixelAvatar src={them.avatar} name={them.name} size="sm" />
    </div>
  </div>
);
