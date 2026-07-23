import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.js";

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }

  return auth;
}
