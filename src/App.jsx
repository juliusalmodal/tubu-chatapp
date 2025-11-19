import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./ChatPage";

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/chat/jules" replace />} />

      {/* Chat pages */}
      <Route path="/chat/:userId" element={<ChatPage />} />

      {/* Not found */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}