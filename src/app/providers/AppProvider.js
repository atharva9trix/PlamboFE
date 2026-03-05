import React, { createContext, useContext, useEffect, useState } from "react";
import * as appService from "../../core/services/appService";
import { useAuth } from "../../app/context/AuthContext";
import AppAlert from "../../ui/components/AppAlert";

const AppContext = createContext(null);
const PREFIX = "plambo_";

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const { user } = useAuth();

  const [activeMode, setActiveMode] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClientState] = useState(null);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatSession, setCurrentChatSession] = useState(null);

  const [conversationContext, setConversationContext] = useState({
    lastEntity: null,
    lastTopic: null,
    messageHistory: [],
  });

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

  
  const redirectToHomepage = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  const goHome = (navigate) => { 
  setActiveMode(null);
  setMessages([]);
  if (navigate) navigate("/"); 
  };
  
  useEffect(() => {
    if (!user) return;

    const loadClients = async () => {
      try {
        const data = await appService.fetchClients();
        setClients(data || []);
      } catch {
        showAlert("Error", "Failed to fetch clients");
      }
    };

    loadClients();
  }, [user]);

  useEffect(() => {
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
  }, [clients]);

  const selectClient = async (clientObj, store = true) => {
    if (!clientObj) return;

    setSelectedClientState(clientObj);
    setActiveMode(null);
    if (store) {
      localStorage.setItem(
        PREFIX + "selectedClient",
        JSON.stringify({ clientId: clientObj.Id, timestamp: Date.now() }),
      );
    }

    try {
      const proj = await appService.fetchProjects(clientObj.Client_Name);
      setProjects(proj || []);
      setSelectedProject(null);
    } catch {
      setProjects([]);
    }

    createNewChat(clientObj);
  };

  const createClient = async (name) => {
    if (!name) return;
    setLoading(true);
    try {
      await appService.createClient(name);
      const updated = await appService.fetchClients();
      setClients(updated || []);

      const newClient = updated.find((c) => c.Client_Name === name);
      if (newClient) await selectClient(newClient);
    } catch (err) {
      showAlert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name) => {
    if (!selectedClient)
      return showAlert("Select Client", "Please select a client first.");
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

  const createNewChat = (clientObj = selectedClient) => {
    if (!clientObj) return;

    const existingEmptyChat = chatSessions.find(
      (s) =>
        s.clientId === clientObj.Id &&
        s.messages.length === 0 &&
        s.title === "New Chat",
    );

    if (existingEmptyChat) {
      setCurrentChatSession(existingEmptyChat);
      setMessages([]);
      return;
    }

    const newSession = {
      id: `chat-${Date.now()}`,
      clientId: clientObj.Id,
      title: "New Chat",
      date: new Date().toISOString(),
      messages: [],
      context: { lastEntity: null, lastTopic: null, messageHistory: [] },
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setCurrentChatSession(newSession);
    setMessages([]);
    setConversationContext({
      lastEntity: null,
      lastTopic: null,
      messageHistory: [],
    });
  };

  const loadChatSession = (id) => {
    if (loading) return;

    const session = chatSessions.find((s) => s.id === id);
    if (!session) return;

    setCurrentChatSession(session);
    setMessages(session.messages || []);
  };

  const deleteChatSession = (id) => {
    const session = chatSessions.find((s) => s.id === id);
    if (!session) return;

    setAlert({
      open: true,
      title: "Delete Chat?",
      message: `Are you sure you want to delete "${session.title}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => {
        setChatSessions((prev) => prev.filter((s) => s.id !== id));
        if (currentChatSession?.id === id) {
          setCurrentChatSession(null);
          setMessages([]);
        }
        closeAlert();
      },
      onCancel: () => closeAlert(),
    });
  };

  const addMessage = (role, content) => {
    const msg = { id: `msg-${Date.now()}`, role, content };

    setMessages((prev) => {
      const updated = [...prev, msg];
      if (currentChatSession) {
        setChatSessions((sessions) =>
          sessions.map((s) =>
            s.id === currentChatSession.id ? { ...s, messages: updated } : s,
          ),
        );
      }
      return updated;
    });

    return msg.id;
  };

 const formatContent = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/^\s*[\*•-]\s+/gm, "• ");
  };

 const sendQuery = async (client, query) => {
  if (!client || !query.trim()) return;

  setLoading(true);
  addMessage("user", query);

  const aiMsgId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  setMessages(prev => [...prev, { 
    id: aiMsgId, 
    role: "ai", 
    content: "", 
    displayContent: "" 
  }]);

  let fullResponseText = "";
  let displayedText = "";

  try {
    await appService.streamQuery(client.Client_Name, query, {}, async (partial) => {
      fullResponseText = formatContent(partial || "");
    });

     const interval = setInterval(() => {
      if (displayedText.length < fullResponseText.length) {
       
        displayedText = fullResponseText.slice(0, displayedText.length + 2);
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, displayContent: displayedText } : msg
        ));
      } else if (!loading) {
       
        clearInterval(interval);
      }
    }, 15); 

   } catch (err) {
    setMessages(prev => prev.map(msg => 
      msg.id === aiMsgId ? { ...msg, displayContent: `Error: ${err.message}` } : msg
    ));
  } finally {
    setLoading(false);
  }
 };

  const value = {
    goHome,
    clients,
    selectedClient,
    setSelectedClient: selectClient,
    projects,
    selectedProject,
    setSelectedProject,
    loading,
    isGenerating: loading,
    sendQuery,
    messages,
    chatSessions,
    currentChatSession,
    createNewChat,
    loadChatSession,
    deleteChatSession,
    addMessage,
    showAlert,
    activeMode,
    setActiveMode,
    sessionId,
    setSessionId,
    createClient,
    createProject,
  };

  return (
    <AppContext.Provider value={value}>
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
    </AppContext.Provider>
  );
}
