import React from "react";
import styles from "./AnsQuesCard.module.css";
import botImg from "../../assets/images/botIcon.png";
import userImg from "../../assets/images/user.png";

function AnsQuesCard({ question, isUser, time, fromHistory }) {
  return (
    <div className={`${fromHistory ? styles.cardHistory : styles.card}`}>
      <div>
        <img src={isUser ? userImg : botImg} alt={isUser ? "User" : "AI Bot"} />
      </div>
      <div className={`${isUser ? styles.userCard : styles.botCard}`}>
        <h5>{isUser ? "You" : "Soul AI"}</h5>
        <p>{question}</p>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
}


export default AnsQuesCard;
