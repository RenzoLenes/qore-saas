'use client';

import { QrCode, LogOut } from 'lucide-react';
import { logout } from '@/app/(auth)/logout/actions';

interface WorkerTopbarProps {
  name: string;
}

export default function WorkerTopbar({ name }: WorkerTopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <QrCode className="h-4 w-4" />
        </div>
        <span className="text-lg font-bold tracking-tight">QORE</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--text-secondary)] hidden sm:block">{name}</span>
        <form action={logout}>
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/5 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
