import { useEffect, useState, type FormEvent } from 'react';
import { AuthButton } from './AuthButton';
import { AuthInput } from './AuthInput';
import { AuthStatus, type AuthStatusTone } from './AuthStatus';

export type AuthView = 'login' | 'sign-up' | 'forgot-password' | 'update-password';

export interface AuthFormValues {
  email: string;
  password: string;
}

interface LoginPageProps {
  disabled?: boolean;
  onChangeView: (view: AuthView) => void;
  onSubmit: (view: AuthView, values: AuthFormValues) => void | Promise<void>;
  status?: {
    message: string;
    tone: AuthStatusTone;
  };
  view: AuthView;
}

interface AuthErrors {
  confirmPassword?: string;
  email?: string;
  password?: string;
}

const VIEW_CONTENT: Record<AuthView, {
  buttonLabel: string;
  description: string;
  title: string;
}> = {
  login: {
    buttonLabel: '로그인',
    description: '계정으로 로그인해 오늘의 기록을 이어가세요.',
    title: '다시 만나서 반가워요',
  },
  'sign-up': {
    buttonLabel: '회원가입',
    description: '이메일로 계정을 만들고 기록을 안전하게 이어가세요.',
    title: '처음 오셨나요?',
  },
  'forgot-password': {
    buttonLabel: '재설정 메일 보내기',
    description: '가입한 이메일로 비밀번호 재설정 링크를 보내드려요.',
    title: '비밀번호를 재설정할게요',
  },
  'update-password': {
    buttonLabel: '새 비밀번호 저장',
    description: '앞으로 사용할 새 비밀번호를 입력해 주세요.',
    title: '새 비밀번호를 정해주세요',
  },
};

function validateAuthForm(
  view: AuthView,
  email: string,
  password: string,
  confirmPassword: string,
): AuthErrors {
  const errors: AuthErrors = {};

  if (view !== 'update-password') {
    if (!email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = '올바른 이메일 주소를 입력해주세요.';
    }
  }

  if (view !== 'forgot-password') {
    if (!password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (view !== 'login' && password.length < 8) {
      errors.password = '비밀번호는 8자 이상 입력해주세요.';
    }

    if (view !== 'login' && password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 서로 일치하지 않아요.';
    }
  }

  return errors;
}

export function LoginPage({
  disabled = false,
  onChangeView,
  onSubmit,
  status,
  view,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);
  const content = VIEW_CONTENT[view];

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  }, [view]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const nextErrors = validateAuthForm(
      view,
      normalizedEmail,
      password,
      confirmPassword,
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || disabled) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(view, { email: normalizedEmail, password });
    } finally {
      setLoading(false);
    }
  }

  const showEmail = view !== 'update-password';
  const showPassword = view !== 'forgot-password';
  const showConfirmation = view === 'sign-up' || view === 'update-password';

  return (
    <main className="auth-page">
      <aside className="auth-product-panel" aria-label="Side by Day 소개">
        <p>
          SIDE BY DAY
          <span>매일의 일정과 기록을<br />한곳에서 이어가세요.</span>
        </p>
      </aside>

      <section className="auth-content" aria-labelledby="auth-heading">
        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <p className="auth-form__brand">SIDE BY DAY&nbsp;&nbsp;·&nbsp;&nbsp;MY DIARY</p>
          <h1 className="auth-form__title" id="auth-heading">{content.title}</h1>
          <p className="auth-form__description">{content.description}</p>
          {status ? <AuthStatus tone={status.tone}>{status.message}</AuthStatus> : null}

          {showEmail ? (
            <AuthInput
              autoComplete="email"
              disabled={disabled || loading}
              error={errors.email}
              id="auth-email"
              label="이메일"
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
              placeholder="name@example.com"
              type="email"
              value={email}
            />
          ) : null}

          {showPassword ? (
            <AuthInput
              autoComplete={view === 'login' ? 'current-password' : 'new-password'}
              disabled={disabled || loading}
              error={errors.password}
              id="auth-password"
              label={view === 'login' ? '비밀번호' : '새 비밀번호'}
              minLength={view === 'login' ? undefined : 8}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
              }}
              placeholder={view === 'login' ? '비밀번호를 입력하세요' : '8자 이상 입력하세요'}
              type="password"
              value={password}
            />
          ) : null}

          {showConfirmation ? (
            <AuthInput
              autoComplete="new-password"
              disabled={disabled || loading}
              error={errors.confirmPassword}
              id="auth-confirm-password"
              label="새 비밀번호 확인"
              minLength={8}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (errors.confirmPassword) {
                  setErrors((current) => ({ ...current, confirmPassword: undefined }));
                }
              }}
              placeholder="비밀번호를 한 번 더 입력하세요"
              type="password"
              value={confirmPassword}
            />
          ) : null}

          <AuthButton disabled={disabled} label={content.buttonLabel} loading={loading} />

          {view === 'login' ? (
            <>
              <button
                className="auth-text-action auth-text-action--strong"
                disabled={loading}
                onClick={() => onChangeView('forgot-password')}
                type="button"
              >
                비밀번호를 잊으셨나요?
              </button>
              <button
                className="auth-text-action"
                disabled={loading}
                onClick={() => onChangeView('sign-up')}
                type="button"
              >
                처음이라면 회원가입
              </button>
            </>
          ) : null}

          {view === 'sign-up' || view === 'forgot-password' ? (
            <button
              className="auth-text-action auth-text-action--strong"
              disabled={loading}
              onClick={() => onChangeView('login')}
              type="button"
            >
              로그인으로 돌아가기
            </button>
          ) : null}
        </form>
      </section>
    </main>
  );
}
