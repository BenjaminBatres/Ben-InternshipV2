"use client";
import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { LuClock3 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { app, auth } from "../firebase/init";
import { getPremiumStatus } from "./ui/GetPremiumStatus";
import { onAuthStateChanged } from "firebase/auth";

export default function BookCarousel({ books }) {
  const [duration, setDuration] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  const audioRef = useRef(null);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  function formatTime(time) {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const premium = await getPremiumStatus(app);
        setIsPremium(premium);
      } else {
        setIsPremium(false);
      }
    });

    return () => unsubscribe();
  }, [app, auth.currentUser?.uid]);
  return (
    <div className="for-you__recommended--books">
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          440: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={5}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {books?.map((book) => (
          <SwiperSlide key={book?.id}>
            <Link
              href={`/book/${book.id}`}
              className="for-you__recommended--books-link"
            >
              {isPremium === false && book.subscriptionRequired && (
                <div className="book__pill">Premium</div>
              )}
              <audio
                src={book.audioLink}
                ref={audioRef}
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
              ></audio>
              <figure
                className="book__image--wrapper"
                style={{ marginBottom: "8px" }}
              >
                <img src={book.imageLink} alt="" className="book__image" />
              </figure>
              <div className="recommended__book--title">{book.title}</div>
              <div className="recommended__book--author">{book.author}</div>
              <div className="recommended__book--sub-title">
                {book.subTitle}
              </div>
              <div className="recommended__book--details-wrapper">
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <LuClock3 />
                  </div>
                  <div className="recommended__book--details-text">
                    {formatTime(duration)}
                  </div>
                </div>
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <FaRegStar />
                  </div>
                  <div className="recommended__book--details-text">
                    {book.averageRating}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
