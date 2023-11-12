import React from "react";
import "./FoodCard.scss";

const FoodCard = ({ currentItems, handlePromotion }) => {
  const StarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="currentColor"
      className="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 12.314l-5.225 3.042 1.003-5.828L.334 5.644l5.85-.853L8 0l2.816 4.79 5.85.853-3.444 3.884 1.003 5.828z" />
    </svg>
  );

  return (
    <div className="foodCard">
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((food) => (
          <div key={food.id}>
            <div
              className="foodCard-image"
              style={{ backgroundImage: `url(${food.imageUrl})` }}
            >
              <div className="promotionCode">
                {food.promotion ? (
                  <span className="">
                    {handlePromotion(food.promotion)}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="foodCard-nameBlock">
              <div>{food.name}</div>
            </div>
            <div className="foodCard-detailBlock">
              <div>
             <span className="foodCard-star" >{StarIcon}</span>   { food.rating.toFixed(1)}
              </div>
              <div>
                {food.minCookTime}-{food.minCookTime} min
              </div>
              <div className="foodCard-newTag">{food.isNew ? "New" : ""}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No matching results...</div>
      )}
    </div>
  );
};

export default FoodCard;
