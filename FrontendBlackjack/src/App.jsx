import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
