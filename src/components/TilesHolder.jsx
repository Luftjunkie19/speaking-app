import React, { useEffect, useState } from "react";

import SpeakingTouchPile from "./SpeakingTouchPile";

function TilesHolder() {
  const [localStored, setLocalStored] = useState(() => {
    const storedTiles = localStorage.getItem("tiles");
    return storedTiles ? JSON.parse(storedTiles) : [];
  });

  useEffect(() => {
    // Update localStored whenever the localStorage is modified
    const handleStorageChange = () => {
      setLocalStored(JSON.parse(localStorage.getItem("tiles")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const speakTileText = (tile, language) => {
    const selectedTile = localStored.find((stored) => stored.id === tile.id);

    const selectedIndex = localStored.findIndex(
      (item) => item.id === selectedTile.id
    );

    // Create a copy of the localStored array
    const updatedArray = [...localStored];

    // Update the isClicked property of the selectedTile
    updatedArray[selectedIndex] = { ...selectedTile, isClicked: true };

    // Update the state with the modified copy
    setLocalStored(updatedArray);

    const tileSpeech = new SpeechSynthesisUtterance(selectedTile.text);

    const objectLang = window.speechSynthesis
      .getVoices()
      .find((lang) => lang.name === language);

    if (objectLang) {
      tileSpeech.voice = objectLang;
    }

    tileSpeech.onend = () => {
      // Create another copy of the localStored array
      const updatedArrayAfterSpeechEnd = [...localStored];

      // Update the isClicked property of the selectedTile back to false using splice
      updatedArrayAfterSpeechEnd.splice(selectedIndex, 1, {
        ...selectedTile,
        isClicked: false,
      });

      // Update the state with the modified copy
      setLocalStored(updatedArrayAfterSpeechEnd);
    };

    // Speak the tile after all event handlers are set
    window.speechSynthesis.speak(tileSpeech);
  };

  return (
    <>
      {localStored.length > 0 && (
        <p className="font-thin text-3xl">Here are your tiles:</p>
      )}

      <div className="grid grid-cols-5 gap-3 px-2">
        {localStored &&
          localStored.map((tile) => (
            <SpeakingTouchPile
              key={tile.text}
              language={tile.language}
              title={tile.title}
              isClicked={tile.isClicked}
              speakFunction={() => {
                speakTileText(tile, tile.language);
              }}
            />
          ))}
      </div>
    </>
  );
}

export default TilesHolder;
