import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import botIcon from "../../assets/images/botIcon.png";
import { FaRegEdit, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AnsQuesCard from "../../components/AnsQuesCard/AnsQuesCard";

function History() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("conversations");
    if (stored) {
      const conversations = JSON.parse(stored);
      const lastTwoConversations = conversations.slice(-2);
      setChatHistory(lastTwoConversations);
    }
  }, []);

  function toggleSidebar() {
    setShowSidebar((prev) => !prev);
  }

  function handleNewChat() {
    navigate("/");
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

      <main className={styles.HistoryBox}>
        <h1>Conversation History</h1>
        <div className={styles.historyContainer}>
          <div className={styles.title}>
            <h3>Today's Chat</h3>
          </div>
          <div className={styles.historyCard}>
            {chatHistory.length > 0 ? (
              chatHistory.map((conversation, convoIndex) => (
                <div key={convoIndex} className={styles.singleConversation}>
                  {conversation.messages.slice(0, 2).map((msg, msgIndex) => (
                    <AnsQuesCard
                      key={msgIndex}
                      question={msg.text}
                      isUser={msg.isUser}
                      time={msg.time}
                      fromHistory
                    />
                  ))}
                </div>
              ))
            ) : (
              <p className={styles.noConversation}>No past conversations</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default History;
