"use client";
import { useEffect, useState } from "react";
import SelectedBook from "../components/SelectedBook";
import SkeletonBox from "../components/ui/SkeletonBox";
import Searchbar from "../components/Searchbar";
import Auth from "../components/ui/Auth";

import SkeletonBooks from "../components/ui/SkeletonBooks";
import BookCarousel from "../components/BookCarousel"

export default function page() {
  const [selectedBook, setSelectedBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedBooks, setRecommendedBooks] = useState(null);
  const [suggestedBook, setSuggestedBooks] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      const data = await res.json();
      setSelectedBook(data);
      setIsLoading(false);
    }
    fetchData();
    async function fetchRecommendedBooks() {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
      );
      const data = await res.json();
      setRecommendedBooks(data);
    }
    fetchRecommendedBooks();
    async function fetchSuggestedBooks() {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
      );
      const data = await res.json();
      setSuggestedBooks(data);
    }
    fetchSuggestedBooks();
    document.body.classList.remove("modal--open");
  }, []);

  return (
    <div className="wrapper">
      <Searchbar />
      <Auth />
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            {isLoading && (
              <SkeletonBox
                width={"calc((100% / 3) * 2)"}
                height={"200px"}
                marginBottom={"24px"}
              />
            )}
            {selectedBook.map((book) => (
              <SelectedBook book={book} key={book.id} />
            ))}
            <>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you'll like these
              </div>
              <div className="for-you__recommended--books">
                {isLoading && <SkeletonBooks bookCards={6} />}
              </div>
              <BookCarousel books={recommendedBooks}/>

              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <div className="for-you__recommended--books">
                {isLoading && <SkeletonBooks bookCards={6} />}
              </div>
               <BookCarousel books={suggestedBook}/>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
