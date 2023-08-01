import { createContext, useReducer } from "react";

export const FormContext = createContext();

export const formReducer = (state, action) => {
  switch (action.type) {
    case "OPENED":
      return { ...state, isOpened: true };
    case "CLOSED":
      return { ...state, isOpened: false };
    default:
      return state;
  }
};

export default function FormContextProvider({ children }) {
  const [status, dispatch] = useReducer(formReducer, {
    isOpened: false,
  });

  return (
    <FormContext.Provider value={{ ...status, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}
