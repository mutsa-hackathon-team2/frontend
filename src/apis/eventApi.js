import apiClient from "./apiClient.js";

export async function getEvents({ categoryId, signal } = {}) {
  const response = await apiClient.get("/api/events", {
    params: categoryId ? { categoryId } : undefined,
    signal,
  });

  const body = response.data;

  if (!body?.isSuccess) {
    throw new Error(body?.message || "행사 목록을 불러오지 못했습니다.");
  }

  if (!Array.isArray(body.result)) {
    throw new Error("행사 목록 응답 형식이 올바르지 않습니다.");
  }

  return body.result;
}

export async function getEventDetail(eventId, { signal } = {}) {
  const response = await apiClient.get(`/api/events/${eventId}`, {
    signal,
  });

  const body = response.data;

  if (!body?.isSuccess) {
    throw new Error(body?.message || "행사 상세 정보를 불러오지 못했습니다.");
  }

  if (!body.result || typeof body.result !== "object") {
    throw new Error("행사 상세 응답 형식이 올바르지 않습니다.");
  }

  return body.result;
}
