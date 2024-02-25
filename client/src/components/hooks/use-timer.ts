import React from "react";

interface UseTimerProps {
  timeout: number;
  callback: () => void;
}

const useTimer = ({ timeout, callback }: UseTimerProps) => {
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      callback && callback();
    }, timeout);
  };

  React.useEffect(() => {
    resetTimer();

    // Return a cleanup function that clears the timer when the component unmounts
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [timeout]); // eslint-disable-line react-hooks/exhaustive-deps

  return { resetTimer };
};

export default useTimer;
