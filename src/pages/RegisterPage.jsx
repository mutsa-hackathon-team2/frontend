import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import leftArrowIcon from "../assets/icons/leftArrow.svg";
import imageIcon from "../assets/icons/image.svg";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex w-full flex-col items-start px-25 pt-5">
        <Header />
      </div>
      <div className="flex w-360 flex-col px-40 py-16 gap-16">
        <img
          src={leftArrowIcon}
          className="cursor-pointer size-10"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-row gap-28.75 px-23.75">
          <div className="flex h-88.5 w-66.25 shrink-0 flex-col items-center justify-center rounded-16 bg-[#E6E8EB]">
            <img src={imageIcon} alt="" className="size-32.75" />
          </div>
          <div className="flex w-137.5 shrink-0 flex-col gap-7">
            <div className="flex flex-col">
              <span>제목</span>
              <input></input>
            </div>
            <div className="flex flex-col">
              <span>카테고리</span>
              <input></input>
            </div>
            <div className="flex flex-col">
              <span>장소</span>
              <input></input>
            </div>
            <div>날짜</div>
            <div>시간</div>
            <div>가격</div>
            <div>상세 설명</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
