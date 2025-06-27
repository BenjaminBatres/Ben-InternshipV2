"use client";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import Numbers from "./components/Numbers";
import Footer from "./components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/init";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/for-you");
      }
    });
  }, []);

  return (
    <>
      <NavBar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </>
  );
}
