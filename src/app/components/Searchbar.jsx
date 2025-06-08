"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";

export default function Searchbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="search__background">
        <div className="search__wrapper">
          <figure>
            <img src="logo" alt="" />
          </figure>
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  type="text"
                  className="search__input"
                  placeholder="Search for books"
                />
                <div className="search__icon">
                  <IoSearch />
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
        </div>
      </div>
      <Sidebar isOpen={open} setOpen={setOpen} />
    </>
  );
}
