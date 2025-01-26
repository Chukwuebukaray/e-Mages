import React from "react";
import "./RenderedImage.css";

const RenderedImage = ({ images }) => {
  return (
    <div className="facedetect">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
        />
      ))}
    </div>
  );
};

export default RenderedImage;
