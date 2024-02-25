import React, { useState, useEffect } from "react";

export const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      {images.map((image, i) => (
        <img
          key={i}
          className={i === index ? "visible" : "hidden"}
          src={URL.createObjectURL(image)}
          alt={`Image ${i + 1}`}
        />
      ))}
    </div>
  );
};
