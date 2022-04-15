import { createContext, useContext, useEffect, useReducer } from 'react';

// Start reducer function
export const loginCase = 'LOGIN';
export const logoutCase = 'LOGOUT';

function authReducer(state, action) {
  switch (action.type) {
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
const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
};

// Create context
const AuthContext = createContext(initialState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
