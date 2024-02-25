import { BiGlobe, BiMap, BiPhone } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SingleHotel = ({
  id,
  title,
  image,
  price,
  rating,
  phone,
  images,
  _id,
}) => {
  return (
    <div className="bg-white group border dark:border-dark rounded-lg dark:bg-card-dark flex-1 basis-[18rem]">
      <div className="relative overflow-hidden rounded-lg sm:cursor-pointer">
        <Link to={`/trips/${id || _id}`} className="!opacity-100">
          <img
            src={image || import.meta.env.VITE_BACKEND + "/" + images[0]}
            alt={title}
            loading="lazy"
            className="w-full h-[250px] object-cover group-hover:scale-125 transition-a"
          />
        </Link>
        <div className="absolute p-2 text-white rounded-md right-2 top-2 bg-black/50">
          <h1 className="text-2xl font-bold">${price}</h1>
        </div>
      </div>
      <div className="p-3">
        <div className="flex-center-between">
          <Link to={`/trips/${id}`} className="group-hover:text-primary">
            <h1 className="text-xl font-semibold">
              {title?.length > 20 ? `${title?.slice(0, 20)}...` : title}
            </h1>
          </Link>
          {rating ? (
            <ReactStars
              size={16}
              isHalf={true}
              activeColor="#ffd700"
              value={rating}
              edit={false}
            />
          ) : (
            <span className=" text-gray">No review</span>
          )}
        </div>
        <div className="mt-3 flex-center-between">
          <div className="flex-align-center gap-x-2">
            <BiPhone />
            <p>{phone}</p>
          </div>
          {/* <span
            className={`px-2 py-[2px] text-sm ${
              open_status_text === "Open Now"
                ? "text-green-500 bg-green-500/20"
                : "text-secondaryRed bg-secondaryRed/20"
            }`}
          >
            {open_status_text}
          </span> */}
        </div>
        <div className="mt-3 flex-center-between">
          <Link
            to={`/trips/${id}/confirm-booking`}
            className="btn !py-1 border border-primary text-primary hover:bg-primary hover:text-white"
          >
            book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
