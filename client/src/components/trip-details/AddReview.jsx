import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const [stars, setStars] = useState(3);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("the default title");

  const { id: tripId } = useParams();

  function submit() {
    console.log(localStorage.getItem("token"));
    fetch(import.meta.env.VITE_BACKEND + "/trips/trip/" + tripId + "/reviews", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        rating: stars,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="pt-10">
      <h1 className="heading">attach your review</h1>
      <div className="mt-4 flex-center-between">
        <h1 className="text-xl font-semibold">Rating</h1>
        <div className="flex-align-center gap-x-3">
          {Array.apply(null, { length: 5 }).map((_, i) => (
            <button
              onClick={() => setStars(i + 1)}
              key={i}
              className="text-secondaryYellow"
            >
              {i < stars ? <FaStar /> : <FaRegStar />}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <textarea
          name=""
          id=""
          rows="4"
          className="outline-none w-full p-2 border border-slate-300 dark:border-dark bg-slate-200 dark:bg-card-dark rounded-lg"
          placeholder="Write your detail review here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex-align-center gap-x-4 justify-end">
          <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-card-dark dark:hover:bg-hover-color-dark">
            cancel
          </button>
          <button onClick={submit} className="btn btn-primary">
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
