import { useState, type FormEvent } from 'react';
import { AuthButton } from './AuthButton';
import { AuthInput } from './AuthInput';
import { AuthStatus, type AuthStatusTone } from './AuthStatus';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginPageProps {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSubmit?: (credentials: LoginCredentials) => void | Promise<void>;
  status?: {
    message: string;
    tone: AuthStatusTone;
  };
}

interface LoginErrors {
  email?: string;
  password?: string;
}

function validateLogin({ email, password }: LoginCredentials): LoginErrors {
  const errors: LoginErrors = {};
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = '올바른 이메일 주소를 입력해주세요.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return errors;
}

export function LoginPage({ onForgotPassword, onSignUp, onSubmit, status }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const credentials = { email: email.trim(), password };
    const nextErrors = validateLogin(credentials);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !onSubmit) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(credentials);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <aside className="auth-product-panel" aria-label="Side by Day 소개">
        <p>
          SIDE BY DAY
          <span>매일의 일정과 기록을<br />한곳에서 이어가세요.</span>
        </p>
      </aside>

      <section className="auth-content" aria-labelledby="login-heading">
        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <p className="auth-form__brand">SIDE BY DAY&nbsp;&nbsp;·&nbsp;&nbsp;MY DIARY</p>
          <h1 className="auth-form__title" id="login-heading">다시 만나서 반가워요</h1>
          <p className="auth-form__description">계정으로 로그인해 오늘의 기록을 이어가세요.</p>
          {status ? <AuthStatus tone={status.tone}>{status.message}</AuthStatus> : null}

          <AuthInput
            autoComplete="email"
            error={errors.email}
            id="login-email"
            label="이메일"
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
            }}
            placeholder="name@example.com"
            type="email"
            value={email}
          />
          <AuthInput
            autoComplete="current-password"
            error={errors.password}
            id="login-password"
            label="비밀번호"
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
            }}
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={password}
          />

          <AuthButton loading={loading} />

          <button className="auth-text-action auth-text-action--strong" onClick={onForgotPassword} type="button">
            비밀번호를 잊으셨나요?
          </button>
          <button className="auth-text-action" onClick={onSignUp} type="button">
            처음이라면 회원가입
          </button>
        </form>
      </section>
    </main>
  );
}
