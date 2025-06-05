"use client";

import Image from "next/image";
import Logo from "/public/assets/logo.png";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from 'next/navigation'


export default function NavBar() {
  const router = useRouter()
  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
      return document.body.classList.remove("modal--open");
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }

  return (
    <div className="wrapper wrapper__full">
      <div className="sidebar__overlay--hidden sidebar__overlay"></div>
      <div className="auth__wrapper">
        <div className="auth">
          <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
            <button className="btn guest__btn--wrapper" onClick={() => router.push('/for-you')}>
              <figure className="google__icon--mask guest__icon--mask">
                <IoPerson />
              </figure>
              <span>Login as a Guest</span>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <button className="btn google__btn--wrapper">
              <figure className="google__icon--mask">
                <FcGoogle />
              </figure>
              <span>Login with Google</span>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <form className="auth__main--form">
              <input
                type="text"
                className="auth__main--input"
                placeholder="Email Address"
              />
              <input
                type="text"
                className="auth__main--input"
                placeholder="Password"
              />
              <button className="btn">Login</button>
            </form>
          </div>
          <div className="auth__forgot--password">Forgot your password?</div>
          <button className="auth__switch--btn">Don't have an account?</button>
          <div className="auth__close--btn" onClick={toggleModal}>
            <FaXmark />
          </div>
        </div>
      </div>
      <nav>
        <div className="nav__wrapper">
          <div className="nav__img--mask">
            <Image priority="true" src={Logo} alt="logo" className="nav__img" />
          </div>
          <ul className="nav__list--wrapper">
            <li className="nav__list--login" onClick={toggleModal}>
              Login
            </li>
            <li className="nav__list">About</li>
            <li className="nav__list">Contact</li>
            <li className="nav__list">Help</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
