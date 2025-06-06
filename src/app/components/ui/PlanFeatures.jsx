import React from "react";
export default function PlanFeatures({icon, text}) {
  return (
    <>
        <div className="plan__feature">
          <figure className="plan__features--icon">{icon}</figure>
          <div className="plan__features--text">{text.map((txt, index) => (
            typeof txt === 'string' ? (
              <span key={index}>{txt}</span>
            ) : (
              <span key={index} className="bold">{txt.bold}</span>
            )
          ))}</div>
        </div>

    </>
  );
}
