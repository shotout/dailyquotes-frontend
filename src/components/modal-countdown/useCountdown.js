import {useState, useEffect} from 'react';

const useCountdown = isVisible => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0 && isVisible) {
      const interval = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (!isVisible) {
      setCount(5);
    }
  }, [count, isVisible]);

  return count;
};

export default useCountdown;
