"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Auth from "../components/ui/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../firebase/init";
import Image from "next/image";
import LoginImg from "/public/assets/login.png";
import SkeletonBox from "../components/ui/SkeletonBox";
import Link from "next/link";
import { getPremiumStatus } from "../components/ui/GetPremiumStatus";

export default function page() {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

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
        setUser(user);
        setLoading(false);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        setLoading(false);
      }
    });

    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);
  return (
    <div className="wrapper">
      <Searchbar />
      <Auth />
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          {loading ? (
            <>
              <div className="setting__content">
                <div className="settings__sub--title">
                  <SkeletonBox width={"150px"} height={"1.5rem"} />
                </div>
                <div className="settings__text">
                  <SkeletonBox width={"200px"} height={"1.5rem"} />
                </div>
              </div>
              <div className="setting__content">
                <div className="settings__sub--title">
                  <SkeletonBox width={"150px"} height={"1.5rem"} />
                </div>
                <div className="settings__text">
                  <SkeletonBox width={"200px"} height={"1.5rem"} />
                </div>
              </div>
            </>
          ) : (
            <>
              {isLogin ? (
                <>
                  <div className="setting__content">
                    <div className="settings__sub--title">
                      Your Subscription plan
                    </div>
                    <div className="settings__text">
                      {isPremium ? "Preimum" : "Basic"}
                    </div>
                    {isPremium ? (
                      ""
                    ) : (
                      <Link
                        href={"/choose-plan"}
                        className="btn settings__upgrade--btn"
                      >
                        Upgrade to Premium
                      </Link>
                    )}
                  </div>
                  <div className="setting__content">
                    <div className="settings__sub--title">Email</div>
                    <div className="settings__text">{user.email}</div>
                  </div>
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
