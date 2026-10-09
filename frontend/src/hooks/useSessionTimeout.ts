import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT = 15 * 60 * 1000;

export default function useSessionTimeout() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const logout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });
    };

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        logout();
      }, IDLE_TIMEOUT);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);
}