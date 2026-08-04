import type { ChangeEventHandler, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';

interface AuthInputProps {
  autoComplete: HTMLInputAutoCompleteAttribute;
  error?: string;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
}

export function AuthInput({
  autoComplete,
  error,
  id,
  label,
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
        id={id}
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
