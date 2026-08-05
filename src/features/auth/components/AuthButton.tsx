interface AuthButtonProps {
  disabled?: boolean;
  label?: string;
  loading?: boolean;
}

export function AuthButton({ disabled = false, label = '로그인', loading = false }: AuthButtonProps) {
  return (
    <button
      aria-busy={loading}
      className="auth-button"
      disabled={disabled || loading}
      type="submit"
    >
      {loading ? '처리 중…' : label}
    </button>
  );
}
