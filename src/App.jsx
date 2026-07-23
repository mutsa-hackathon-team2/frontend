import { Route, Routes } from "react-router";
import Main from "./pages/Main.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
