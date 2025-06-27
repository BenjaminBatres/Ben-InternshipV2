"use client";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";



export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchBooks(searchTerm);
      } else {
        setBooks([]); // clear results if input is empty
      }
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  async function fetchBooks(query) {
    const res = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`
    );
    const data = await res.json();
    setBooks(data);
  }

  return (
    <>
      <div className="search__background">
        <div className="search__wrapper">
          <figure>
            <img src="logo.png" alt="" />
          </figure>
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  type="text"
                  className="search__input"
                  placeholder="Search for books"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search__icon" >
                  {searchTerm && books.length > 0 ? <FaXmark /> : <IoSearch />}
                  
                </div>
              </div>
            </div>
            <div
              className="sidebar__toggle--btn"
              onClick={() => setOpen(!open)}
            >
              <RxHamburgerMenu />
            </div>
          </div>
          {searchTerm && books.length > 0 && (
            <div className="search__books--wrapper">

                {books.map((book) => (
                  <Link
                    href={`/book/${book.id}`}
                    className="search__book--link"
                    key={book.id}
                  >
                    <audio src={book.audioLink}></audio>
                    <figure
                      className="book__image--wrapper"
                      style={{ height: "80px", width: "80px", minWidth: "80px" }}
                    >
                      <img src={book.imageLink} className="book__image" />
                    </figure>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                    </div>
                  </Link>
                ))}
                
            </div>
          )}
        </div>
      </div>
      <Sidebar isOpen={open} setOpen={setOpen} />
    </>
  );
}
