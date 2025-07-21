import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import services from "./services";
import FunnyBot from "./FunnyBot.jsx";
import "./AboutusStyle.css";
import { Bot, ChevronRight, Send, Sparkles } from "lucide-react"; // Ensure you have lucide-react installed
import commandHandler from "../aboutNewBoltAI/utils/commandHandler.js";
import services from "../aboutNewBoltAI/utils/services"; // if needed directly
const message = {
  id: "1",
  text: "Hello!",
  sender: "user",
  timestamp: new Date(),
  isService: false,
};

const Aboutus = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showServices, setShowServices] = useState(false);
  //   const messagesEndRef = useRef < HTMLDivElement > null;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      id: "1",
      text: "👋 Hello! I'm Quasivo's AI Assistant. I'm here to help you discover our revolutionary AI solutions. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    setShowServices(false);

    const result = commandHandler(lowerCommand, setShowServices); // This now calls the imported function

    if (result) {
      console.log(result.text);
    }

    return {
      text: `I'm not quite sure about that...`,
      isService: false,
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const response = commandHandler(inputText, setShowServices); // ✅ using the imported one

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        isService: response.isService,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-blue-950 relative overflow-hidden">
      {/* Glowing Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: `hsl(${200 + Math.random() * 60}, 70%, ${
                60 + Math.random() * 30
              }%)`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
              animation: `float ${
                3 + Math.random() * 4
              }s ease-in-out infinite, glow ${
                2 + Math.random() * 3
              }s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Blurred Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate("/")}
          className="bg-black/30 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-black/50 transition-all backdrop-blur-sm"
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full">
          {!showChat ? (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="relative flex justify-center items-center">
                <h1 className="relative text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 animate-glow drop-shadow-lg">
                  Quasivo's World
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <Sparkles className="w-12 h-12 text-cyan-400 animate-spin-slow" />
                  </span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Revolutionizing the future with{" "}
                <span className="text-cyan-300 font-semibold">Agentic AI</span>,{" "}
                <span className="text-blue-300 font-semibold">
                  Data Analytics
                </span>
                , and{" "}
                <span className="text-indigo-300 font-semibold">
                  Responsible AI
                </span>{" "}
                solutions
              </p>
              <div className="flex justify-center items-center mt-16">
                {/* FunnyBot */}
                <FunnyBot openModal={() => setShowChat(true)} />
              </div>
            </div>
          ) : (
            // Chat Box
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl max-w-4xl mx-auto animate-slide-up">
              <div className="flex items-center justify-between p-6 border-b border-gray-700/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Quasivo AI Assistant
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-300 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              {/* <div className="h-96 overflow-y-auto p-6 space-y-4  scrollbar-thumb-cyan-950 scrollbar-track-blue-900"> */}

              <>
                <style>
                  {`
      .custom-scroll {
        height: 24rem;
        overflow-y: auto;
        padding: 1.5rem;
        border-radius: 0.5rem;
      }

      .custom-scroll::-webkit-scrollbar {
        width: 8px;
      }

      .custom-scroll::-webkit-scrollbar-track {
        background: #1e3a8a;
        border-radius: 8px;
      }

      .custom-scroll::-webkit-scrollbar-thumb {
        background-color: #06b6d4;
        border-radius: 8px;
        border: 2px solid transparent;
      }

      .custom-scroll {
        scrollbar-width: thin;
        scrollbar-color: #2156dd #000000 ;
      }
    `}
                </style>
                <div className="h-96 overflow-y-auto p-6 space-y-4 custom-scroll">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-700 to-cyan-700 text-white shadow-lg"
                            : "bg-black/40 text-gray-200 border border-gray-700/40 backdrop-blur-sm"
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-black/40 text-gray-200 border border-gray-700/40 px-4 py-2 rounded-2xl backdrop-blur-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>

              {showServices && (
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(services).map(([key, service]) => (
                      <div
                        key={key}
                        className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-gray-700/30 hover:bg-black/40 transition-all duration-300 cursor-pointer group"
                        onClick={() => {
                          setInputText(service.title.toLowerCase());
                          setShowServices(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white shadow-lg`}
                          >
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm">
                              {service.title}
                            </h3>
                            <p className="text-gray-400 text-xs">
                              {service.description.substring(0, 50)}...
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 p-6 border-t border-gray-700/30">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (try 'help' or 'services')"
                  className="flex-1 bg-black/30 text-gray-200 placeholder-gray-500 border border-gray-700/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent backdrop-blur-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-2 rounded-full hover:from-blue-800 hover:to-cyan-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
