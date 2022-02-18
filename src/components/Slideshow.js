import React from "react";

// Import all images from the slideshow directory.
const importAll = (r) => {
  return r.keys().map(item => r(item));
};
const slideshowImages = importAll(require.context("../images/slideshow", false, /\.jpg/));
const delay = 5000;

const Slideshow = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  // Restart the timer from 0 every time the index of the slide changes.
  // ^ Prevents when a dot is clicked multiple times, causing a glitch in transitions.
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Change the slideshow image every few seconds.
  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === (slideshowImages.length - 1)) ? 0 : prevIndex + 1 ),
    delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      {slideshowImages.map((img, i) => (
        <img
          className={`slideImage${index === i ? " active" : ""}`}
          src={img}
          alt="CoastSnap Slideshow"
          key={i}
        />
      ))}
      <div className="slideshowDots">
        {slideshowImages.map((_, i) => (
          <div
            className={`slideshowDot${index === i ? " active" : ""}`}
            onClick={() => setIndex(i)}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
