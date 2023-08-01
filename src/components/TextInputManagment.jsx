import React, { useEffect, useState } from "react";

import { FaPause, FaPlay } from "react-icons/fa";

function TextInputManagement() {
  const [textToUtter, setTextToUtter] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // Zmieniono nazwę zmiennej na "isPlaying"
  const [loadingVoices, setLoadingVoices] = useState(true);

  const synth = window.speechSynthesis;
  useEffect(() => {
    const updateVoices = () => {
      const voices = synth.getVoices();
      setAvailableVoices(voices);
      setLoadingVoices(false);

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
  }, []);

  const playToUtter = () => {
    const utterance = new SpeechSynthesisUtterance(textToUtter);

    const selectedVoiceObj = availableVoices.find(
      (voice) => voice.name === selectedVoice
    );
    console.log(selectedVoiceObj);

    if (selectedVoice) {
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      } else {
        const selectedVoiceObj = availableVoices.find(
          (voice) => voice.default === true
        );
        utterance.voice = selectedVoiceObj;
      }

      if (isPlaying) {
        window.speechSynthesis.pause(utterance);
      } else {
        utterance.onresume = () => {
          window.speechSynthesis.resume(utterance);
        };
      }

      utterance.onend = () => {
        setIsPlaying(false);
      };
    }

    if (utterance.text.length === 0) {
      alert("You cannot play if you haven't written anything.");
      return;
    }

    if (!isPlaying) {
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  };

  const selectLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedVoice(selectedLanguage);
  };

  return (
    <div className="flex flex-col justify-around items-center">
      <div className="flex justify-around items-center">
        <textarea
          className="m-10 w-72 h-16 resize-none outline-none p-1 rounded-md"
          value={textToUtter}
          placeholder="Type anything..."
          onChange={(e) => setTextToUtter(e.target.value)}
        ></textarea>

        {loadingVoices ? (
          <p>Loading voices...</p>
        ) : (
          <select
            className="select select-primary w-full max-w-xs"
            onChange={selectLanguage}
            value={selectedVoice}
          >
            {availableVoices.map((voice) => (
              <option key={voice.voiceURI} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex justify-around align-center">
        <button className="btn btn-wide my-4" onClick={playToUtter}>
          {isPlaying ? (
            <>
              <FaPause /> pause
            </>
          ) : (
            <>
              <FaPlay /> play
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TextInputManagement;
