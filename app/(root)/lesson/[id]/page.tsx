'use client';
import { Button } from 'core_ui_design_system';
import { useState } from 'react';
import styles from './styles.module.css';


interface SubQuestion {
  id: number,
  name: string,
  isCorrect: boolean
}

interface Question {
  id: number,
  name: string,
  subQuestions: Array<SubQuestion>
}

interface Sentence {
  id: number,
  sentence: string;
  isCompleted: boolean;
  questions: Array<Question>
};

const startTest = [
  {
    id: 1,
    sentence: "Ти покажеш?",
    isCompleted: false,
    questions: [
      {
        id: 1,
        name: "first word",
        subQuestions: [
          { id: 1, name: "Does", isCorrect: false },
          { id: 2, name: "Will", isCorrect: true },
          { id: 3, name: "Did", isCorrect: false },
          { id: 4, name: "Are", isCorrect: false },
        ]
      },
      {
        id: 2,
        name: "second word",
        subQuestions: [
          { id: 1, name: "I", isCorrect: false },
          { id: 2, name: "He", isCorrect: false },
          { id: 3, name: "You", isCorrect: true },
          { id: 4, name: "We", isCorrect: false },
        ]
      },
      {
        id: 3,
        name: "third word",
        subQuestions: [
          { id: 1, name: "Hide?", isCorrect: false },
          { id: 2, name: "Screen?", isCorrect: false },
          { id: 3, name: "Try?", isCorrect: false },
          { id: 4, name: "Show?", isCorrect: true },
        ]
      },
    ],
  },
  {
    id: 2,
    sentence: "Вона почала?",
    isCompleted: false,
    questions: [
      {
        id: 1,
        name: "first word",
        subQuestions: [
          { id: 1, name: "Does", isCorrect: false },
          { id: 2, name: "Will", isCorrect: false },
          { id: 3, name: "Did", isCorrect: true },
          { id: 4, name: "Are", isCorrect: false },
        ]
      },
      {
        id: 2,
        name: "second word",
        subQuestions: [
          { id: 1, name: "I", isCorrect: false },
          { id: 2, name: "She", isCorrect: true },
          { id: 3, name: "You", isCorrect: false },
          { id: 4, name: "We", isCorrect: false },
        ]
      },
      {
        id: 3,
        name: "third word",
        subQuestions: [
          { id: 1, name: "Start?", isCorrect: true },
          { id: 2, name: "Screen?", isCorrect: false },
          { id: 3, name: "Try?", isCorrect: false },
          { id: 4, name: "Show?", isCorrect: false },
        ]
      },
    ],
  },
  {
    id: 3,
    sentence: "Я розумію.",
    isCompleted: false,
    questions: [
      {
        id: 1,
        name: "first word",
        subQuestions: [
          { id: 1, name: "I", isCorrect: true },
          { id: 2, name: "He", isCorrect: false },
          { id: 3, name: "She", isCorrect: false },
          { id: 4, name: "It", isCorrect: false },
        ]
      },
      {
        id: 2,
        name: "second word",
        subQuestions: [
          { id: 1, name: "start.", isCorrect: false },
          { id: 2, name: "screen.", isCorrect: false },
          { id: 3, name: "understand.", isCorrect: true },
          { id: 4, name: "show.", isCorrect: false },
        ]
      },
    ],
  }
];

export default function LessonPage() {
  const [answer, setAnswer] = useState("");
  const [isNotCorrect, setIsNotCorrect] = useState(false);
  const [testWordId, setTestWordId] = useState<number>(0);
  const [testId, setTestId] = useState(0);

  const [test, setTest] = useState(startTest);
  const [sentence, setSentence] = useState<Sentence>({ ...startTest[0] });
  const [testWord, setTestWord] = useState({ ...sentence.questions[testWordId] });

  const [isCompletedSentence, setIsCompletedSentence] = useState<boolean>(false);

  const onClick = async (word: string, isCorrect: boolean) => {
    if (isCorrect) {
      let count = 0;
      setAnswer(answer + word + " ");
      if (testWord.id < sentence.questions.length) {
        count = testWordId + 1;
        setTestWordId(testWordId + 1);
        setTestWord(sentence.questions[count]);
      }
      if (sentence.questions.length === testWord.id) {
        setIsCompletedSentence(true);
        setTestWordId(0);
        setSentence({ ...sentence, isCompleted: true });
      }
    }

    if (!isCorrect) {
      setIsNotCorrect(true);
    }
  }

  const showSentence = (id: number) => {
    setIsCompletedSentence(false);
    setTestWordId(0);
    setAnswer("");
    setTestId(id);
    const filteredSentence = test.filter((item) => item.id === id);
    setSentence({ ...filteredSentence[0] });
    setTestWord(filteredSentence[0].questions[0]);
  }

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
          {!isCompletedSentence
            ? testWord.subQuestions.map((subQuestion) => (
              <div key={subQuestion.id} className={styles.word}>
                <Button
                  size="l"
                  variant="primary"
                  onclick={() => {
                    onClick(subQuestion.name, subQuestion.isCorrect);
                  }}>
                  {subQuestion.name}
                </Button>
              </div>
            ))
            : <p className={styles.answer}>Correct!</p>}
        </div>
      </div>
      <div className={styles.pagination}>
        {test.map((item) => (
          <Button
            key={item.id}
            size="s"
            variant="primary"
            onclick={() => {
              showSentence(item.id)
            }}>
            {item.id}
          </Button>
        ))}
      </div>
    </div>
  );
}