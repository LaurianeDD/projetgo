import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem('user'),
  user: localStorage.getItem('user'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('action: ', action);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}