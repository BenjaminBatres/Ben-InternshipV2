import Number from "./ui/Number";
import { BiCrown } from "react-icons/bi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import { BiLeaf } from "react-icons/bi";

export default function Numbers() {
  const numberCards = [
    {
      icon: <BiCrown className="numbers__icon-svg" />,
      title: "3 Million",
      subTitle: "Downloads on all platforms",
    },
    {
      icon: [
        <FaStar key="star1" className="numbers__star--icon-svg" />,
        <FaStar key="star2" className="numbers__star--icon-svg" />,
        <FaStar key="star3" className="numbers__star--icon-svg" />,
        <FaStar key="star4" className="numbers__star--icon-svg" />,
        <FaStarHalfAlt key="starhalf" className="numbers__star--icon-svg" />,
      ],
      title: "4.5 Stars",
      subTitle: "Average ratings on iOS and Google Play",
    },
    {
      icon: <BiLeaf className="numbers__icon-svg" />,
      title: "97%",
      subTitle: "Of Summarist members create a better reading habit",
    },
  ];
  return (
    <div className="row">
      <div className="container">
        <div className="section__title">Start growing with Summarist now</div>
        <div className="numbers__wrapper">
          {numberCards.map((numberCard, index) => (
            <Number key={index} {...numberCard} />
          ))}
        </div>
      </div>
    </div>
  );
}
