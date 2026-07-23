import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Chip from "../components/Chip.jsx";
import ListCard from "../components/ListCard.jsx";
import profileIcon from "../assets/icons/profile.svg";

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <main className="px-25 pt-10">
        <section>
          <div className="flex flex-wrap items-center gap-4 bg-amber-300">
            <Chip className="bg-white">전체</Chip>
            <Chip className="bg-white">전시</Chip>
            <Chip className="bg-white">공연</Chip>
            <Chip className="bg-white">행사</Chip>
            <Chip className="bg-white">
              <span>oooo</span>
              <img src={profileIcon} className="size-6" />
            </Chip>
          </div>
        </section>

        <section className="mt-10">
          <ListCard onClick={() => navigate("/detail")} />
        </section>

        <h1 className="text-heading">홈화면~~</h1>
        <p className="text-body2">body2</p>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate("/detail")}
        >
          상세 페이지로 이동
        </button>
      </main>
    </div>
  );
}

export default Main;
