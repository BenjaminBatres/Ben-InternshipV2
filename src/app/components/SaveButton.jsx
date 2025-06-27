import { useEffect, useState } from "react";
import { auth } from "../firebase/init"; // your firebase config
import { db } from "../firebase/init";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function SaveButton({ selectedBook }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }

  const handleSaveToggle = async () => {
    if (!user || !selectedBook?.id) {
      toggleModal()
      return;
    }

    const docRef = doc(db, "users", user.uid, "library", selectedBook.id);
    setLoading(true);

    try {
      if (isSaved) {
        await deleteDoc(docRef);
        setIsSaved(false);
      } else {
        await setDoc(docRef, selectedBook);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error updating library:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkIfBookIsSaved = async () => {
      if (!user || !selectedBook?.id) return;

      try {
        const docRef = doc(db, "users", user.uid, "library", selectedBook.id);
        const docSnap = await getDoc(docRef);
        setIsSaved(docSnap.exists());
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    checkIfBookIsSaved();
  }, [user, selectedBook]);

  return (
    <button
      onClick={handleSaveToggle}
      disabled={loading}
      className="inner-book__bookmark"
    >
      {loading ? (
        "Processing"
      ) : isSaved ? (
        <>
          <div className="inner-book__bookmark--icon">
            <FaBookmark />
          </div>
          <div className="inner-book__bookmark--text">
            Saved in My Library
          </div>
        </>
      ) : (
        <>
          <div className="inner-book__bookmark--icon">
            <FaRegBookmark />
          </div>
          <div className="inner-book__bookmark--text">
            Add title to my Library
          </div>
        </>
      )}
    </button>
  );
}
