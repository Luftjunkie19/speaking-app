import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { localStoredDataActions } from "../reducer/LocalStorage";
import SpeakingTouchPile from "./SpeakingTouchPile";

function TilesHolder() {
  const localStored = useSelector((state) => state.localStored.tiles);

  const dispatch = useDispatch();

  const languages = window.speechSynthesis.getVoices();

  const speakTileText = (tile, language) => {
    const selectedTile = localStored.find((stored) => stored.id === tile.id);

    const selectedIndex = localStored.findIndex(
      (item) => item.id === selectedTile.id
    );

    if (!window.speechSynthesis.speaking) {
      // Create a copy of the localStored array
      const updatedArray = [...localStored];

      // Update the isClicked property of the selectedTile
      updatedArray[selectedIndex] = { ...selectedTile, isClicked: true };

      dispatch(localStoredDataActions.updateStorage(updatedArray));

      const tileSpeech = new SpeechSynthesisUtterance(selectedTile.text);

      if (languages) {
        const objectLang = languages.find((lang) => lang.name === language);

        if (objectLang) {
          tileSpeech.voice = objectLang;
        }
      }

      tileSpeech.onend = () => {
        // Create another copy of the localStored array
        let updatedArrayAfterSpeechEnd = [...localStored];

        // Update the isClicked property of the selectedTile back to false using splice
        updatedArrayAfterSpeechEnd.splice(selectedIndex, 1, {
          ...selectedTile,
          isClicked: false,
        });

        // Update the state with the modified copy
        dispatch(
          localStoredDataActions.updateStorage(updatedArrayAfterSpeechEnd)
        );
      };

      // Speak the tile after all event handlers are set
      window.speechSynthesis.speak(tileSpeech);
    } else {
      return;
    }
  };

  return (
    <>
      {localStored && localStored.length > 0 && (
        <p className="font-thin text-3xl">Here are your tiles:</p>
      )}

      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-6">
        {localStored &&
          localStored.map((tile) => (
            <SpeakingTouchPile
              key={tile.text}
              language={tile.selectedVoice}
              title={tile.title}
              isClicked={tile.isClicked}
              speakFunction={() => {
                speakTileText(tile, tile.selectedVoice);
              }}
            />
          ))}
      </div>
    </>
  );
}

export default TilesHolder;
