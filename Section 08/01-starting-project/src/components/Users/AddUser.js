import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

function AddUser(props) {
  const nameInputRef = useRef(undefined);
  const ageInputRef = useRef(undefined);

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault(); // Prevent default request

    // New
    const enteredRefName = nameInputRef.current.value;
    const enteredRefAge = ageInputRef.current.value;

    // Only set name and age if valid inputs
    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    if (
      enteredRefName.trim().length === 0 ||
      enteredRefAge.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (nont-empty values)',
      });
      return;
    }
    // if (parseInt(enteredAge) < 1) {
    if (parseInt(enteredRefAge) < 1) {
      // could also do if (+enteredAge < 1)
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0)',
      });
      return;
    }

    // Lift this state up -- to our App component.
    // props.onAddUser(enteredUsername, enteredAge);
    props.onAddUser(enteredRefName, enteredRefAge);

    // Reset input fields
    // setEnteredUsername('');
    // setEnteredAge('');

    // Try not to do this often:
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  // Triggered for every keystroke of username input
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // Triggered for every keystroke of age input
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            type='number'
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;
