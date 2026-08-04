import type { ReactNode } from 'react';

export type AuthStatusTone = 'info' | 'error';

interface AuthStatusProps {
  children: ReactNode;
  tone?: AuthStatusTone;
}

export function AuthStatus({ children, tone = 'info' }: AuthStatusProps) {
  return (
    <p
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={`auth-status auth-status--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
}
