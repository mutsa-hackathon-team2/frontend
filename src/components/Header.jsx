import { Link } from "react-router";
import profileIcon from "../assets/icons/profile.svg";
import { handleKakaoLogin } from "../utils/kakaoLogin";
import logoIcon from "../assets/icons/logo.svg";

function Header() {
  const loginMemberId = sessionStorage.getItem("loginMemberId");
  const isLoggedIn = Boolean(loginMemberId);

  return (
    <header className="flex w-full items-center justify-between px-12 py-5 bg-[#F1F1F1] rounded-100">
      <Link to="/" className="flex items-center">
        <img src={logoIcon} alt="" className="h-6 w-26" />
      </Link>

      <button
        type="button"
        disabled={isLoggedIn}
        onClick={isLoggedIn ? undefined : handleKakaoLogin}
        className={`flex items-center gap-2 rounded-100 border-0 bg-white px-5 py-2 ${
          isLoggedIn ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <img src={profileIcon} alt="" className="size-6" />
        <span className="text-subtitle2">
          {isLoggedIn ? "내 계정" : "log in"}
        </span>
      </button>
    </header>
  );
}

export default Header;
