"use client";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaRegStar } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { LuBookOpenText } from "react-icons/lu";
import SkeletonBox from "../../components/ui/SkeletonBox";
import { useRouter } from "next/navigation";
import Searchbar from "../../components/Searchbar";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../../firebase/init";
import Auth from "../../components/ui/Auth";
import SaveButton from "../../components/SaveButton";
import { getPremiumStatus } from "../../components/ui/GetPremiumStatus";

export default function page({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }

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

    fetchBook();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [id, app, auth.currentUser?.uid]);

  return (
    <div className="wrapper">
      <Searchbar />
      <Auth />
      <div className="row">
        <audio
          src={selectedBook?.audioLink}
          ref={audioRef}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
        ></audio>
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">
                {isLoading ? <Skeleton /> : selectedBook?.title}{" "}
                <span>
                  {selectedBook?.subscriptionRequired ? "(Premium)" : ""}
                </span>
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
                        {formatTime(duration)}
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
                    {isLogin ? (
                      <>
                        {selectedBook?.subscriptionRequired ? (
                          <>
                            {isPremium ? (
                              <>
                                <button
                                  className="inner-book__read--btn"
                                  onClick={() => router.push(`/player/${id}`)}
                                >
                                  <div className="inner-book__read--icon">
                                    <LuBookOpenText />
                                  </div>
                                  <span>Read</span>
                                </button>
                                <button
                                  className="inner-book__read--btn"
                                  onClick={() => router.push(`/player/${id}`)}
                                >
                                  <div className="inner-book__read--icon">
                                    <IoMicOutline />
                                  </div>
                                  <span>Listen</span>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="inner-book__read--btn"
                                  onClick={() => router.push(`/choose-plan`)}
                                >
                                  <div className="inner-book__read--icon">
                                    <LuBookOpenText />
                                  </div>
                                  <span>Read</span>
                                </button>
                                <button
                                  className="inner-book__read--btn"
                                  onClick={() => router.push(`/choose-plan`)}
                                >
                                  <div className="inner-book__read--icon">
                                    <IoMicOutline />
                                  </div>
                                  <span>Listen</span>
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              className="inner-book__read--btn"
                              onClick={() => router.push(`/player/${id}`)}
                            >
                              <div className="inner-book__read--icon">
                                <LuBookOpenText />
                              </div>
                              <span>Read</span>
                            </button>
                            <button
                              className="inner-book__read--btn"
                              onClick={() => router.push(`/player/${id}`)}
                            >
                              <div className="inner-book__read--icon">
                                <IoMicOutline />
                              </div>
                              <span>Listen</span>
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          className="inner-book__read--btn"
                          onClick={toggleModal}
                        >
                          <div className="inner-book__read--icon">
                            <LuBookOpenText />
                          </div>
                          <span>Read</span>
                        </button>
                        <button
                          className="inner-book__read--btn"
                          onClick={toggleModal}
                        >
                          <div className="inner-book__read--icon">
                            <IoMicOutline />
                          </div>
                          <span>Listen</span>
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="inner-book__bookmark">
                {isLoading ? (
                  <SkeletonBox width={"20%"} height={"2rem"} />
                ) : (
                  <SaveButton
                    selectedBook={{
                      id: selectedBook?.id,
                      title: selectedBook?.title,
                      author: selectedBook?.author,
                      subTitle: selectedBook?.subTitle,
                      imageLink: selectedBook?.imageLink,
                      averageRating: selectedBook?.averageRating,
                      audioLink: selectedBook?.audioLink,
                    }}
                  />
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
