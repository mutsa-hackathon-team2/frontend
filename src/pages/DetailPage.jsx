import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Chip from "../components/Chip";
import Header from "../components/Header";
import { getEventDetail } from "../apis/eventApi.js";

const categoryColorMap = {
  공연: "bg-[#43AE73] text-white",
  전시: "bg-[#23CBD3] text-white",
  행사: "bg-[#EB3D40] text-white",
  디데이: "bg-[#4357AE] text-white",
};

function parseDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  if (!date) {
    return "날짜 정보 없음";
  }

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

function formatDateRange(startDate, endDate) {
  const start = formatDate(parseDate(startDate));
  const end = formatDate(parseDate(endDate));

  return start === end ? start : `${start} ~ ${end}`;
}

function formatTime(date) {
  if (!date) {
    return "시간 정보 없음";
  }

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function formatTimeRange(startDate, endDate) {
  const start = formatTime(parseDate(startDate));
  const end = formatTime(parseDate(endDate));

  return start === end ? start : `${start} ~ ${end}`;
}

function formatPrice(value) {
  if (value === null || value === undefined) {
    return "가격 정보 없음";
  }

  const price = Number(value);

  if (Number.isNaN(price)) {
    return String(value);
  }

  return price === 0 ? "무료" : `${price.toLocaleString("ko-KR")}원`;
}

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEventDetail() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const eventDetail = await getEventDetail(id, {
          signal: controller.signal,
        });
        setEvent(eventDetail);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setEvent(null);
          setErrorMessage(
            error.response?.data?.message ||
              error.message ||
              "행사 상세 정보를 불러오는 중 문제가 발생했습니다.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadEventDetail();

    return () => controller.abort();
  }, [id, requestKey]);

  const handleReserve = () => {
    console.log("예매하기 클릭:", event.id);
  };

  return (
    <>
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <main className="max-w-5xl mx-auto py-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 text-2xl"
          aria-label="뒤로가기"
        >
          ‹
        </button>

        {isLoading && (
          <p className="py-20 text-center text-body1 text-gray-500" role="status">
            행사 정보를 불러오고 있어요.
          </p>
        )}

        {!isLoading && errorMessage && (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="text-body1 text-gray-500">{errorMessage}</p>
            <button
              type="button"
              className="rounded-full bg-[#4357AE] px-7 py-2 text-body1 text-white"
              onClick={() => setRequestKey((key) => key + 1)}
            >
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !errorMessage && event && (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-80 md:h-[480px] h-96 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                {event.posterUrl && (
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between md:h-[480px]">
                <div>
                  <Chip
                    className={`mb-3 w-fit ${
                      categoryColorMap[event.categoryName] ??
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {event.categoryName}
                  </Chip>
                  <h1 className="text-title mb-4">{event.title}</h1>

                  <dl className="space-y-2">
                    <div className="flex gap-4">
                      <dt className="text-body1 text-gray-500 w-12">장소</dt>
                      <dd className="text-body1">
                        {event.location || "장소 정보 없음"}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-body1 text-gray-500 w-12">날짜</dt>
                      <dd className="text-body1">
                        {formatDateRange(event.startDate, event.endDate)}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-body1 text-gray-500 w-12">시간</dt>
                      <dd className="text-body1">
                        {formatTimeRange(event.startDate, event.endDate)}
                      </dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="text-body1 text-gray-500 w-12">가격</dt>
                      <dd className="text-body1">
                        {formatPrice(event.price)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  type="button"
                  onClick={handleReserve}
                  className="self-end flex items-center justify-center gap-2 bg-[#4357AE] text-white rounded-full py-2 pl-7 pr-6 text-body1"
                >
                  예매하기 &gt;
                </button>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-subtitle1 mb-3">상세 설명</h2>
              <div className="border rounded-2xl py-7 px-10 flex flex-col items-center justify-center gap-4">
                <p className="text-body2 text-gray-600 whitespace-pre-line leading-relaxed">
                  {event.description || "상세 설명이 없습니다."}
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Detail;
