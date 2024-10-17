'use client';

import { useState } from 'react';

import { Button, Checkbox, Input } from 'core_ui_design_system';

import styles from './styles.module.css';

interface SubQuestion {
  id: number;
  name: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  name: string;
  subQuestions: Array<SubQuestion>
}

export default function CreateTestPage() {
  const [topic, setTopic] = useState("");
  const [sentence, setSentence] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      name: "Name 1",
      subQuestions: [
        { id: 1, name: "Does", isCorrect: false },
        { id: 2, name: "Will", isCorrect: true },
      ]
    },
    {
      id: 2,
      name: "Name 2",
      subQuestions: [
        { id: 1, name: "I", isCorrect: false },
        { id: 2, name: "He", isCorrect: false },
      ]
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

  const handleChangeNameSubQuestion = (
    questionId: number,
    subQuestionId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    const newQuestions = questionsCopy.map((question: Question) => {
      if (question.id === questionId) {
        return {
          ...question,
          subQuestions: question.subQuestions.map((subQuestion: SubQuestion) => {
            if (subQuestion.id === subQuestionId) {
              return {
                ...subQuestion,
                name: event.target.value
              }
            } else {
              return { ...subQuestion }
            }
          })
        }
      } else {
        return { ...question }
      }
    });

    console.log("New Questions: ", newQuestions);
    setQuestions(newQuestions);
  };

  const handleChangeIsCorrect = (
    questionId: number,
    subQuestionId: number,
  ) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    const newQuestions = questionsCopy.map((question: Question) => {
      if (question.id === questionId) {
        return {
          ...question,
          subQuestions: question.subQuestions.map((subQuestion: SubQuestion) => {
            if (subQuestion.id === subQuestionId) {
              return {
                ...subQuestion,
                isCorrect: !subQuestion.isCorrect
              }
            } else {
              return { ...subQuestion, isCorrect: false }
            }
          })
        }
      } else {
        return { ...question }
      }
    });

    setQuestions(newQuestions);
  };

  const addSubQuestion = (questionId: number) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    const newQuestions = questionsCopy.map((question: Question) => {
      if (question.id === questionId) {
        return {
          ...question,
          subQuestions: [
            ...question.subQuestions, 
            {
              id: question.subQuestions.length + 1,
              name: "",
              isCorrect: false              
            }]
        }
      } else {
        return { ...question };
      }
    });

    setQuestions(newQuestions);
  };

  const addSentence = () => {
    console.log("Click!");
  }

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
          <p className={styles.nameOfItem}>Questions: </p>
          <div>
            {questions.map((item) => (
              <div key={item.id} className={styles.subItemContainer}>
                <div className={styles.nameOfQuestion}>
                  <p className={styles.nameOfSubItem}>Name: </p>
                  <Input
                    value={item.name}
                    handleChange={(event) => handleChangeNameQuestion(item.id, event)}
                    label="Word"
                    size="l"
                    fullWidth={true}
                  />
                </div>
                <p className={styles.nameOfSubItem}>Subquestions: </p>
                {item.subQuestions.map((subQuestion) => {
                  return (
                    <div key={subQuestion.id} className={styles.subQuestionContainer}>
                      <p className={styles.nameOfSubquestion}>Name of Subquestion: </p>
                      <Input
                        value={subQuestion.name}
                        handleChange={(event) => handleChangeNameSubQuestion(
                          item.id,
                          subQuestion.id,
                          event
                        )}
                      />
                      <Checkbox
                        span="Is Correct Answer"
                        checked={subQuestion.isCorrect}
                        onChange={() => handleChangeIsCorrect(item.id, subQuestion.id)}
                      />
                    </div>
                  );
                })}
                <div className={styles.addSubquestion}>
                  <Button size="xs" onclick={() => addSubQuestion(item.id)}>Add Subquestion</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button size="s" onclick={addSentence}>Add Sentence</Button>
      </div>
    </div>
  );
};