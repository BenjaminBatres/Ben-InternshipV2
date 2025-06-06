import React from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
export default function Auth() {
  const router = useRouter();
  function closeModal() {
    return document.body.classList.remove("modal--open");
  }
  return (
    <div className="auth__wrapper">
      <div className="auth">
        <div className="auth__content">
          <div className="auth__title">Log in to Summarist</div>
          <button
            className="btn guest__btn--wrapper"
            onClick={() => router.push("/for-you")}
          >
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
        <div className="auth__close--btn" onClick={closeModal}>
          <FaXmark />
        </div>
      </div>
    </div>
  );
}
