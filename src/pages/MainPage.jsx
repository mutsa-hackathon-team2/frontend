import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Chip from "../components/Chip.jsx";
import ListCard from "../components/ListCard.jsx";
import plusIcon from "../assets/icons/plus.svg";
import { getEvents } from "../apis/eventApi.js";

const categories = ["전체", "전시", "공연", "행사", "무료"];

function formatDDay(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const days = Number(value);

  if (Number.isNaN(days)) {
    return String(value);
  }

  if (days === 0) {
    return "D-Day";
  }

  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
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

function Main() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const eventList = await getEvents({ signal: controller.signal });
        setEvents(eventList);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setErrorMessage(
            error.message || "행사 목록을 불러오는 중 문제가 발생했습니다.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => controller.abort();
  }, [requestKey]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "전체") {
      return events;
    }

    if (selectedCategory === "무료") {
      return events.filter(
        (event) =>
          event.categoryName === selectedCategory || Number(event.price) === 0,
      );
    }

    return events.filter(
      (event) => event.categoryName === selectedCategory,
    );
  }, [events, selectedCategory]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <div className="flex w-360 flex-col px-40 py-16 gap-16">
        <h1 className="text-heading">오늘의 CULTURE PICK</h1>

        <section className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <Chip
                    key={category}
                    as="button"
                    type="button"
                    aria-pressed={isSelected}
                    className={
                      isSelected
                        ? "bg-[#4357AE] text-white"
                        : "bg-[#F1F1F1]"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Chip>
                );
              })}
            </div>

            <Chip
              as="button"
              type="button"
              className="bg-[#4357AE]"
              onClick={() => navigate("/register")}
            >
              <img src={plusIcon} className="size-6" />
              <span className="text-white">추가하기</span>
            </Chip>
          </div>

          {isLoading && (
            <p className="py-20 text-center text-body1 text-[#69788A]" role="status">
              행사 목록을 불러오고 있어요.
            </p>
          )}

          {!isLoading && errorMessage && (
            <div className="flex flex-col items-center gap-4 py-20">
              <p className="text-body1 text-[#69788A]">{errorMessage}</p>
              <button
                type="button"
                className="rounded-100 bg-[#4357AE] px-7 py-2 text-body2 text-white"
                onClick={() => setRequestKey((key) => key + 1)}
              >
                다시 시도
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && filteredEvents.length === 0 && (
            <p className="py-20 text-center text-body1 text-[#69788A]">
              등록된 행사가 없어요.
            </p>
          )}

          {!isLoading && !errorMessage && filteredEvents.length > 0 && (
            <div className="grid w-full grid-cols-3 justify-items-center gap-5">
              {filteredEvents.map((event) => (
                <ListCard
                  key={event.id}
                  imageSrc={event.posterUrl || undefined}
                  category={event.categoryName}
                  dDay={formatDDay(event.dday ?? event.dDay)}
                  price={formatPrice(event.price)}
                  title={event.title}
                  onClick={() => navigate(`/detail/${event.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Main;
