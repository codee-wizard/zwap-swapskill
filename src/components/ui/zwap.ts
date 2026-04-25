// Zwap UI primitives — thin wrappers re-exporting shadcn components
// so the rest of the codebase can import from @/components/ui/<Name>.
export { Button } from '@/components/ui/button';
export { Input } from '@/components/ui/input';
export { Badge } from '@/components/ui/badge';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
export { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export { Skeleton } from '@/components/ui/skeleton';
export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
export { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export { Dialog as Modal, DialogContent as ModalContent, DialogHeader as ModalHeader, DialogTitle as ModalTitle, DialogDescription as ModalDescription, DialogFooter as ModalFooter, DialogTrigger as ModalTrigger } from '@/components/ui/dialog';
export { Sheet as Drawer, SheetContent as DrawerContent, SheetHeader as DrawerHeader, SheetTitle as DrawerTitle, SheetTrigger as DrawerTrigger } from '@/components/ui/sheet';
