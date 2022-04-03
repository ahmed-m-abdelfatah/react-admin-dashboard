import { createContext, useReducer } from 'react';
import darkModeReducer from './darkModeReducer.js';

const initialState = {
  darkMode: false,
};

export const DarkModeContext = createContext(initialState);

export const DarkModeContextProvider = ({ children }) => {
  let dark;
  if (localStorage.getItem('dark')) {
    dark = localStorage.getItem('dark');
  } else {
    dark = localStorage.setItem('dark', initialState.darkMode);
  }

  const [state, dispatch] = useReducer(darkModeReducer, {
    ...initialState,
    darkMode: dark,
  });

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
