import { useEffect, useState } from "react";
import "./ImageModal.css";
import googleicon from "../assets/googleicon.webp";
import unsplashicon from "../assets/unsplashicon.png";

const ImageModal = ({ imageId, onClose }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      if (imageId) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.unsplash.com/photos/${imageId}?client_id=${
              import.meta.env.VITE_API_KEY
            }`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setImageData(data);
        } catch (err) {
          setError(err);
          console.error("Error fetching image data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setImageData(null);
      }
    };

    fetchImageData();
  }, [imageId]);

  if (!imageId) {
    return null;
  }

  if (loading) {
    return <div className="modal loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (imageData && imageData.urls) {
    return (
      <div
        className="modal"
        onClick={(e) => {
          if (e.target.className === "modal") {
            onClose();
          }
        }}
      >
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="image-container">
            <img
              src={imageData.urls.full}
              alt={imageData.alt_description || "Image"}
            />
          </div>
          <div className="image-details">
            <text className="description">
              {imageData.description || "No description available"}
            </text>{" "}
            <p className="photographer">
              Photographer:{" "}
              <a
                href={`https://www.google.com/search?q=${imageData.user?.name}`}
                target="_blank"
              >
                {imageData.user?.name || "Unknown"}{" "}
                <img src={googleicon} width="15px" />
              </a>
            </p>
            <div className="bottom">
              <a
                href={imageData.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Unsplash <img src={unsplashicon} width="10px" />
              </a>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageModal;
