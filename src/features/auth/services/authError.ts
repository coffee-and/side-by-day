import { AuthError } from '@supabase/supabase-js';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  email_not_confirmed: '이메일 인증을 완료한 뒤 로그인해 주세요.',
  email_address_invalid: '사용할 수 없는 이메일 주소예요.',
  invalid_credentials: '이메일 또는 비밀번호를 확인해 주세요.',
  over_email_send_rate_limit: '메일 요청이 너무 잦아요. 잠시 후 다시 시도해 주세요.',
  over_request_rate_limit: '요청이 너무 잦아요. 잠시 후 다시 시도해 주세요.',
  same_password: '현재 비밀번호와 다른 비밀번호를 입력해 주세요.',
  signup_disabled: '현재는 새 계정을 만들 수 없어요.',
  user_banned: '이 계정은 현재 로그인할 수 없어요.',
  weak_password: '더 안전한 비밀번호를 사용해 주세요.',
};

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof AuthError && error.code) {
    return AUTH_ERROR_MESSAGES[error.code] ?? '로그인 처리 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.';
  }

  if (error instanceof Error && error.message.startsWith('로그인 서버')) {
    return error.message;
  }

  return '로그인 처리 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.';
}
