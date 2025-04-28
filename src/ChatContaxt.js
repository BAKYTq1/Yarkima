// context/ChatContext.js
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  return (
    <ChatContext.Provider value={{ chatId, setChatId, currentGroup, setCurrentGroup }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);