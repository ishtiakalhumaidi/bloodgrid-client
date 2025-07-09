import { useEffect, useState } from "react";

const useCurrentDateTime = (type = "full", live = true) => {
  const getFormattedDateTime = () => {
    const now = new Date();
    if (type === "date") {
      return now.toLocaleString().split(',')[0];
    } else if(type=="time"){
      return now.toLocaleString().split(',')[1];
    } else{
      return now.toLocaleString()
    }
  };

  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    if (!live) return;

    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [live]);

  return dateTime;
};

export default useCurrentDateTime;
