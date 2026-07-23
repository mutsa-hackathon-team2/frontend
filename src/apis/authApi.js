import apiClient from "./apiClient.js";

export async function checkSession({ signal } = {}) {
  const response = await apiClient.get("/api/auth/session", {
    signal,
  });

  const body = response.data;

  if (!body?.isSuccess) {
    throw new Error(body?.message || "로그인 상태를 확인하지 못했습니다.");
  }

  if (typeof body.result !== "boolean") {
    throw new Error("로그인 상태 응답 형식이 올바르지 않습니다.");
  }

  return body.result;
}
