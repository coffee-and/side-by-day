interface AuthButtonProps {
  disabled?: boolean;
  loading?: boolean;
}

export function AuthButton({ disabled = false, loading = false }: AuthButtonProps) {
  return (
    <button
      aria-busy={loading}
      className="auth-button"
      disabled={disabled || loading}
      type="submit"
    >
      {loading ? '처리 중…' : '로그인'}
    </button>
  );
}
