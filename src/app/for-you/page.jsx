"use client";
import { useEffect, useState } from "react";
import SelectedBook from "../components/SelectedBook";
import RecommendedBooks from "../components/RecommendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";
import SkeletonBox from "../components/ui/SkeletonBox";
import Searchbar from "../components/Searchbar";

export default function page() {
  const [selectedBook, setSelectedBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  return (
    <div className="wrapper">
      <Searchbar />
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
            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you'll like these
              </div>
              <div className="for-you__recommended--books">
                <RecommendedBooks
                  title={
                    "How to Win Friends and Influence People in the Digital Age"
                  }
                  subTitle={"Time-tested advice for the digital age"}
                  author={"Dale Carnegie"}
                  id={"5bxl50cz4bt"}
                  rating={4.4}
                  duration={"03:24"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-win-friends-and-influence-people.png?alt=media&token=099193aa-4d85-4e22-8eb7-55f12a235fe2"
                  }
                  isLoading={isLoading}
                />
                <RecommendedBooks
                  title={"Can’t Hurt Me"}
                  subTitle={"Master Your Mind and Defy the Odds"}
                  author={"David Goggins"}
                  id={"2l0idxm1rvw"}
                  rating={4.2}
                  duration={"04:52"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fcant-hurt-me.png?alt=media&token=026646b0-40f8-48c4-8d32-b69bd5b8f700"
                  }
                  isLoading={isLoading}
                />
                <RecommendedBooks
                  title={"Mastery"}
                  subTitle={
                    "Myths about genius and what it really means to be great"
                  }
                  author={"Robert Greene"}
                  id={"4t0amyb4upc"}
                  rating={4.3}
                  duration={"04:40"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fmastery.png?alt=media&token=c41aac74-9887-4536-9478-93cd983892af"
                  }
                  subscription={true}
                  isLoading={isLoading}
                />
                <RecommendedBooks
                  title={"Atomic Habits"}
                  subTitle={
                    "An Easy & Proven Way to Build Good Habits & Break Bad Ones"
                  }
                  author={"Leil Lowndes"}
                  id={"g2tdej27d23"}
                  rating={4.3}
                  duration={"03:24"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fatomic_habits.png?alt=media&token=51401979-e7cc-40c4-87fa-3b27d1fe761b"
                  }
                  subscription={true}
                  isLoading={isLoading}
                />
                <RecommendedBooks
                  title={"How to Talk to Anyone"}
                  subTitle={"92 Little Tricks for Big Success in Relationships"}
                  author={"Leil Lowndes"}
                  id={"18tro3gle2p"}
                  rating={4.6}
                  duration={"03:22"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-talk-to-anyone.png?alt=media&token=48f77463-a093-42b4-8f1f-82fa4edd044c"
                  }
                  isLoading={isLoading}
                  subscription={true}
                />
              </div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <div className="for-you__recommended--books">
                <SuggestedBooks
                  id={"hyqzkhdyq7h"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fzero-to-one.png?alt=media&token=0c64bbe6-4e9e-4a0e-adc9-9e218dd12402"
                  }
                  title={"Zero to One"}
                  author={"Peter Thiel with Blake Masters"}
                  subTitle={"Notes on Startups, or How to Build The Future"}
                  duration={"03.24"}
                  rating={4.3}
                  isLoading={isLoading}
                  subscription={true}
                />
                <SuggestedBooks
                  id={"6ncszvwbl4e"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Frich-dad-poor-dad.png?alt=media&token=dc226e0c-fd89-4897-9605-9603e04a9966"
                  }
                  title={"Rich Dad, Poor Dad"}
                  author={"Robert T. Kiyosaki"}
                  subTitle={
                    "What the Rich Teach Their Kids about Money – That the Poor and the Middle Class Do Not!"
                  }
                  duration={"05.38"}
                  rating={4.5}
                  isLoading={isLoading}
                  subscription={true}
                />
                <SuggestedBooks
                  id={"vt4i7lvosz"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-10x-rule.png?alt=media&token=1e766af7-97ec-4bb8-969f-95ca35cf1d68"
                  }
                  title={"The 10X Rule"}
                  author={"Grant Cardone"}
                  subTitle={"The Only Difference Between Success and Failure"}
                  duration={"03.18"}
                  rating={4.5}
                  isLoading={isLoading}
                  subscription={true}
                />
                <SuggestedBooks
                  id={"g80xtszllo9"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fdeep-work.png?alt=media&token=3a857c13-f374-4c82-b134-fef5a01c202e"
                  }
                  title={"Deep work"}
                  author={"Robert T. Kiyosaki"}
                  subTitle={"Rules for Focused Success in a Distracted World"}
                  duration={"02.50"}
                  rating={4.3}
                  isLoading={isLoading}
                  subscription={true}
                />
                <SuggestedBooks
                  id={"6ctat6ynzqp"}
                  imageLink={
                    "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-five-second-rule.png?alt=media&token=8d6d24fd-11c8-425d-b7f0-3ae1499192db"
                  }
                  title={"The 5 Second Rule"}
                  author={"Mel Robbins"}
                  subTitle={
                    "Transform Your Life, Work, and Confidence with Everyday Courage"
                  }
                  duration={"02.45"}
                  rating={4.3}
                  isLoading={isLoading}
                  subscription={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
