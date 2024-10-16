'use client';

import { useState } from 'react';

import { Input } from 'core_ui_design_system';

import styles from './styles.module.css';

interface Question {
  id: number;
  name: string;
  subQuestions: string[]
}

export default function CreateTestPage() {
  const [topic, setTopic] = useState("");
  const [sentence, setSentence] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      name: "Name 1",
      subQuestions: []
    },
    {
      id: 2,
      name: "Name 2",
      subQuestions: []
    }
  ]);

  const handleChangeTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleChangeSentence = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(event.target.value);
  };

  const handleChangeCorrectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer(event.target.value);
  };

  const handleChangeNameQuestion = (
    id: number, 
    event: React.ChangeEvent<HTMLInputElement>) => {
      const questionsCopy = JSON.parse(JSON.stringify(questions));
      setQuestions(
        questionsCopy.map((question: Question) => {
          if (question.id === id) {
            return {
              ...question,
              name: event.target.value
            }
          } else {
            return { ...question };
          }
        })
      ); 
  };

  console.log("questions: ", questions);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create Test</h1>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <p className={styles.nameOfItem}>Lesson Topic: </p>
          <Input
            value={topic}
            handleChange={handleChangeTopic}
            label="Topic"
            size="l"
            fullWidth={true}
          />
        </div>
        <div className={styles.formItem}>
          <p className={styles.nameOfItem}>Sentence: </p>
          <Input
            value={sentence}
            handleChange={handleChangeSentence}
            label="Sentence"
            size="l"
            fullWidth={true}
          />
        </div>
        <div className={styles.formItem}>
          <p className={styles.nameOfItem}>Correct Answer: </p>
          <Input
            value={correctAnswer}
            handleChange={handleChangeCorrectAnswer}
            label="Correct Answer"
            size="l"
            fullWidth={true}
          />
        </div>
        <div>
          <p>Questions: </p>
          <div>
            <p>1 word</p>
            <div>
              {questions.map((item) => (
                <div key={item.id}>
                  <p>Name: </p>
                  <Input
                    value={item.name}
                    handleChange={(event) => handleChangeNameQuestion(item.id, event)}
                    label="Correct Answer"
                    size="l"
                    fullWidth={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};