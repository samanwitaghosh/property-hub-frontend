import React, { memo, useState } from "react";
import "./propertyCard.css";

const PropertyCard = ({ property }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Normalize slides from GitHub JSON
  const slides = [];

  // Images
  if (Array.isArray(property?.images)) {
    property.images.forEach((img) => {
      if (img) slides.push({ type: "image", src: img });
    });
  }

  // Map
  if (property?.location) {
    slides.push({ type: "map", src: property.location });
  }

  // YouTube Videos (only embed links)
  if (Array.isArray(property?.youtubeVideos)) {
    property.youtubeVideos.forEach((yt) => {
      if (yt?.includes("youtube.com/embed")) {
        slides.push({ type: "youtube", src: yt });
      }
    });
  }

  // External Links (new slide type)
  if (Array.isArray(property?.externalLinks)) {
    property.externalLinks.forEach((link) => {
      if (link) slides.push({ type: "external", src: link });
    });
  }

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="property-card">
      <h2>{property?.name}</h2>
      <p>{property?.address}</p>

      {totalSlides > 0 && (
        <div className="property-carousel">
          <button className="carousel-arrow left" onClick={prevSlide}>
            &#10094;
          </button>

          {/* IMAGE */}
          {slide.type === "image" && (
            <img
              src={slide.src}
              alt={property?.name}
              className="carousel-image"
            />
          )}

          {/* MAP */}
          {slide.type === "map" && (
            <iframe
              className="carousel-image"
              src={`https://maps.google.com/maps?q=${slide.src}&z=15&output=embed`}
              title="map"
              style={{ height: "300px", width: "100%", border: 0 }}
            />
          )}

          {/* YOUTUBE */}
          {slide.type === "youtube" && (
            <iframe
              className="carousel-image"
              width="100%"
              height="300"
              src={slide.src}
              title="youtube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* EXTERNAL LINK */}
          {slide.type === "external" && (
            <div
              className="carousel-external-link"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                background: "#f2f2f2",
                borderRadius: "8px",
              }}
            >
              <a
                href={slide.src}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 20px",
                  background: "#007bff",
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Visit External Link
              </a>
            </div>
          )}

          <button className="carousel-arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      )}

      {/* PDFs */}
      {property.pdfs?.map((pdf, i) => (
        <div key={i} className="property-pdfs">
          <a href={pdf} target="_blank" rel="noopener noreferrer">
            View Brochure
          </a>
        </div>
      ))}
    </div>
  );
};

export default memo(PropertyCard);
