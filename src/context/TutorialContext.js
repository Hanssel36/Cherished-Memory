import React, {createContext, useContext, useState} from 'react';

const TutorialContext = createContext();

const TutorialProvider = ({children}) => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const contextValue = {
    step1, setStep1, 
    step2, setStep2, 
    step3, setStep3
  }

  return (

  <TutorialContext.Provider value={contextValue}>
    {children}
  </TutorialContext.Provider>
  );
}

const useTutorial = () => useContext(TutorialContext);

export {
    TutorialContext,
    TutorialProvider,
    useTutorial,
}