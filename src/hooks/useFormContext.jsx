import { useContext } from "react";

import { FormContext } from "../reducer/FormContext";

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
