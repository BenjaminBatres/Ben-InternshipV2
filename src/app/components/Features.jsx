"use client";
import StatisticsHeading from "./ui/StatisticsHeading";
import Feature from "./ui/Feature";
import StatisticsData from "./ui/StatisticsData";

export default function Features() {
  const sentencesOne = [
    "Enchance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

  const sentencesTwo = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Develop better parenting skills",
    "Improve your mood",
    "Maximize your abilities",
  ];

  const statisticsDataInfo = [
    {
      number: "93%",
      title: [
        "of Summarist members ",
        { bold: "significantly increase" },
        " reading frequency.",
      ],
    },
    {
      number: "96%",
      title: ["of Summarist members ", { bold: "establish better" }, " habits"],
    },
    {
      number: "90%",
      title: [
        "have made ",
        { bold: "significant positive" },
        " change to their lives.",
      ],
    },
  ];

  const statisticsDataInfo2 = [
    {
      number: "93%",
      title: [
        "of Summarist members ",
        { bold: "report feeling more productive" },
        " after incorporating the service into their daily routine.",
      ],
    },
    {
      number: "94%",
      title: [
        "of Summarist members have ",
        { bold: "noticed an improvement" },
        " in their overall comprehension and retention of information.",
      ],
    },
    {
      number: "88%",
      title: [
        "of Summarist members ",
        { bold: "feel more informed" },
        " about current events and industry trends since using the platform",
      ],
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="section__title">Understand books in few minutes</div>
        <div className="features__wrapper">
          <Feature />
        </div>
        <div className="statistics__wrapper">
          <StatisticsHeading sentences={sentencesOne} />
          <div className="statistics__content--details">
            {statisticsDataInfo.map((data, index) => (
              <StatisticsData key={index} {...data} />
            ))}
          </div>
        </div>

        <div className="statistics__wrapper">
          <div className="statistics__content--details">
            {statisticsDataInfo2.map((data, index) => (
              <StatisticsData key={index} {...data} />
            ))}
          </div>
          <StatisticsHeading sentences={sentencesTwo} />
        </div>
      </div>
    </div>
  );
}
