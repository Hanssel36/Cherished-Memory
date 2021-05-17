import React, {createContext, useContext, useState} from 'react';

const FontContext = createContext();

const FontProvider = ({children}) => {
  const [myfont, setFont] = useState('Default');
  const [myFontSize, setMyFontSize] = useState(20);

  const contextValue = {
    myfont,
    setFont,
    myFontSize,
    setMyFontSize,
  }

  return (

  <FontContext.Provider value={contextValue}>
    {children}
  </FontContext.Provider>
  );
}

const useFont = () => useContext(FontContext);

export {
    FontContext,
    FontProvider,
    useFont,
}