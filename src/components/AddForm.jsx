import { useEffect, useState } from "react";

import { useFormContext } from "../hooks/useFormContext";
import { SpeakingTile } from "../Objects/SpeakingTile";

function AddForm() {
  const { isOpened, dispatch } = useFormContext();
  const [availableVoices, setAvailableVoices] = useState([]);
  const [tileText, setTileText] = useState("");
  const [tileTitle, setTileTitle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const updateVoices = () => {
      const voices = synth.getVoices();
      setAvailableVoices(voices);

      // Sprawdzenie, czy selectedVoice jest dostępny w availableVoices
      const voiceExists = voices.some((voice) => voice.name === selectedVoice);
      if (!voiceExists) {
        const defaultVoice = voices.find((voice) => voice.default === true);
        setSelectedVoice(defaultVoice ? defaultVoice.name : null);
      }
    };

    // Set initial available voices
    updateVoices();

    // Update voices when the onvoiceschanged event is triggered
    synth.onvoiceschanged = updateVoices;
  }, [selectedVoice]);

  const createNewSpeakingTile = (e) => {
    e.preventDefault();

    if (tileText.trim("").length === 0) {
      alert("Sorry, but there is no text. Fill the input please.");
      return;
    }

    const speakingTile = new SpeakingTile(
      tileTitle,
      tileText,
      selectedVoice,
      new Date().getTime()
    );

    let localStored = JSON.parse(localStorage.getItem("tiles"));

    if (localStored === null) {
      localStored = [];
      localStored.push(speakingTile);
      localStorage.setItem("tiles", JSON.stringify(localStored));
    } else {
      localStored.push(speakingTile);
      localStorage.setItem("tiles", JSON.stringify(localStored));
    }

    dispatch({ type: "CLOSED" });
  };

  return (
    <div
      className={`transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 flex bg-sky-500 p-6 flex-col justify-center items-center ${
        isOpened
          ? "block opacity-100 -translate-y-1/2 rotate-0"
          : "hidden opacity-0 -translate-y-1/4 -rotate-180"
      } rounded-md`}
    >
      <p className="text-4xl text-white mb-8">Add new Tile !</p>

      <form className="grid grid-cols-2 gap-5 justify-items-center">
        <input
          type="text"
          placeholder="Type text here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setTileTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Type text here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setTileText(e.target.value)}
        />

        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {availableVoices.map((language) => (
            <option value={language.name} key={language.voiceURI}>
              {language.name}
            </option>
          ))}
        </select>

        <button
          onClick={createNewSpeakingTile}
          className="btn btn-wide col-span-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddForm;
