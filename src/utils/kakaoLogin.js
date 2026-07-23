export function handleKakaoLogin() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoLoginUrl =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    "&response_type=code";

  window.location.href = kakaoLoginUrl;
}
