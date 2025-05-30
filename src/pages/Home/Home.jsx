import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import botIcon from "../../assets/images/botIcon.png";
import { FaRegEdit, FaBars } from "react-icons/fa";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import sampleData from "../../data/sampleData.json";
import AnsQuesCard from "../../components/AnsQuesCard/AnsQuesCard";

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("conversations");
    if (stored) {
      const conversations = JSON.parse(stored);
      const lastConversation = conversations[conversations.length - 1];
      if (lastConversation) {
        setChatHistory(lastConversation.messages);
      }
    }
  }, []);

  function toggleSidebar() {
    setShowSidebar((prev) => !prev);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleAsk() {
    if (!input.trim()) return;

    const matchedData = sampleData.find(
      (data) => data.question.toLowerCase() === input.toLowerCase().trim()
    );
    const answer = matchedData
      ? matchedData.response
      : "Sorry, did not understand your query!";

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setChatHistory((prev) => [
      ...prev,
      { text: input.trim(), isUser: true, time },
      { text: answer, isUser: false, time },
    ]);

    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAsk();
    }
  }

  function saveConversation() {
    const stored = localStorage.getItem("conversations");
    const allConversations = stored ? JSON.parse(stored) : [];

    const newConversation = {
      id: allConversations.length + 1,
      timestamp: new Date().toLocaleString(),
      messages: chatHistory,
    };

    allConversations.push(newConversation);
    localStorage.setItem("conversations", JSON.stringify(allConversations));
    return newConversation.id;
  }

  function handleNewChat() {
    if (chatHistory.length > 0) {
      const id = saveConversation();
      alert(`Conversation ${id} saved!`);
    }
    setChatHistory([]);
    setInput("");
  }

  function handleSaveChat() {
    if (chatHistory.length === 0) return;
    const id = saveConversation();
    alert(`Conversation ${id} saved!`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars />
      </div>

      <aside
        className={`${styles.sideBar} ${showSidebar ? styles.showSidebar : ""}`}
      >
        <div className={styles.newChat} onClick={handleNewChat}>
          <img className={styles.botAIImg} src={botIcon} alt="Bot Icon" />
          <span>New Chat</span>
          <FaRegEdit className={styles.editIcon} />
        </div>
        <button className={styles.pastConv}>Past Conversations</button>
      </aside>

      <main
        className={`${styles.chatBox} ${
          chatHistory.length > 0 ? styles.chatBoxConv : ""
        }`}
      >
        <div className={styles.title}>
          <h2>Bot AI</h2>
        </div>

        {chatHistory.length === 0 ? (
          <>
            <div className={styles.heroSection}>
              <h2>How Can I Help You Today?</h2>
              <img className={styles.botAIImg} src={botIcon} alt="Bot Icon" />
            </div>
            <div className={styles.quesDiv}>
              <QuestionCard question="Hi, what is the weather" />
              <QuestionCard question="Hi, what is my location" />
            </div>
            <div className={styles.quesDiv}>
              <QuestionCard question="Hi, what is the temperature" />
              <QuestionCard question="Hi, how are you" />
            </div>
          </>
        ) : (
          <div className={styles.ansQuesDiv}>
            {chatHistory.map((msg, index) => (
              <AnsQuesCard
                key={index}
                question={msg.text}
                isUser={msg.isUser}
                time={msg.time}
              />
            ))}
          </div>
        )}

        <div className={styles.inputDiv}>
          <input
            placeholder="Message Bot AI…"
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.btn} type="submit" onClick={handleAsk}>
            Ask
          </button>
          <button className={styles.btn} type="button" onClick={handleSaveChat}>
            Save
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
