import { useEffect, useState } from 'react';
import { App } from './App';
import {
  LoginPage,
  type AuthFormValues,
  type AuthView,
} from './features/auth/components/LoginPage';
import type { AuthStatusTone } from './features/auth/components/AuthStatus';
import { useAuth } from './features/auth/hooks/useAuth';
import { getAuthErrorMessage } from './features/auth/services/authError';

interface AuthStatusState {
  message: string;
  tone: AuthStatusTone;
}

export function Root() {
  const auth = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [status, setStatus] = useState<AuthStatusState | undefined>();

  useEffect(() => {
    if (auth.recoveringPassword) {
      setView('update-password');
      setStatus({ message: '인증이 확인됐어요. 새 비밀번호를 입력해 주세요.', tone: 'info' });
    }
  }, [auth.recoveringPassword]);

  async function handleSubmit(nextView: AuthView, values: AuthFormValues) {
    setStatus(undefined);

    try {
      if (nextView === 'login') {
        await auth.signIn(values.email, values.password);
        return;
      }

      if (nextView === 'sign-up') {
        const result = await auth.signUp(values.email, values.password);
        if (result.requiresEmailConfirmation) {
          setView('login');
          setStatus({
            message: '확인 메일을 보냈어요. 이메일 인증을 마친 뒤 로그인해 주세요.',
            tone: 'info',
          });
        }
        return;
      }

      if (nextView === 'forgot-password') {
        await auth.requestPasswordReset(values.email);
        setView('login');
        setStatus({
          message: '가입 여부와 관계없이, 확인 가능한 계정이라면 재설정 메일을 보내드려요.',
          tone: 'info',
        });
        return;
      }

      await auth.updatePassword(values.password);
    } catch (error) {
      setStatus({ message: getAuthErrorMessage(error), tone: 'error' });
    }
  }

  if (auth.initializing) {
    return (
      <main className="auth-loading" aria-busy="true" aria-live="polite">
        계정 정보를 확인하고 있어요…
      </main>
    );
  }

  if (auth.session && !auth.recoveringPassword) {
    return <App onSignOut={auth.signOut} userId={auth.session.user.id} />;
  }

  const configurationStatus = auth.configurationError
    ? { message: auth.configurationError, tone: 'error' as const }
    : status;

  return (
    <LoginPage
      disabled={Boolean(auth.configurationError)}
      onChangeView={(nextView) => {
        setStatus(undefined);
        setView(nextView);
      }}
      onSubmit={handleSubmit}
      status={configurationStatus}
      view={view}
    />
  );
}
