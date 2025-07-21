import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/routes/HomePage";
import AboutPage from "./components/routes/AboutPage";
import NeuralTile from "./components/routes/NeuralTile";
import AIAgentUSPPage from "./pages/AIAgentUSPPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        {/* About Page Route */}
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/neuralNetwork" element={<NeuralTile />} />
        <Route path="/agentic-ai" element={<AIAgentUSPPage />} />

      </Routes>
    </Router>
  );
}
