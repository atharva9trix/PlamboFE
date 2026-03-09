import React, { createContext, useContext, useState } from "react";
import AppAlert from "../../ui/components/AppAlert";

const AlertContext = createContext(null);

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "OK",
    cancelText: "Cancel",
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = (title, message) => {
    setAlert({
      open: true,
      title,
      message,
      confirmText: "OK",
      cancelText: "",
      onConfirm: () => closeAlert(),
      onCancel: null,
    });
  };

  const closeAlert = () => setAlert((prev) => ({ ...prev, open: false }));

  const value = { alert, showAlert, closeAlert, setAlert };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AppAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        onConfirm={alert.onConfirm}
        onCancel={alert.onCancel}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}