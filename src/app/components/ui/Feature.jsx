import { AiFillFileText } from "react-icons/ai";
import { MdLightbulb } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

export default function Feature() {
  const features = [
    {
      icon: <AiFillFileText />,
      title: "Read or listen",
      subTitle: "Save time by getting the core ideas from the best books.",
    },
    {
      icon: <MdLightbulb />,
      title: "Find your next read",
      subTitle: "Explore book lists and personalized recommendations.",
    },
    {
      icon: <FaMicrophone />,
      title: "Briefcasts",
      subTitle: "Gain valuable insights from briefcasts",
    },
  ];
  return (
    <>
      {features.map((feature, index) => (
        <div className="features" key={index}>
          <div className="features__icon">{feature.icon}</div>
          <div className="features__title">{feature.title}</div>
          <div className="features__sub--title">{feature.subTitle}</div>
        </div>
      ))}
    </>
  );
}
