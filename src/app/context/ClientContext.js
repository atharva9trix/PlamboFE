import React, { createContext, useContext, useEffect, useState } from "react";
import * as appService from "../../core/services/appService";
import { useAuth } from "./AuthContext";
import { useAlert } from "./AlertContext";
import { useAppState } from "./AppStateContext";

const ClientContext = createContext(null);

const PREFIX = "plambo_";

export function useClient() {
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
  const { userInfo } = useAuth();
  const { showAlert } = useAlert();
  const { setActiveMode } = useAppState();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClientState] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const redirectToHomepage = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  const selectClient = async (clientObj, store = true) => {
    if (!clientObj) return;

    setSelectedClientState(clientObj);
    setActiveMode(null);

    if (store) {
      localStorage.setItem(
        PREFIX + "selectedClient",
        JSON.stringify({
          clientId: clientObj.Id,
          timestamp: Date.now(),
        }),
      );
    }

    try {
      const proj = await appService.fetchProjects(clientObj.Client_Name);
      setProjects(proj || []);
      setSelectedProject(null);
    } catch {
      setProjects([]);
    }
  };

  const createClient = async (name) => {
    if (!name) return;

    setLoading(true);

    try {
      await appService.createClient(name);

      const updated = await appService.fetchClients();
      setClients(updated || []);

      const newClient = updated.find((c) => c.Client_Name === name);

      if (newClient) {
        await selectClient(newClient);
      }
    } catch (err) {
      showAlert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name) => {
    if (!selectedClient) {
      showAlert("Select Client", "Please select a client first.");
      return;
    }

    if (!name) return;

    setLoading(true);

    try {
      await appService.createProject(selectedClient.Client_Name, name);

      const updated = await appService.fetchProjects(
        selectedClient.Client_Name,
      );

      setProjects(updated || []);
    } catch (err) {
      showAlert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      setClients([]);
      setSelectedClientState(null);
      setProjects([]);
      setSelectedProject(null);
      return;
    }

    const loadClients = async () => {
      try {
        const data = await appService.fetchClients();
        setClients(data || []);
      } catch {
        showAlert("Error", "Failed to fetch clients");
      }
    };

    loadClients();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    if (!clients.length) return;

    const stored = localStorage.getItem(PREFIX + "selectedClient");

    if (!stored) {
      redirectToHomepage();
      return;
    }

    try {
      const { clientId } = JSON.parse(stored);

      const found = clients.find((c) => String(c.Id) === String(clientId));

      if (found) {
        selectClient(found, false);
      } else {
        localStorage.removeItem(PREFIX + "selectedClient");
        redirectToHomepage();
      }
    } catch {
      localStorage.removeItem(PREFIX + "selectedClient");
      redirectToHomepage();
    }
  }, [clients, userInfo]);

  return (
    <ClientContext.Provider
      value={{
        clients,
        selectedClient,
        setSelectedClient: selectClient,
        projects,
        selectedProject,
        setSelectedProject,
        loading,
        createClient,
        createProject,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
