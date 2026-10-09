import { useNavigate } from "react-router-dom";

export default function FloatingAIButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chat")}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-blue-600 px-5 py-3 text-white shadow-xl transition hover:scale-105 hover:bg-blue-700"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl">
        🤖
      </span>

      <span className="hidden font-semibold sm:block">
        Hỏi AI
      </span>
    </button>
  );
}