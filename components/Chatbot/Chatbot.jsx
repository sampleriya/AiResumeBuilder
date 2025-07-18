import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Chatbot.module.css";

const Chatbot = ({onClose}) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Control visibility
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);

  // Calculate dynamic vh
  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    window.addEventListener('load', setVh);
    setVh(); // Initial calculation
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('load', setVh);
    };
  }, []);

  useEffect(() => {
    setChatMessages([
      { type: "incoming", content: "Hey there, how can I navigate you today?" },
    ]);
  }, []);

  const suggestions = [
    "Tell me about your services",
    "How can I contact support?",
    "What are your working hours?",
  ];

  const handleChat = async (message) => {
    const outgoingMessage = {
      type: "outgoing",
      content: message || userMessage.trim(),
    };

    if (!outgoingMessage.content) return;

    setChatMessages([...chatMessages, outgoingMessage]);
    setUserMessage("");

    setIsLoading(true);

    setTimeout(() => {
      generateResponse(outgoingMessage.content);
    }, 600);
  };

  const generateResponse = async (message) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "incoming", content: data.response },
      ]);
    } catch (error) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "incoming", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
      if (chatboxRef.current) {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleChat(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  };

  const handleToggleChatbot = () => {
    setIsVisible(!isVisible);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.chatbot}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <header>
            <div className={styles.head1}>
              <div className={styles.imgContainer}>
                <img src="/bot-3.png" alt="Bot Head" className={styles.img} />
                <div className={styles.circle}></div>
              </div>
              <div>
                <p style={{ color: "white", margin: "0" }}>Assistance</p>
                <p
                  style={{
                    color: "white",
                    marginTop: "-8px",
                    fontWeight: "200",
                    fontSize: "14px",
                  }}
                >
                  Online
                </p>
              </div>
            </div>
            <div onClick={handleToggleChatbot} className={styles.closeIcon}>
              <i className="fas fa-times"></i>
            </div>
          </header>
          <ul className={styles.chatbox} ref={chatboxRef}>
            {chatMessages.map((msg, index) => (
              <li key={index} className={`${styles.chat} ${styles[msg.type]}`}>
                {msg.type === "incoming" && (
                  <span className="material-symbols-outlined"></span>
                )}
                <p>{msg.content}</p>
              </li>
            ))}
            {isLoading && (
              <li className={`${styles.chat} ${styles.incoming}`}>
                <span className="material-symbols-outlined"></span>
                <div className={styles.loader}></div>
              </li>
            )}
          </ul>

          {chatMessages.length === 1 && (
            <div className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div style={{ padding: "0 1rem" }} className={styles.mainChat}>
            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Type Your Message Here..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => handleChat()}
                disabled={!userMessage.trim()}
              ></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
