import React from "react";
import "./RenderedImage.css";

const RenderedImage = ({ images, onImageClick }) => {
  return (
    <div className="renderedimage">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
          onClick={() => onImageClick(image.id)}
          
        />
      ))}
    </div>
  );
};

export default RenderedImage;
