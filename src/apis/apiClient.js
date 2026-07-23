import axios from "axios";
import { handleKakaoLogin } from "../utils/kakaoLogin.js";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
let isHandlingUnauthorized = false;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

function clearAuthTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const apiClient = axios.create({
  baseURL: apiBaseUrl.replace(/\/+$/, ""),
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true;
      clearAuthTokens();
      window.alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
      handleKakaoLogin();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
