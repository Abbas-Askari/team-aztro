import { useRef, useState } from "react";
import { explore } from "../data/dummyData";

const dummyImages = explore.map(e => e.image)

const ImageCarousel = ({images=dummyImages}) => {
  const [isScroll, setIsscroll] = useState(false);
  const exploreContainer = useRef(null);
  const scrollContainer = (direction) => {
    direction === "right"
      ? (exploreContainer.current.scrollLeft += 200)
      : (exploreContainer.current.scrollLeft -= 200);
    exploreContainer.current.scrollLeft > 0
      ? setIsscroll(true)
      : setIsscroll(false);
  };
  return (
    <>
      {images.length !== 0 && <div
        className="flex-align-center  gap-x-4 overflow-auto hide-scrollbar scroll-smooth p-4"
        ref={exploreContainer}
      >
        {images.map(
          (imagePath) => (
            <div
              className="hover:shadow-light-2 rounded-lg p-3 bg-white dark:bg-card-dark border dark:border-dark-light sm:cursor-pointer group flex-shrink-0 transition-shadow w-1/3"
            >
              <div className="overflow-hidden rounded-lg flex justify-center">
                <img
                  src={import.meta.env.VITE_BACKEND + "/" + imagePath}
                  // src={imagePath}
                  alt={imagePath}
                  className="h-auto w-auto object-cover group-hover:scale-125 transition-a"
                />
              </div>
              
            </div>
          )
        )}
      </div>}
    </>
  );
};

export default ImageCarousel;
