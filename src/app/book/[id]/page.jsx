"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaRegStar } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { LuBookOpenText } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import SkeletonBox from "@/app/components/ui/SkeletonBox";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const { id } = React.use(params);
  const router = useRouter()

  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setSelectedBook(data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setIsLoading(false);
      }
    }
    const durations = {
      "5bxl50cz4bt": "03:24",
      "2l0idxm1rvw": "04:52",
      "4t0amyb4upc": "04:40",
      "g2tdej27d23": "03:24",
      "18tro3gle2p": "03:22",
      "hyqzkhdyq7h": "03:24",
      "6ncszvwbl4e": "05:38",
      "vt4i7lvosz": "03:18",
      "g80xtszllo9": "02:50",
      "6ctat6ynzqp": "02:45",
    };
    if (durations[id]) {
      setDuration(durations[id])
    }

    fetchBook();
  }, [id]);

  return (
    <div className="wrapper">
      <div className="row">
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">
                {isLoading ? <Skeleton /> : selectedBook?.title}
              </div>
              <div className="inner-book__author">
                {isLoading ? <Skeleton /> : selectedBook?.author}
              </div>
              <div className="inner-book__sub--title">
                {isLoading ? <Skeleton /> : selectedBook?.subTitle}
              </div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  {isLoading ? (
                    <SkeletonBox width={"100%"} height={"3.4rem"} />
                  ) : (
                    <>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          {isLoading || <FaRegStar />}
                        </div>
                        <div>{selectedBook.averageRating}&nbsp;</div>
                        <div>
                          ({selectedBook.totalRating || <Skeleton />} ratings)
                        </div>
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <LuClock3 />
                        </div>
                        {duration}
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <IoMicOutline />
                        </div>
                        {selectedBook.type}
                      </div>
                      <div className="inner-book__description">
                        <div className="inner-book__icon">
                          <HiOutlineLightBulb />
                        </div>
                        {selectedBook.keyIdeas} Key Ideas
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
                {isLoading ? (
                  <SkeletonBox width={"30%"} height={"3rem"} />
                ) : (
                  <>
                    <button className="inner-book__read--btn" onClick={() => router.push(`/player/${id}`)}>
                      <div className="inner-book__read--icon">
                        <LuBookOpenText />
                      </div>
                      <span>Read</span>
                    </button>
                    <button className="inner-book__read--btn" onClick={() => router.push(`/player/${id}`)}>
                      <div className="inner-book__read--icon">
                        <IoMicOutline />
                      </div>
                      <span>Listen</span>
                    </button>
                  </>
                )}
              </div>
              <div className="inner-book__bookmark">
                {isLoading ? (
                  <SkeletonBox width={"20%"} height={"2rem"} />
                ) : (
                  <>
                    <div className="inner-book__bookmark--icon">
                      <FaRegBookmark />
                    </div>
                    <div className="inner-book__bookmark--text">
                      Add title to my Library
                    </div>
                  </>
                )}
              </div>
              <div className="inner-book__secondary--title">
                What's it about?
              </div>

              <div className="inner-book__tags--wrapper">
                {isLoading ? (
                  <SkeletonBox height={"3rem"} width={"40%"} />
                ) : (
                  <>
                    {selectedBook?.tags?.map((tag, i) => (
                      <div key={i} className="inner-book__tag">
                        {tag}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="inner-book__book--description">
                {isLoading ? (
                  <SkeletonBox width={"100%"} height={"7rem"} />
                ) : (
                  selectedBook?.bookDescription
                )}
              </div>
              <div className="inner-book__secondary--title">
                About the Author
              </div>
              <div className="inner-book__author--description">
                {isLoading ? (
                  <SkeletonBox width={"100%"} height={"7.5rem"} />
                ) : (
                  selectedBook?.authorDescription
                )}
              </div>
            </div>
            <div className="inner-book--img-wrapper ">
              <figure
                className="book__image--wrapper"
                style={{ height: "300px", width: "300px", minWidth: "300px" }}
              >
                {isLoading ? (
                  <SkeletonBox width={"100%"} height={"300px"} />
                ) : (
                  <img
                    src={selectedBook.imageLink}
                    alt="book"
                    className="book__image"
                    style={{ display: "block" }}
                  />
                )}
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
