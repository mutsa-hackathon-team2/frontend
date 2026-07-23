import { useParams, useNavigate } from "react-router-dom";
import { mockEvents } from "../data/mockEvents";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = mockEvents.find((e) => String(e.id) === id);

  if (!event) {
    return (
      <main className="p-6">
        <p className="text-body1">행사 정보를 찾을 수 없어요.</p>
      </main>
    );
  }

  const handleReserve = () => {
    console.log("예매하기 클릭:", event.id);
  };

  return (
    <main className="p-6">
      <button onClick={() => navigate(-1)} className="mb-6 text-2xl" aria-label="뒤로가기">
        ‹
      </button>

      <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col justify-between md:h-96">
  <div>
    <span className="inline-block text-body2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full mb-3">
      {event.category}
    </span>
    <h1 className="text-title mb-4">{event.title}</h1>
    <dl className="space-y-2">
    </dl>
  </div>
  </div>
        <div className="flex-1">
          <span className="inline-block text-body2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full mb-3">
            {event.category}
          </span>
          <h1 className="text-title mb-4">{event.title}</h1>

          <dl className="space-y-2 mb-6">
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
              <dd className="text-body1">
              </dd>
            </div>
          </dl>

          <button onClick={handleReserve} className="self-end border rounded-full px-5 py-2 text-body1">
    예매하기 &gt;
          </button>
        </div>
      </div>

      <p className="text-body2 text-gray-600 mt-10 leading-relaxed">
        {event.description}
      </p>
    </main>
  );
}

export default Detail;