import { useEffect, useRef, useState } from "react";

function useTimer(initialTime, isPaused, onComplete, onRunning) {
  const [seconds, setSeconds] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(initialTime)
  }, [initialTime]);
  useEffect(() => {
    if (seconds === 0 && !isPaused) {
      onComplete()
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(seconds => seconds - 1)
        onRunning()
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPaused, seconds])


  const resetTimer = (newTime) => {
    setSeconds(newTime);
    clearInterval(intervalRef.current);
  };

  return { seconds, resetTimer };
}

export default useTimer;
