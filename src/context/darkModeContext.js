import { createContext, useContext, useReducer } from 'react';

// Start reducer function
export const actionLightCase = 'LIGHT';
export const actionDarkCase = 'Dark';
export const actionToggleCase = 'TOGGLE';

function darkModeReducer(state, action) {
  switch (action) {
    case actionLightCase:
      state = false;
      break;
    case actionDarkCase:
      state = true;
      break;
    case actionToggleCase:
      state = !state;
      break;
    default:
      break;
  }

  localStorage.setItem('dark', JSON.stringify(state));
  return state;
}

// Start context provider
// Initial state
const localStorageDarkModeData = localStorage.getItem('dark');
const darkModeInitialState = JSON.parse(localStorageDarkModeData) || false;

// Create context
const DarkModeContext = createContext(darkModeInitialState);

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, darkModeInitialState);

  return (
    <DarkModeContext.Provider value={{ state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
