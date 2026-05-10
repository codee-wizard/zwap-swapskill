import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  className?: string;
  action?: React.ReactNode;
}

export const PageHeader = ({ title, description, showBack = true, className, action }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
      <div className="flex items-center gap-4">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="shrink-0 h-9 w-9 rounded-full bg-card hover:bg-card-hover border border-border transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
