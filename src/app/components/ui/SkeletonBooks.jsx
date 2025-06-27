import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonBooks({ bookCards }) {
  return Array(bookCards)
    .fill(0)
    .map((_, id) => (
      <div className="recommended__books--skeleton" key={id}>
        <SkeletonBox width={"100%"} height={"240px"} marginBottom={"8px"} />
        <div className="recommended__book--title">
          {<SkeletonBox width={"100%"} height={"1.2rem"} />}
        </div>
        <div className="recommended__book--author">
          {<SkeletonBox width={"95%"} height={"1rem"} />}
        </div>
        <div className="recommended__book--sub-title">
          {<SkeletonBox width={"80%"} height={"2rem"} />}
        </div>
        <div className="recommended__book--details-wrapper">
          <SkeletonBox width={"95%"} height={"1rem"} />
        </div>
      </div>
    ));
}
