import { useState, useEffect, useRef, useCallback } from "react";
interface UseCountdownProps {
  initialSeconds: number;
  onComplete?: () => void;
}
export const useCountDown = ({
  initialSeconds,
  onComplete,
}: UseCountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          setIsRunning(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onComplete]);
  const pause = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newSeconds?: number) => {
      pause();
      setSecondsLeft(newSeconds ?? initialSeconds);
    },
    [initialSeconds, pause],
  );
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return { secondsLeft, minutes, seconds, isRunning, start, pause, reset };
};
