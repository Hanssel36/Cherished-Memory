import React, {createContext, useContext, useReducer} from 'react';

const AllProfilesContext = createContext();

const AllProfilesProvider = ({reducer, initialState, children}) => (
  <AllProfilesContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AllProfilesContext.Provider>
);
const useAllProfiles = () => useContext(AllProfilesContext);

export {
    AllProfilesContext,
    AllProfilesProvider,
    useAllProfiles,
}