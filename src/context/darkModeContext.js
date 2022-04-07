import { createContext, useContext, useReducer } from 'react';

const DarkModeContext = createContext();

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

const localStorageDarkModeData = localStorage.getItem('dark');
let darkModeInitialState = JSON.parse(localStorageDarkModeData) || false;

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

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, darkModeInitialState);

  return (
    <DarkModeContext.Provider value={{ state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
