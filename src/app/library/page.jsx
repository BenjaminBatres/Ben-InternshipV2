"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/init";
import Auth from "../components/ui/Auth";
import LibraryBooks from "../components/LibraryBooks";
import SkeletonBooks from "../components/ui/SkeletonBooks";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import LoginImg from "/public/assets/login.png";
import SkeletonBox from "../components/ui/SkeletonBox";
export default function page() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function getAllPosts() {
          const user = auth.currentUser;
          try {
            const { docs } = await getDocs(
              collection(db, "users", user.uid, "library")
            );
            const books = docs.map((elem) => elem.data());
            setSavedBooks(books);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching saved books", error);
          }
        }
        async function getAllFinishedBooks() {
          const user = auth.currentUser;
          try {
            const { docs } = await getDocs(
              collection(db, "users", user.uid, "finished")
            );
            const books = docs.map((elem) => elem.data());
            setFinishedBooks(books);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching saved books", error);
          }
        }
        getAllFinishedBooks();
        getAllPosts();
        setIsLogin(true);
      } else {
        setSavedBooks([]);
        setFinishedBooks([]);
        setLoading(false);
        setIsLogin(false);
        return;
      }
    });
  }, []);
  return (
    <div className="wrapper">
      <Searchbar />
      <Auth />
      <div className="row">
        <div className="container">
          <div className="for-you__title">Saved Books</div>
          {loading ? (
            <>
              <div className="for-you__sub--title">
                <SkeletonBox width={"100px"} height={"1.5rem"} />
              </div>
              <div className="recommended__books--skeleton-wrapper">
                <SkeletonBooks bookCards={6} />
              </div>

              <div className="for-you__sub--title">
                <SkeletonBox width={"100px"} height={"1.5rem"} />
              </div>
              <div className="recommended__books--skeleton-wrapper">
                <SkeletonBooks bookCards={6} />
              </div>
            </>
          ) : (
            <>
              {isLogin ? (
                <>
                  <div className="for-you__sub--title">
                    {savedBooks.length} items
                  </div>
                  {savedBooks.length > 0 ? (
                    <LibraryBooks books={savedBooks} />
                  ) : (
                    <div className="finished__books--block-wrapper">
                      <div className="finished__books--title">
                        Save your favorite books!
                      </div>
                      <div className="finished__books--sub-title">
                        When you save a book, it will appear here.
                      </div>
                    </div>
                  )}
                  <div className="for-you__title">Finished</div>
                  <div className="for-you__sub--title">
                    {finishedBooks.length} items
                  </div>
                  {finishedBooks.length > 0 ? (
                    <LibraryBooks books={finishedBooks} />
                  ) : (
                    <div className="finished__books--block-wrapper">
                      <div className="finished__books--title">
                        Done and dusted!
                      </div>
                      <div className="finished__books--sub-title">
                        When you finish a book, you can find it here later.
                      </div>
                    </div>
                  )}
                </>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
