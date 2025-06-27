"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { auth } from "../../firebase/init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const pathname = usePathname();

  const provider = new GoogleAuthProvider();

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        "guest@gmail.com",
        "Password"
      ).then(({ user }) => {
        setUser(user);
        if (pathname === "/") {
          router.push("/for-you");
        }
        document.body.classList.remove("modal--open");
      });
    } catch (err) {
      setError("No user found. Please Try again or Sign up");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      if (pathname === "/") {
        router.push("/for-you");
      }
      document.body.classList.remove("modal--open");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password).then(
          ({ user }) => {
            setUser(user);
            if (pathname === "/") {
              router.push("/for-you");
            }
            document.body.classList.remove("modal--open");
          }
        );
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        if (pathname === "/") {
          router.push("/for-you");
        }
        document.body.classList.remove("modal--open");
      }
    } catch (err) {
      setError("No user found. Please Try again or Sign up");
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    return document.body.classList.remove("modal--open");
  }

  return (
    <div className="auth__wrapper">
      <div className="auth">
        <div className="auth__content">
          <div className="auth__title">
            {isLogin ? "Log in to Summarist" : "Sign up to Summarist"}
          </div>
          {error && <div className="auth__error">{error}</div>}
          {isLogin && (
            <button
              className="btn guest__btn--wrapper"
              onClick={handleGuestLogin}
            >
              <figure className="google__icon--mask guest__icon--mask">
                <IoPerson />
              </figure>
              <span>Login as a Guest</span>
            </button>
          )}
          {isLogin ? (
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
          ) : (
            ""
          )}

          <button
            className="btn google__btn--wrapper"
            onClick={signInWithGoogle}
          >
            <figure className="google__icon--mask">
              <FcGoogle />
            </figure>
            <span>{isLogin ? "Login with Google" : "Sign up with Google"}</span>
          </button>

          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>

          <form className="auth__main--form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="auth__main--input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="auth__main--input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? (
                <span className="loader"></span> 
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
        {/* {isLogin && ( not implemented yet
          <div className="auth__forgot--password">Forgot your password?</div>
        )} */}

        <button
          className="auth__switch--btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </button>
        <div className="auth__close--btn" onClick={closeModal}>
          <FaXmark />
        </div>
      </div>
    </div>
  );
}
