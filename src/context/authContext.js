import { createContext, useContext, useReducer } from 'react';

// Start reducer function
export const loginCase = 'LOGIN';
export const logoutCase = 'LOGOUT';

function authReducer(state, action) {
  switch (action) {
    case loginCase: {
      return {
        currentUser: action.payload,
      };
    }

    case logoutCase: {
      return {
        currentUser: null,
      };
    }

    default: {
      return state;
    }
  }
}

// Start context provider
// Initial state
// TODO save to local storage
const initialState = {
  currentUser: null,
};

// Create context
const AuthContext = createContext(initialState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
