import React from "react";

function SpeakingTouchPile({ title, language, speakFunction, isClicked }) {
  return (
    <div
      className={`p-10 relative top-0 left-0 rounded-md cursor-pointer transition-all  ${
        isClicked
          ? "bg-red-500 text-white -translate-y-1 shadow-md shadow-white"
          : "bg-white text-black"
      }`}
      onClick={speakFunction}
    >
      <p>{title}</p>
      <small>{language}</small>
    </div>
  );
}

export default SpeakingTouchPile;
