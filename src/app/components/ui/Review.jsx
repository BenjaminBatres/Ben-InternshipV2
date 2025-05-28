import { FaStar } from "react-icons/fa";
export default function Review({ title, stars, body }) {
  return (
    <div className="review">
      <div className="review__header">
        <span>{title}</span>
        <div className="review__stars">
          {new Array(Math.floor(stars)).fill(0).map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>
      <div className="review__body">
        {body.map((para, index) =>
          typeof para === "string" ? (
            <span key={index}>{para}</span>
          ) : (
            <span key={index} className="bold">
              {para.bold}
            </span>
          )
        )}
      </div>
    </div>
  );
}
