"use client";
import Image from "next/image";
import Logo from "/public/assets/logo.png";
import Auth from "./ui/Auth";

export default function NavBar() {
  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }

  return (
    <div className="wrapper wrapper__full">
      <div className="sidebar__overlay--hidden sidebar__overlay"></div>
      <Auth />
      <nav>
        <div className="nav__wrapper">
          <div className="nav__img--mask">
            <Image priority="true" src={Logo} alt="logo" className="nav__img" />
          </div>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={toggleModal}>
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
