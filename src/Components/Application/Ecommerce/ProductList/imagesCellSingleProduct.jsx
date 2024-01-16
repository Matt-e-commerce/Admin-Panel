import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImagesCellSingleProduct = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentIndex(index),
  };

  // Check if there are no images available
  if (!images || images.length === 0) {
    return <p>No Image Available</p>;
  }

  if (images.length === 1) {
    return (
      <img
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
          opacity: 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        src={images[0]}
        alt="Product"
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "0 auto",
                opacity: 1,
                transition: "opacity 0.5s ease-in-out",
              }}
              src={image}
              alt={`Product ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImagesCellSingleProduct;
