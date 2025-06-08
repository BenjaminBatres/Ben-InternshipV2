import Link from "next/link";
import { FaRegStar } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import SkeletonBox from "./ui/SkeletonBox";

export default function SuggestedBooks({
  id,
  imageLink,
  title,
  subTitle,
  author,
  duration,
  rating,
  subscription,
  isLoading,
}) {
  return (
    <Link href={`/book/${id}`} className="for-you__recommended--books-link ">
      {subscription ? <div className="book__pill">Premium</div> : ""}
      <figure className="book__image--wrapper" style={{ marginBottom: "8px" }}>
        {isLoading ? (
          <SkeletonBox width={"100%"} height={"100%"} />
        ) : (
          <img src={imageLink} alt="" className="book__image" />
        )}
      </figure>
      <div className="recommended__book--title">
        {isLoading ? <SkeletonBox width={"100%"} height={"1.3rem"} /> : title}
      </div>
      <div className="recommended__book--author">
        {isLoading ? <SkeletonBox width={"95%"} height={"1rem"} /> : author}
      </div>
      <div className="recommended__book--sub-title">
        {isLoading ? <SkeletonBox width={"90%"} height={"2rem"} /> : subTitle}
      </div>
      <div className="recommended__book--details-wrapper">
        {isLoading ? (
          <SkeletonBox width={"95%"} height={"1rem"} />
        ) : (
          <>
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <LuClock3 />
              </div>
              <div className="recommended__book--details-text">{duration}</div>
            </div>
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <FaRegStar />
              </div>
              <div className="recommended__book--details-text">{rating}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
