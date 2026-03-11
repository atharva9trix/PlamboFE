import React from "react";
import { AlertProvider } from "../context/AlertContext";
import { AppStateProvider } from "../context/AppStateContext";
import { ClientProvider } from "../context/ClientContext";
import { ChatProvider } from "../context/ChatContext";
import { AuthProvider } from "../context/AuthContext";

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <AlertProvider>
        <AppStateProvider>
          <ClientProvider>
            <ChatProvider>
              {children}
              </ChatProvider>
          </ClientProvider>
        </AppStateProvider>
      </AlertProvider>
    </AuthProvider>
  );
}