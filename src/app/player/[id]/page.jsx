"use client";
import AudioPlayer from "@/app/components/AudioPlayer";
import SkeletonBox from "@/app/components/ui/SkeletonBox";
import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function page({ params }) {
  const { id } = React.use(params);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  }, [id]);
  return (
    <div className="wrapper">
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize: "16px" }}>
          {isLoading ? (
            <div className="audio__book--spinner">
              <ImSpinner8 />
            </div>
          ) : (
            <>
              <div className="audio__book--summary-title">
                {selectedBook?.title}
              </div>
              <div className="audio__book--summary-text">
                {selectedBook?.summary}
              </div>
            </>
          )}
        </div>
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
      </div>
    </div>
  );
}
