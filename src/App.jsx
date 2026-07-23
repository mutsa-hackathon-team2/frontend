import { Route, Routes } from "react-router";
import Detail from "./pages/DetailPage.jsx";
import Main from "./pages/MainPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;