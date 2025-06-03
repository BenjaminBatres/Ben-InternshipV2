import Link from "next/link";
import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";

export default function SuggestedBooks({
  id,
  imageLink,
  title,
  subTitle,
  author,
  duration,
  rating,
}) {
  return (
    <Link href={`/book/${id}`} className="for-you__recommended--books-link ">
      <figure className="book__image--wrapper" style={{ marginBottom: "8px" }}>
        <img src={imageLink} alt="" className="book__image" />
      </figure>
      <div className="recommended__book--title">{title}</div>
      <div className="recommended__book--author">{author}</div>
      <div className="recommended__book--sub-title">{subTitle}</div>
      <div className="recommended__book--details-wrapper">
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
      </div>
    </Link>
  );
}
