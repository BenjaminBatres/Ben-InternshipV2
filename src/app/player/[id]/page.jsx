"use client";
import AudioPlayer from "../../components/AudioPlayer";
import Searchbar from "../../components/Searchbar";
import SkeletonBox from "../../components/ui/SkeletonBox";
import { auth } from "../../firebase/init";
import { incrementByAmount } from "../../redux/counterSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import LoginImg from "/public/assets/login.png";
import Image from "next/image";
import Auth from "../../components/ui/Auth";

export default function page({ params }) {
  const { id } = React.use(params);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const increaseFontSize = useSelector((state) => state.counter.fontSize);
  const dispatch = useDispatch();

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
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
    dispatch(incrementByAmount(16));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [id]);
  return (
    <div className="wrapper">
      <Searchbar />
      <Auth />
      <div className="summary">
        {isLoading ? (
          <div className="audio__book--spinner">
            <ImSpinner8 />
          </div>
        ) : (
          <div
            className="audio__book--summary"
            style={{ fontSize: increaseFontSize || 16 }}
          >
            <div className="audio__book--summary-title">
              {selectedBook?.title}
            </div>

            {isLogin ? (
              <div className="audio__book--summary-text">
                {selectedBook?.summary}
              </div>
            ) : (
              <div className="settings__login--wrapper">
                <Image src={LoginImg} alt="logo" />
                <div className="settings__login--text">
                  Log in to your account to read and listen to the book
                </div>
                <button
                  className="btn settings__login--btn"
                  onClick={toggleModal}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
        {isLogin ? (
          <div className="audio__wrapper">
            <audio src={selectedBook?.audioLink}></audio>
            <div className="audio__track--wrapper">
              <figure className="auido__track--image-mask">
                <figure
                  className="book__image--wrapper"
                  style={{ height: "48px", width: "48px", minWidth: "48px" }}
                >
                  {isLoading ? (
                    <SkeletonBox width={"100%"} height={"50px"} />
                  ) : (
                    <img
                      src={selectedBook?.imageLink}
                      alt="book"
                      className="book__image"
                      style={{ display: "block" }}
                    />
                  )}
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div className="audio__track--title">
                  {selectedBook?.title || (
                    <SkeletonBox width={"75px"} height={"1.5rem"} />
                  )}
                </div>

                <div className="audio__track--author">
                  {selectedBook?.author || (
                    <SkeletonBox width={"100px"} height={"1.5rem"} />
                  )}
                </div>
              </div>
            </div>
            <AudioPlayer src={selectedBook?.audioLink} book={selectedBook} />
          </div>
        ) : (
          <div className="audio__wrapper">
            <audio src={selectedBook?.audioLink}></audio>
            <div className="audio__track--wrapper">
              <figure className="auido__track--image-mask">
                <figure
                  className="book__image--wrapper"
                  style={{ height: "48px", width: "48px", minWidth: "48px" }}
                >
                  {isLoading ? (
                    <SkeletonBox width={"100%"} height={"50px"} />
                  ) : (
                    <img
                      src={selectedBook?.imageLink}
                      alt="book"
                      className="book__image"
                      style={{ display: "block" }}
                    />
                  )}
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div className="audio__track--title">
                  {selectedBook?.title || (
                    <SkeletonBox width={"75px"} height={"1.5rem"} />
                  )}
                </div>

                <div className="audio__track--author">
                  {selectedBook?.author || (
                    <SkeletonBox width={"100px"} height={"1.5rem"} />
                  )}
                </div>
              </div>
            </div>
            <AudioPlayer src={selectedBook?.audioLink} />
          </div>
        )}
      </div>
    </div>
  );
}