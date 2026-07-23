import { Route, Routes } from "react-router";
import Main from "./pages/Main.jsx";
import Detail from "./pages/Detail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}

export default App;
