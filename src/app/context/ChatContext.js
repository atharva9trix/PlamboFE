import React, { createContext, useContext, useState, useEffect } from "react";
import * as appService from "../../core/services/appService";
import { useAlert } from "./AlertContext";
import { useClient } from "./ClientContext";

const ChatContext = createContext(null);

export function useChat() {
  const context = useContext(ChatContext);
  return context;
}

export function ChatProvider({ children }) {
  const { selectedClient } = useClient();
  const { showAlert } = useAlert();

  const [messages, setMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatSession, setCurrentChatSession] = useState(null);

  const [conversationContext, setConversationContext] = useState({
    lastEntity: null,
    lastTopic: null,
    messageHistory: [],
  });

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (selectedClient?.Id && chatSessions.length === 0 && !currentChatSession) {
      createNewChat(selectedClient);
    }
  }, [selectedClient?.Id]);


const formatContent = (text) => {
  if (!text) return "";
  return text;
};

  const createNewChat = (clientObj = selectedClient) => {
    if (!clientObj) return;

    const existingEmptyChat = chatSessions.find(
      (s) =>
        s.clientId === clientObj.Id &&
        s.messages.length === 0 &&
        s.title === "New Chat"
    );

    if (existingEmptyChat) {
      setCurrentChatSession(existingEmptyChat);
      setMessages([]);
      return;
    }


    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const counter = chatSessions.length;
    const uniqueId = `chat-${timestamp}-${random}-${counter}`;

    const newSession = {
      id: uniqueId,
      clientId: clientObj.Id,
      title: "New Chat",
      date: new Date().toISOString(),
      messages: [],
      context: {
        lastEntity: null,
        lastTopic: null,
        messageHistory: [],
      },
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

    showAlert(
      "Delete Chat?",
      `Are you sure you want to delete "${session.title}"?`
    );

    setChatSessions((prev) => prev.filter((s) => s.id !== id));

    if (currentChatSession?.id === id) {
      setCurrentChatSession(null);
      setMessages([]);
    }
  };

 
  const addMessage = (role, content) => {
    const msg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      displayContent: content,
    };

    setMessages((prev) => [...prev, msg]);
    return msg.id;
  };

 
  const sendQuery = async (client, query) => {
    if (!client || !query.trim()) return;

    setLoading(true);

 
    const userMsgId = addMessage("user", query);

    if (currentChatSession && currentChatSession.title === "New Chat") {
      const title =
        query.length > 40 ? query.substring(0, 40).trim() + "..." : query;

      const updatedSession = { ...currentChatSession, title };
      setCurrentChatSession(updatedSession);
      
      setChatSessions((prev) =>
        prev.map((s) =>
          s.id === currentChatSession.id ? updatedSession : s
        )
      );
    }

    const aiMsgId = addMessage("ai", "");

    let fullResponse = "";
    let isTypingComplete = false;

    try {
     
      await appService.streamQuery(
        client.Client_Name,
        query,
        {},
        (partial) => {
          fullResponse = formatContent(partial || "");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        }
      );

     
      let displayedText = "";
      const interval = setInterval(() => {
        if (displayedText.length < fullResponse.length) {
          displayedText += fullResponse.slice(displayedText.length, displayedText.length + 2);
          
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId
                ? { ...msg, displayContent: displayedText }
                : msg
            )
          );
        } else {
          clearInterval(interval);
          isTypingComplete = true;
          
          
          setMessages((currentMessages) => {
            setChatSessions((prevSessions) =>
              prevSessions.map((s) => {
                if (s.id !== currentChatSession?.id) return s;
                
                
                const finalMessages = currentMessages.map((msg) => ({
                  ...msg,
                  displayContent: msg.displayContent ?? msg.content
                }));
                
                return { ...s, messages: finalMessages };
              })
            );
            return currentMessages;
          });
        }
      }, 15);

    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? { ...msg, displayContent: `Error: ${err.message}` }
            : msg
        )
      );
      
      
      setTimeout(() => {
        setChatSessions((prev) =>
          prev.map((s) => {
            if (s.id !== currentChatSession?.id) return s;
            return {
              ...s,
              messages: messages.map((msg) => ({
                ...msg,
                displayContent: msg.displayContent ?? msg.content
              }))
            };
          })
        );
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        chatSessions,
        currentChatSession,
        createNewChat,
        loadChatSession,
        deleteChatSession,
        addMessage,
        sendQuery,
        conversationContext,
        setConversationContext,
        loading,
        setMessages,
        
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

