'use client';

import { useState } from 'react';

import { Button, Checkbox, Input } from 'core_ui_design_system';

import styles from './styles.module.css';

interface Test {
  id: number;
  name: string;
  isCorrect: boolean;
}

interface SaveTest {
  sentence: string,
  ukrainian: string,
  test: Array<Test>
}

export default function CreateTestPage() {
  const [sentence, setSentence] = useState("");
  const [ukrainian, setUkrainian] = useState("");
  const [test, setTest] = useState<Array<Test>>([{
    id: 1,
    name: "",
    isCorrect: false
  }]);
  const [saveTest, setSaveTest] = useState<SaveTest>();

  const handleChangeSentence = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(event.target.value);
  };

  const handleChangeUkrainian = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUkrainian(event.target.value);
  };

  const handleChangeNameQuestion = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>) => {
    setTest(test.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: event.target.value
        }
      } else {
        return { ...item };
      }
    }));
  };

  const handleChangeIsCorrect = (id: number) => {
    setTest(test.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCorrect: !item.isCorrect
        }
      } else {
        return { ...item };
      }
    }));
  };

  const addAnswer = () => {
    setTest([
      ...test,
      {
        id: test.length + 1,
        name: "",
        isCorrect: false
      }
    ]);
  };

  const sendTest = () => {
    setSaveTest({
      sentence: sentence,
      ukrainian: ukrainian,
      test: test
    });
  };

  console.log("Sentence: ", sentence);
  console.log("Ukrainian: ", ukrainian);
  console.log("Test: ", test);
  console.log("Send Test: ", saveTest);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create Sentence</h1>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <p className={styles.nameOfItem}>English: </p>
          <Input
            value={sentence}
            handleChange={handleChangeSentence}
            label="sentence"
            size="l"
            fullWidth={true}
          />
        </div>
        <div className={styles.formItem}>
          <p className={styles.nameOfItem}>Ukrainian: </p>
          <Input
            value={ukrainian}
            handleChange={handleChangeUkrainian}
            label="речення"
            size="l"
            fullWidth={true}
          />
        </div>
        <div className={styles.testItem}>
          <p className={styles.variantsofAnswer}>Variants of Answer</p>
          {test.map((item) => (
            <div key={item.id} className={styles.test}>
              <p className={styles.nameOfItem}>Word: </p>
              <div className={styles.inputContainer}>
                <Input
                  value={item.name}
                  handleChange={(event) => handleChangeNameQuestion(item.id, event)}
                  label="Word"
                  size="l"
                  fullWidth={true}
                />
              </div>
              <div className={styles.checkboxContainer}>
                <Checkbox
                  span="Is Correct Answer"
                  checked={item.isCorrect}
                  onChange={() => handleChangeIsCorrect(item.id)}
                />
              </div>
            </div>
          ))}
          <div className={styles.buttonContainer}>
            <Button size="xs" onclick={addAnswer}>Add Answer</Button>
          </div>
        </div>
        <Button size="xs" onclick={sendTest}>Save Test</Button>
      </div>
    </div>
  );
};