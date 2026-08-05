import type { ChangeEventHandler, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';

interface AuthInputProps {
  autoComplete: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
  error?: string;
  id: string;
  label: string;
  minLength?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
}

export function AuthInput({
  autoComplete,
  disabled = false,
  error,
  id,
  label,
  minLength,
  onChange,
  placeholder,
  type,
  value,
}: AuthInputProps) {
  const helperId = `${id}-helper`;

  return (
    <div className={`auth-field${error ? ' auth-field--error' : ''}`}>
      <label className="auth-field__label" htmlFor={id}>{label}</label>
      <input
        aria-describedby={helperId}
        aria-invalid={Boolean(error)}
        autoCapitalize="none"
        autoComplete={autoComplete}
        className="auth-field__control"
        disabled={disabled}
        id={id}
        minLength={minLength}
        onChange={onChange}
        placeholder={placeholder}
        spellCheck={false}
        type={type}
        value={value}
      />
      <span className="auth-field__helper" id={helperId}>
        {error || '\u00a0'}
      </span>
    </div>
  );
}
