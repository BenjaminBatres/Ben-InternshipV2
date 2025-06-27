"use client";
import React, { useState } from "react";
import PlanFeatures from "../components/ui/PlanFeatures";
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import CollapseCard from "../components/CollapseCard";
import Footer from "../components/Footer";
import Auth from "../components/ui/Auth";
import { getCheckoutUrl } from "../components/ui/StripePayment";
import { app, auth } from "../firebase/init";
import { useRouter } from "next/navigation";
export default function page() {
  const [activePlanCard, setActivePlanCard] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let isModalOpen = false;
  function toggleModal() {
    if (isModalOpen) {
      isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
  }
  const setActiveCard = (index) => {
    setActivePlanCard(index);
  };

  const upgradeToPremium = async () => {
    const priceId = "price_1Rcpx94KeWD3ZbKTmhdcXbiF";
    const user = auth.currentUser;
    setLoading(true);
    if (!user) {
      toggleModal();
      return;
    }

    try {
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
    } catch (err) {
      console.error("Failed to redirect:", err);
    } finally {
      setLoading(false);
    }
  };

  const upgradeToPremiumMonthly = async () => {
    const priceId = "price_1RcsUq4KeWD3ZbKTaR0mkIla";
    const user = auth.currentUser;
    setLoading(true);
    if (!user) {
      toggleModal();
      return;
    }

    try {
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
    } catch (err) {
      console.error("Failed to redirect:", err);
    } finally {
      setLoading(false);
    }
  };
  const planFeatures = [
    {
      icon: <AiFillFileText />,
      text: [{ bold: "Key ideas in few min " }, "with many books to read"],
    },
    {
      icon: <RiPlantFill />,
      text: [{ bold: "3 million " }, "people growing with Summarist everyday"],
    },
    {
      icon: <FaHandshake />,
      text: [
        { bold: "Precise recommendations " },
        "collections curated by experts",
      ],
    },
  ];
  return (
    <div className="wrapper wrapper__full">
      <Auth />
      <div className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">
              Get unlimited access to many amazing books to read
            </div>
            <div className="plan__sub--title">
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className="plan__img--mask">
              <img
                src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1080&q=75"
                alt=""
              />
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="plan__features--wrapper">
              {planFeatures.map((feature, index) => (
                <PlanFeatures key={index} {...feature} />
              ))}
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            <div
              className={`plan__card ${
                activePlanCard === 1 ? "plan__card--active" : ""
              }`}
              onClick={() => setActiveCard(1)}
            >
              <div className="plan__card--circle">
                <div
                  className={`${activePlanCard === 1 ? "plan__card--dot" : ""}`}
                ></div>
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--text">
                  7-day free trial included
                </div>
              </div>
            </div>
            <div className="plan__card--separator">
              <div className="plan__separator">or</div>
            </div>
            <div
              className={`plan__card ${
                activePlanCard === 2 ? "plan__card--active" : ""
              }`}
              onClick={() => setActiveCard(2)}
            >
              <div className="plan__card--circle">
                <div
                  className={`${activePlanCard === 2 ? "plan__card--dot" : ""}`}
                ></div>
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">Premium Plus Monthly</div>
                <div className="plan__card--price">$9.99/month</div>
                <div className="plan__card--text">No trial included</div>
              </div>
            </div>
            <div className="plan__card--cta">
              <span className="btn--wrapper">
                {activePlanCard === 1 ? (
                  <button
                    className="btn"
                    style={{ width: "300px" }}
                    onClick={upgradeToPremium}
                    disabled={loading}
                  >
                    <>
                      {loading ? (
                        <span className="loader"></span>
                      ) : (
                        "Start your free 7-day trail"
                      )}
                    </>
                  </button>
                ) : (
                  <button
                    className="btn"
                    style={{ width: "300px" }}
                    onClick={upgradeToPremiumMonthly}
                    disabled={loading}
                  >
                    <>
                      {loading ? (
                        <span className="loader"></span>
                      ) : (
                        "Start your first month?"
                      )}
                    </>
                  </button>
                )}
                {/* <button
                  className="btn"
                  style={{ width: "300px" }}
                  onClick={upgradeToPremium}
                  disabled={loading}
                >
                  {activePlanCard === 1 ? (
                    <>
                      {loading ? (
                        <span className="loader"></span>
                      ) : (
                        "Start your free 7-day trail"
                      )}
                    </>
                  ) : (
                    <>
                    {loading ? (
                        <span className="loader"></span>
                      ) : (
                        "Start your first month"
                      )}
                    </>
                  )}
                </button> */}
              </span>
              <div className="plan__disclaimer">
                {activePlanCard === 1 ? (
                  <span>
                    Cancel your trial at any time before it ends, and you won’t
                    be charged.
                  </span>
                ) : (
                  <span>30-day money back guarantee, no questions asked.</span>
                )}
              </div>
            </div>
            <div className="faq__wrapper">
              <CollapseCard
                title={"How does the free 7-day trail work?"}
                setHeight={"96px"}
              >
                <div className="accordion__body">
                  Begin your complimentary 7-day trial with a Summarist annual
                  membership. You are under no obligation to continue your
                  subscription, and you will only be billed when the trial
                  period expires. With Premium access, you can learn at your own
                  pace and as frequently as you desire, and you may terminate
                  your subscription prior to the conclusion of the 7-day free
                  trial.
                </div>
              </CollapseCard>
              <CollapseCard
                title={
                  "Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
                }
              >
                <div className="accordion__body">
                  While an annual plan is active, it is not feasible to switch
                  to a monthly plan. However, once the current month ends,
                  transitioning from a monthly plan to an annual plan is an
                  option.
                </div>
              </CollapseCard>
              <CollapseCard title={"What's included in the Premium plan?"}>
                <div className="accordion__body">
                  Premium membership provides you with the ultimate Summarist
                  experience, including unrestricted entry to many best-selling
                  books high-quality audio, the ability to download titles for
                  offline reading, and the option to send your reads to your
                  Kindle.
                </div>
              </CollapseCard>
              <CollapseCard
                title={"Can I cancel during my trial or subscription?"}
              >
                <div className="accordion__body">
                  You will not be charged if you cancel your trial before its
                  conclusion. While you will not have complete access to the
                  entire Summarist library, you can still expand your knowledge
                  with one curated book per day.
                </div>
              </CollapseCard>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
