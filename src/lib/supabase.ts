import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const authConfigurationError = !supabaseUrl || !supabasePublishableKey
  ? '로그인 서버 설정이 아직 완료되지 않았어요. VITE_SUPABASE_URL과 VITE_SUPABASE_PUBLISHABLE_KEY를 확인해 주세요.'
  : null;

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;

export function getSupabaseClient() {
  if (!supabase) {
    throw new Error(authConfigurationError ?? '로그인 서버를 초기화할 수 없습니다.');
  }

  return supabase;
}

export function getAuthRedirectUrl() {
  return new URL(import.meta.env.BASE_URL, window.location.origin).toString();
}
