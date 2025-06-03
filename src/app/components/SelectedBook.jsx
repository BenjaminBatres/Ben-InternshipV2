import Link from "next/link";
import React from "react";
import { IoPlay } from "react-icons/io5";

export default function SelectedBook({ book }) {
  return (
    <Link href={`/book/${book.id}`} className="selected__book" key={book.id}>
      <div className="selected__book--sub-title">{book.subTitle}</div>
      <div className="selected__book--line"></div>
      <div className="selected__book--content">
        <figure
          className="book__image--wrapper"
          style={{ height: "140px", width: "140px", minWidth: "140px" }}
        >
          <img src={book.imageLink} alt="" className="book__image" />
        </figure>
        <div className="selected__book--text">
          <div className="selected__book--title">{book.title}</div>
          <div className="selected__book--author">{book.author}</div>
          <div className="selected__book--duration-wrapper">
            <div className="selected__book--icon">
              <IoPlay />
            </div>
            <div className="selected__book--duration">3 mins 23 secs</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
