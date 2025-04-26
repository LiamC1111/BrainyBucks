import { useRef,useState, useEffect } from 'react';
import ChatbotIcon from './components/Chatboticon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import { companyinfo } from './companyinfo';  

const App = () => {
  const [chatHistory, setChatHistory] = useState([{ 
    hideinChat: true,
    role: "model", 
    text: companyinfo }]); //Chat history state
  const [showChatBot, setShowChatbot] = useState([false]); //Button that toggles the chat window
  const chatBodyRef = useRef();
  //Helper function to update chat history with bot response
  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }]);
    }
    //Formatting the chat history to match the API Request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history }),
    };
    try {
      // this will make sure API is called to get the response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      // Clean and update chat history with Bots response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").
      trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    // Auto Scroll to the bottom of the chat body when chat history changes
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return (
<div className={`container ${showChatBot ? 'show-chatbot' : ''}`}>
    <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
      <span className="material-symbols-rounded">mode_comment</span>
      <span className="material-symbols-rounded">close</span>
    </button>


      
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="header-title">BrainyBot</h2>
            <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>    

          {/* Chatbot Body */}
          <div ref={chatBodyRef} className="chat-body"> 
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">Hey there 👋 Welcome to Brainybucks! How can we help?</p>
            </div>
            
            {/* Render the chat history dynamically */} 
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          
          {/* Chatbot Footer */}
          <div className="chat-footer">
            <ChatForm 
              chatHistory={chatHistory} 
              setChatHistory={setChatHistory} 
              generateBotResponse={generateBotResponse} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;