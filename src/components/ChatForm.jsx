import React from 'react';
import { useRef } from 'react';

const Chatform = ({chatHistory, setChatHistory, generateBotResponse}) => {
        const inputRef = useRef();


         const handleFormSubmit = (e) => {
            e.preventDefault();
            const userMessage = inputRef.current.value.trim();
            if(!userMessage) return;
            inputRef.current.value = "";

            // This Will Update user message to chat history
            setChatHistory(history => [...history, {role: "user", text: userMessage}]);

            // this will show the thinking message
         setTimeout(() => {
         setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]), 

            // this will generate the bot response
         generateBotResponse([...chatHistory, { role: "user", text: `using the details provided above, please address this query ${userMessage}`}]);
         }, 600);
  
      };
    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
              <input ref={inputRef} type="text" placeholder="Message..." 
              className="message-input" required />
              <button className="material-symbols-rounded">arrow_upward</button>
            </form>
        );
    };
    
    export default Chatform