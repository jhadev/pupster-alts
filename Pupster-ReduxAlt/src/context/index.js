import React, { createContext, useContext, useReducer } from 'react';

// create context
export const StateContext = createContext();
// component that wraps children with the context provider and accepts useReducer as value for Provider
export const Global = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// custom hook to use global state context in any component
export const useGlobalState = () => useContext(StateContext);
