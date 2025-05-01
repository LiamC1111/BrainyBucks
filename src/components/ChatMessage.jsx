import React from 'react';
import ChatbotIcon from './Chatboticon'; 

const ChatMessage = ({chat}) => {
    return (
      !chat.hideinChat && (
        <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? 'error' : ""}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text">{chat.text}</p>
      </div>
    )
  )
}
export default ChatMessage;