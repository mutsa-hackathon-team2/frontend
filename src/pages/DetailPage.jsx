import { useParams, useNavigate } from "react-router";
import { mockEvents } from "../data/mockEvents";
import Chip from "../components/Chip";
import Header from "../components/Header";

const categoryColorMap = {
  공연: "bg-[#43AE73] text-white",
  전시: "bg-[#23CBD3] text-white",
  행사: "bg-[#EB3D40] text-white",
  디데이: "bg-[#4357AE] text-white",
};

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = mockEvents.find((e) => String(e.id) === id);

  if (!event) {
    return (
      <>
        <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
        <main className="max-w-5xl mx-auto py-6">
          <p className="text-body1">행사 정보를 찾을 수 없어요.</p>
        </main>
      </>
    );
  }

  const handleReserve = () => {
    console.log("예매하기 클릭:", event.id);
  };

  return (
    <>
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <main className="max-w-5xl mx-auto py-6">
        <button onClick={() => navigate("/")} className="mb-6 text-2xl" aria-label="뒤로가기">
          ‹
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 이미지 */}
          <div className="w-full md:w-80 md:h-[480px] h-96 bg-gray-200 rounded-lg overflow-hidden shrink-0">
            {event.imageUrl && (
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
            )}
          </div>

          {/* 상세 정보 */}
          <div className="flex-1 flex flex-col justify-between md:h-[480px]">
            <div>
              <Chip className={`mb-3 w-fit ${categoryColorMap[event.category] ?? "bg-gray-200 text-gray-700"}`}>
                {event.category}
              </Chip>
              <h1 className="text-title mb-4">{event.title}</h1>

              <dl className="space-y-2">
                <div className="flex gap-4">
                  <dt className="text-body1 text-gray-500 w-12">장소</dt>
                  <dd className="text-body1">{event.place}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-body1 text-gray-500 w-12">날짜</dt>
                  <dd className="text-body1">{event.date}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-body1 text-gray-500 w-12">시간</dt>
                  <dd className="text-body1">{event.time}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-body1 text-gray-500 w-12">가격</dt>
                  <dd className="text-body1">{event.price}</dd>
                </div>
              </dl>
            </div>

            <button
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
              {event.description}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Detail;