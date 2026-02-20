import { Bell, Search } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface TopbarProps {
  user: {
    name: string;
    initials: string;
    role: string;
  } | null;
}

export default function Topbar({ user }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8">
      {/* Left spacer for mobile menu button */}
      <div className="lg:hidden w-10" />

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
        <Input
          icon={Search}
          placeholder="Buscar..."
          className="!h-9 !bg-surface"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative !h-9 !w-9 !p-0">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand" />
        </Button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xs font-bold">
            {user?.initials ?? '??'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium leading-none">{user?.name ?? 'Usuario'}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{user?.role ?? 'Sin rol'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
