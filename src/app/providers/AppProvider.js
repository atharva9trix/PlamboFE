import React from "react";
import { AlertProvider } from "../context/AlertContext";
import { AppStateProvider } from "../context/AppStateContext";
import { ClientProvider } from "../context/ClientContext";
import { ChatProvider } from "../context/ChatContext";

export function AppProvider({ children }) {
  return (
    <AlertProvider>
      <AppStateProvider>
        <ClientProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ClientProvider>
      </AppStateProvider>
    </AlertProvider>
  );
}