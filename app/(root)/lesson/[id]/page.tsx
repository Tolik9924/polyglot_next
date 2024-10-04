'use client';
import { Button } from 'core_ui_design_system';
import { useState } from 'react';
import styles from './styles.module.css';

export default function LessonPage() {
  const [answer, setAnswer] = useState("");

  const test = {
    sentence: "Ти покажеш?",
    questions: [
      {id: 1, name: "first word", subQuestions: [
        {id: 1, name: "Does", isCorrect: false},
        {id: 2, name: "Will", isCorrect: true},
        {id: 3, name: "Did", isCorrect: false},
        {id: 4, name: "Are", isCorrect: false},
      ]},
      {id: 2, name: "second word", subQuestions: [
        {id: 1, name: "I", isCorrect: false},
        {id: 2, name: "He", isCorrect: false},
        {id: 3, name: "You", isCorrect: true},
        {id: 4, name: "We", isCorrect: false},
      ]},
      {id: 3, name: "third word", subQuestions: [
        {id: 1, name: "Hide", isCorrect: false},
        {id: 2, name: "Screen", isCorrect: false},
        {id: 3, name: "Try", isCorrect: true},
        {id: 4, name: "Show", isCorrect: false},
      ]},
    ],
  };

  const onClick = (word: string) => {
    setAnswer(answer + word + " ");
  }

  return (
    <div className={styles.lessonPage}>
      <h1>Lesson Topic</h1>
      <div className={styles.sentenceContainer}>
        <p className={styles.sentence}>Ти покажеш?</p>
        <div className={styles.answerContainer}>
          <p className={styles.answer}>{answer}</p>
        </div>
        <div className={styles.words}>
          <Button size="l" variant="primary" onclick={() => onClick("I")}>I</Button>
          <Button size="l" variant="error" onclick={() => onClick("He")}>He</Button>
          <Button size="l" variant="success" onclick={() => onClick("You")}>She</Button>
          <Button size="l" variant="primary" onclick={() => onClick("We")}>We</Button>
        </div>
      </div>
    </div>
  );
}