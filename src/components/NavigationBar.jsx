import React from "react";

import { FaPlus } from "react-icons/fa";

import { useFormContext } from "../hooks/useFormContext";

function NavigationBar() {
  const { isOpened, dispatch } = useFormContext();

  const toggleState = () => {
    if (isOpened) {
      dispatch({ type: "CLOSED" });
    } else {
      dispatch({ type: "OPENED" });
    }
  };

  return (
    <div className="p-2 flex justify-between bg-blue-500 text-white">
      <p className="text-3xl">Ride&Speak</p>

      <button className="btn" onClick={toggleState}>
        <FaPlus /> Add
      </button>
    </div>
  );
}

export default NavigationBar;
