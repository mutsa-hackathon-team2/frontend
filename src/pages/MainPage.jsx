import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <main>
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
