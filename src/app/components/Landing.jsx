"use client";
import Image from "next/image";
import LandingPic from "/public/assets/landing.png";

export default function Landing() {
  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }
  return (
    <div className="container">
      <div className="row">
        <div className="landing__wrapper">
          <div className="landing__content">
            <div className="landing__content__title">
              Gain more knowledge <br /> in less time
            </div>
            <div className="landing__content__subtitle">
              Great summaries for busy people, <br /> individuals who barely
              have time to read, <br /> and even people who don’t like to read.
            </div>
            <button className="btn home__cta--btn" onClick={toggleModal}>
              Login
            </button>
          </div>
          <div className="landing__image--mask">
            <Image priority="true" src={LandingPic} alt="landing-pic"></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
