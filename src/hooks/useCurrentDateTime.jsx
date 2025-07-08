import { useEffect, useState } from "react";

const useCurrentDateTime = (sliceEnd = 19, live = true) => {
  const getFormattedDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, sliceEnd).replace("T", " ");
  };

  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    if (!live) return;

    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [live, sliceEnd]);

  return dateTime;
};

export default useCurrentDateTime;
