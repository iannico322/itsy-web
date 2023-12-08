import React, { useEffect, useState } from 'react';

const Limiter: React.FC = () => {
  const [callCount, setCallCount] = useState<number>(0);

  useEffect(() => {
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem('date');
    const storedCount = localStorage.getItem('callCount');

    if (storedDate === null || storedDate !== currentDate) {
      localStorage.setItem('date', currentDate);
      localStorage.setItem('callCount', '0');
      setCallCount(0);
    } else {
      setCallCount(parseInt(storedCount || '0'));
    }
  }, []);

  const limitedCallFunction = () => {
    if (callCount < 10) {
      // Your function logic goes here

      const newCount = callCount + 1;
      localStorage.setItem('callCount', newCount.toString());
      setCallCount(newCount);
    } else {
      console.log('No more function available.');
    }
  };

  return (
    <button onClick={limitedCallFunction}>
      Call Limited Function
    </button>
  );
};

export default Limiter;
