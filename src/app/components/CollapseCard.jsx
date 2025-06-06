import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function CollapseCard({ title, children, setHeight }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="accordion__card">
      <div className="accordion__header" onClick={toggleCollapse}>
        <div className="accordion__title">{title}</div>

        <IoIosArrowDown
          className={
            isOpen
              ? "accordion__icon--rotate accordion__icon"
              : "accordion__icon"
          }
        />
      </div>
      <div
        className={`${isOpen ? "collapse show" : "collapse"}`}
        style={{ height: isOpen ? setHeight || "72px"  : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
