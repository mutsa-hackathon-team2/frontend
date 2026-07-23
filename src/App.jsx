import { Route, Routes } from "react-router";
import Detail from "./pages/DetailPage.jsx";
import Main from "./pages/MainPage.jsx";
import Register from "./pages/RegisterPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
