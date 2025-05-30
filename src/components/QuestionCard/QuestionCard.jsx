import React from "react";
import styles from "./QuestionCard.module.css"

function QuestionCard({question}){
  return(
    <div className={styles.questionCardContainer}>
      <h4>{question}</h4>
      <p>Get immediate AI generated response</p>
    </div>
  )
}

export default QuestionCard;