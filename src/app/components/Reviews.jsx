import React from "react";
import Review from "./ui/Review";

export default function Reviews() {
  const reviews = [
    {
      title: "Hanna M.",
      stars: 5,
      body: [
        "This app has been a ",
        { bold: "game-changer" },
        " for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
      ],
    },
    {
      title: "David B.",
      stars: 5,
      body: [
        "I love this app! It provides ",
        { bold: " concise and accurate summaries " },
        " of books in a way that is easy to understand. It's also very user-friendly and intuitive.",
      ],
    },
    {
      title: "Nathan S.",
      stars: 5,
      body: [
        "This app is a great way to get the main takeaways from a book without having to read the entire thing. ",
        { bold: "The summaries are well-written and informative." },
        " Definitely worth downloading.",
      ],
    },
    {
      title: "Ryan R.",
      stars: 5,
      body: [
        "If you're a busy person who ",
        { bold: "loves reading but doesn't have the time " },
        " to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.",
      ],
    },
  ];
  return (
    <div className="row">
      <div className="container">
        <div className="section__title">What our members say</div>
        <div className="reviews__wrapper">
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
        <div className="reviews__btn--wrapper">
          <button className="btn home__cta--btn">Login</button>
        </div>
      </div>
    </div>
  );
}
