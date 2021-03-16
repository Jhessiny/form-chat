import React, { useState } from "react";
import "./Rating.css";

function Rating({ handleStarClick, selectedStar }) {
  const [stars, setStars] = useState([{}, {}, {}, {}, {}]);
  const handleClick = (index) => {
    handleStarClick(index);
    const rtStars = [...stars];
    rtStars[index] = { checked: true };
    setStars(rtStars);
  };

  return (
    <div>
      <div className="rating-form">
        {stars.map((star, index) => (
          <div className="star-box" key={"star-" + index}>
            <span htmlFor={"star-" + index} onClick={() => handleClick(index)}>
              <i
                className={`form-star lni lni-star-filled ${
                  index <= selectedStar ? "star-active" : ""
                }`}
              ></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rating;
