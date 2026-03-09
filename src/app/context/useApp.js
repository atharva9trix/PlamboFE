import { useAlert } from "./AlertContext";
import { useClient } from "./ClientContext";
import { useChat } from "./ChatContext";
import { useAppState } from "./AppStateContext";

export function useApp() {
  const alertContext = useAlert();
  const clientContext = useClient();
  const chatContext = useChat();
  const appStateContext = useAppState();

  return {
   
    showAlert: alertContext.showAlert,
    closeAlert: alertContext.closeAlert,
    alert: alertContext.alert,
    setAlert: alertContext.setAlert,

    clients: clientContext.clients,
    selectedClient: clientContext.selectedClient,
    setSelectedClient: clientContext.setSelectedClient,
    projects: clientContext.projects,
    selectedProject: clientContext.selectedProject,
    setSelectedProject: clientContext.setSelectedProject,
    loading: clientContext.loading,
    createClient: clientContext.createClient,
    createProject: clientContext.createProject,

   
    messages: chatContext.messages,
    setMessages: chatContext.setMessages,
    chatSessions: chatContext.chatSessions,
    currentChatSession: chatContext.currentChatSession,
    createNewChat: chatContext.createNewChat,
    loadChatSession: chatContext.loadChatSession,
    deleteChatSession: chatContext.deleteChatSession,
    addMessage: chatContext.addMessage,
    sendQuery: chatContext.sendQuery,
    conversationContext: chatContext.conversationContext,
    setConversationContext: chatContext.setConversationContext,
    isGenerating: chatContext.loading,


    activeMode: appStateContext.activeMode,
    setActiveMode: appStateContext.setActiveMode,
    sessionId: appStateContext.sessionId,
    setSessionId: appStateContext.setSessionId,
    goHome: appStateContext.goHome,
  };
}