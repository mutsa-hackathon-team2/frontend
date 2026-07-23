import { Route, Routes } from "react-router";
import Main from "./pages/MainPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}

export default App;