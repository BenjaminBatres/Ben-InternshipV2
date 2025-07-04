
import React, { useEffect, useState } from "react";
import Logo from "/public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import { RiBallPenLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { PiTextAaBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../redux/counterSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/init";



export default function Sidebar({ isOpen, setOpen }) {
  const pathname = usePathname();
  const slicePathname = pathname.slice(0, 7);
  const increaseFontSize = useSelector(state => state.counter.fontSize)
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [isLogin, setIsLogin] = useState(false)

  

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }

  function logOut() {
    signOut(auth)
    setUser({})
    setIsLogin(false)

  }

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsLogin(true)
      }
    })
  }, [])

  return (
    <>
      <div
        className={`sidebar__overlay ${
          isOpen ? "" : "sidebar__overlay--hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`sidebar ${isOpen ? "sidebar--opened" : "sidebar--closed"}`}
      >
        <div className="sidebar__logo">
          <Image src={Logo} alt="logo"></Image>
        </div>
        <div
          className="sidebar__wrapper"
          style={{
            height: `${
              slicePathname === '/player' ? 'calc(-140px + 100vh)' : ''
            }`
          }}
        >
          <div className="sidebar__top">
            <Link href={"/for-you"} className="sidebar__link--wrapper">
              <div
                className={`sidebar__link--line ${
                  pathname === "/for-you" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineHome />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <Link href={"/library"} className="sidebar__link--wrapper">
              <div className={`sidebar__link--line ${
                  pathname === "/library" ? "active--tab" : ""
                }`}></div>
              <div className="sidebar__icon--wrapper">
                <RiBookmarkLine />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <RiBallPenLine />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <IoSearch />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
            {slicePathname === "/player" ? (
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                <div className={`sidebar__link--text sidebar__font--size-icon ${increaseFontSize === 16 ? 'sidebar__font--size-icon--active': ''}`} onClick={() => dispatch(incrementByAmount(16))}>
                  <PiTextAaBold className="sidebar__font--size-icon-small" />
                </div>
                <div className={`sidebar__link--text sidebar__font--size-icon ${increaseFontSize === 18 ? 'sidebar__font--size-icon--active': ''}`} onClick={() => dispatch(incrementByAmount(18))}>
                  <PiTextAaBold className="sidebar__font--size-icon-medium " />
                </div>
                <div className={`sidebar__link--text sidebar__font--size-icon ${increaseFontSize === 22 ? 'sidebar__font--size-icon--active': ''}`}onClick={() => dispatch(incrementByAmount(22))}>
                  <PiTextAaBold className="sidebar__font--size-icon-large" />
                </div>
                <div className={`sidebar__link--text sidebar__font--size-icon ${increaseFontSize === 24 ? 'sidebar__font--size-icon--active': ''}`}onClick={() => dispatch(incrementByAmount(24))}>
                  <PiTextAaBold className="sidebar__font--size-icon-xlarge" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="sidebar__bottom">
            <Link href={"/settings"} className="sidebar__link--wrapper">
              <div
                className={`sidebar__link--line ${
                  pathname === "/settings" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <GoGear />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaRegQuestionCircle />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            {isLogin ? (
              <div className="sidebar__link--wrapper"onClick={logOut}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaArrowRightFromBracket />
              </div>
              <div className="sidebar__link--text">Logout</div>
            </div>
            ): (
            <div className="sidebar__link--wrapper"onClick={toggleModal}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FaArrowRightFromBracket />
              </div>
              <div className="sidebar__link--text">Login</div>
            </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
}
