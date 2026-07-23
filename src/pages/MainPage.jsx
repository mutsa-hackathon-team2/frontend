import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Chip from "../components/Chip.jsx";
import ListCard from "../components/ListCard.jsx";
import plusIcon from "../assets/icons/plus.svg";

// mockdata
const cardList = [
  {
    id: 1,
    category: "공연",
    dDay: "D-4",
    date: "8. 10 ~ 8. 12",
    title: "데일리파티 여름 버스킹",
  },
  {
    id: 2,
    category: "전시",
    dDay: "D-4",
    date: "8. 10 ~ 8. 12",
    title: "홍익대학교 시각디자인 졸업전시",
  },
  {
    id: 3,
    category: "행사",
    dDay: "D-4",
    date: "8. 10 ~ 8. 12",
    title: "한양대학교 축제",
  },
  {
    id: 4,
    category: "전시",
    dDay: "D-8",
    date: "8. 14 ~ 8. 18",
    title: "디자인 졸업 작품전",
  },
  {
    id: 5,
    category: "공연",
    dDay: "D-10",
    date: "8. 16 ~ 8. 17",
    title: "한여름 밤의 음악회",
  },
  {
    id: 6,
    category: "무료",
    dDay: "D-12",
    date: "8. 18 ~ 8. 20",
    title: "모두를 위한 문화 체험",
  },
];

function Main() {
  const navigate = useNavigate();

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
              <Chip className="bg-[#F1F1F1]">전체</Chip>
              <Chip className="bg-[#F1F1F1]">전시</Chip>
              <Chip className="bg-[#F1F1F1]">공연</Chip>
              <Chip className="bg-[#F1F1F1]">행사</Chip>
              <Chip className="bg-[#F1F1F1]">무료</Chip>
            </div>

            <Chip
              className="bg-[#4357AE]"
              onClick={() => navigate("/register")}
            >
              <img src={plusIcon} className="size-6" />
              <span className="text-white">추가하기</span>
            </Chip>
          </div>

          <div className="grid w-full grid-cols-3 justify-items-center gap-5">
            {cardList.map((card) => (
              <ListCard
                key={card.id}
                category={card.category}
                dDay={card.dDay}
                date={card.date}
                title={card.title}
                onClick={() => navigate("/detail")}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
