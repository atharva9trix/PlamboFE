import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext(null);

export function useAppState() {
  return useContext(AppStateContext);
}

export function AppStateProvider({ children }) {
  const [activeMode, setActiveMode] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const goHome = (navigate, clearMessages) => {
    setActiveMode(null);

    if (clearMessages) {
      clearMessages([]);
    }

    if (navigate) navigate("/");
  };

  return (
    <AppStateContext.Provider
      value={{
        activeMode,
        setActiveMode,
        sessionId,
        setSessionId,
        goHome,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
