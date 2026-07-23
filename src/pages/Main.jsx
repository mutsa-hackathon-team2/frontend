import { useNavigate } from "react-router";

function Main() {
  const navigate = useNavigate();

  return (
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
  );
}

export default Main;
