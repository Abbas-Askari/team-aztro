import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Reviews = ({reviews}) => {
  const [showAll, setShowAll] = useState(false)
  return (
    <div>
      {reviews.map((review, i) => ( (showAll || i < 4) && 
        <div className="bg-white rounded-lg border p-4 mt-3 dark:bg-card-dark dark:border-dark">
          <div className="flex-align-center gap-x-2">
            <img
              src="/images/avatar.png"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="font-semibold">{review.username}</h1>
              <div className="flex-align-center gap-x-3 mt-3">
                {Array.apply(null, { length: 5 }).map((_, i) => (
                  <div key={i} className="text-secondaryYellow">
                    {i < review.rating ? <FaStar /> : <FaRegStar />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>
              {review.content}
            </p>
          </div>
        </div>
      ))}
      <div className="flex-center-center mt-4">
        <button className="btn btn-primary" onClick={() => setShowAll(!showAll)}>view {showAll ? "less" : "more"}</button>
      </div>
    </div>
  );
};

export default Reviews;
