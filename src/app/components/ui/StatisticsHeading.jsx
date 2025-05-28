import { useEffect, useState } from "react";

export default function StatisticsHeading({ sentences, interval = 2500 }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, interval);

    return () => clearInterval(timer);
  }, [sentences.length, interval]);
  return (
    <div className="statistics__content--header">
      {sentences.map((sentence, index) => (
        <div
          key={index}
          className={`statistics__heading ${
            activeIndex === index
              ? "statistics__heading--active"
              : "statistics__heading"
          }`}
        >
          {sentence}
        </div>
      ))}
    </div>
  );
}
