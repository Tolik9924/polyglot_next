'use client';
import { Button } from 'core_ui_design_system';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function LessonPage() {
  const [answer, setAnswer] = useState("");
  const [isNotCorrect, setIsNotCorrect] = useState(false);
  const [testWordId, setTestWordId] = useState<number>(0);
  const [completedTest, setCompletedTest] = useState<boolean>(false);
  const [testId, setTestId] = useState(0);
  const [countCompletedTest, setCountCompletedTest] = useState<number>(0);


  const startTest = [
    {
      sentence: "Ти покажеш?",
      questions: [
        {
          id: 1, name: "first word", subQuestions: [
            { id: 1, name: "Does", isCorrect: false },
            { id: 2, name: "Will", isCorrect: true },
            { id: 3, name: "Did", isCorrect: false },
            { id: 4, name: "Are", isCorrect: false },
          ]
        },
        {
          id: 2, name: "second word", subQuestions: [
            { id: 1, name: "I", isCorrect: false },
            { id: 2, name: "He", isCorrect: false },
            { id: 3, name: "You", isCorrect: true },
            { id: 4, name: "We", isCorrect: false },
          ]
        },
        {
          id: 3, name: "third word", subQuestions: [
            { id: 1, name: "Hide?", isCorrect: false },
            { id: 2, name: "Screen?", isCorrect: false },
            { id: 3, name: "Try?", isCorrect: false },
            { id: 4, name: "Show?", isCorrect: true },
          ]
        },
      ],
    },
    {
      sentence: "Вона почала?",
      questions: [
        {
          id: 1, name: "first word", subQuestions: [
            { id: 1, name: "Does", isCorrect: false },
            { id: 2, name: "Will", isCorrect: false },
            { id: 3, name: "Did", isCorrect: true },
            { id: 4, name: "Are", isCorrect: false },
          ]
        },
        {
          id: 2, name: "second word", subQuestions: [
            { id: 1, name: "I", isCorrect: false },
            { id: 2, name: "She", isCorrect: true },
            { id: 3, name: "You", isCorrect: false },
            { id: 4, name: "We", isCorrect: false },
          ]
        },
        {
          id: 3, name: "third word", subQuestions: [
            { id: 1, name: "Start?", isCorrect: true },
            { id: 2, name: "Screen?", isCorrect: false },
            { id: 3, name: "Try?", isCorrect: false },
            { id: 4, name: "Show?", isCorrect: false },
          ]
        },
      ],
    },
    {
      sentence: "Я розумію.",
      questions: [
        {
          id: 1, name: "first word", subQuestions: [
            { id: 1, name: "I", isCorrect: true },
            { id: 2, name: "He", isCorrect: false },
            { id: 3, name: "She", isCorrect: false },
            { id: 4, name: "It", isCorrect: false },
          ]
        },
        {
          id: 2, name: "second word", subQuestions: [
            { id: 1, name: "start.", isCorrect: false },
            { id: 2, name: "screen.", isCorrect: false },
            { id: 3, name: "understand.", isCorrect: true },
            { id: 4, name: "show.", isCorrect: false },
          ]
        },
      ],
    }
  ];

  const [test, setTest] = useState(startTest);
  const [sentence, setSentence] = useState(startTest[testId]);
  const [testWord, setTestWord] = useState(sentence.questions[testWordId]);

  const onClick = (word: string, isCorrect: boolean) => {
    if (isCorrect) {
      const count = testWordId + 1;
      setTestWordId(testWordId + 1);
      setAnswer(answer + word + " ");
      if (count < testWord.subQuestions.length) {
        setTestWord(sentence.questions[count]);
      }

      if (sentence.questions.length === count) { 
        setCountCompletedTest(countCompletedTest + 1);
        const countCompleted = countCompletedTest + 1;
        if (countCompleted === test.length) {
          setCompletedTest(true);
          setAnswer("You Completed Test!!!");
        } else {
          setTestWordId(0);
          setAnswer("");
          setCompletedTest(false);
          setTestId(testId + 1);
          const countTestId = testId + 1;
          setSentence({ ...test[countTestId] });
          const questions = { ...test[countTestId] }
          setTestWord(questions.questions[0]);
        }
      }
    }

    if (!isCorrect) {
      setIsNotCorrect(true);
    }
  }

  console.log("SENTENCE: ", startTest[testId]);
  console.log("TEST WORD: ", sentence.questions[testWordId]);
  console.log("countCompletedTest: ", countCompletedTest);
  console.log("test length: ", test.length);
  console.log("equal test length and countCompletedTest", test.length === countCompletedTest);

  return (
    <div className={styles.lessonPage}>
      <h1>Lesson Topic</h1>
      <div className={styles.sentenceContainer}>
        <p className={styles.sentence}>{sentence.sentence}</p>
        <div className={styles.answerContainer}>
          {isNotCorrect
            ? <p className={styles.answer}>Is Not Correct</p>
            : <p className={styles.answer}>{answer}</p>
          }
        </div>
        <div className={styles.words}>
          {!completedTest
            ? testWord.subQuestions.map((subQuestion) => (
              <Button
                key={subQuestion.id}
                size="l"
                variant="primary"
                onclick={() => {
                  onClick(subQuestion.name, subQuestion.isCorrect);
                }}>
                {subQuestion.name}
              </Button>
            ))
            : <p className={styles.answer}>Correct!</p>}
        </div>
      </div>
    </div>
  );
}