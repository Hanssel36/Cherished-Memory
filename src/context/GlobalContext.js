import React, {createContext, useContext, useReducer} from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({reducer, initialState, children}) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);
const useGlobal = () => useContext(GlobalContext);

export {
    GlobalContext,
    GlobalProvider,
    useGlobal,
}