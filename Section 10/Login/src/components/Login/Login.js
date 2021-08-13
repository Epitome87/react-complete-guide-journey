import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../context/auth-context"

const ACTIONS = {
  EMAIL_INPUT: 'email-input',
  PASSWORD_INPUT: 'password-input',
  EMAIL_BLUR: 'email-blur',
  PASSWORD_BLUR: 'password-blur',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.EMAIL_INPUT:
      return {
        ...state,
        email: {
          value: action.payload.value,
          isValid: action.payload.value.includes('@'),
        },
        isValid: action.payload.value.includes('@') && state.password.isValid,
      };
    case ACTIONS.EMAIL_BLUR:
      return {
        ...state,
        email: {
          value: state.email.value,
          isValid: state.email.value.includes('@'),
        },
        isValid: state.email.value.includes('@') && state.password.isValid,
      };
    case ACTIONS.PASSWORD_INPUT:
      return {
        ...state,
        password: {
          value: action.payload.value,
          isValid: action.payload.value.trim().length > 6,
        },
        isValid: state.email.isValid && action.payload.value.trim().length > 6,
      };
    case ACTIONS.PASSWORD_BLUR:
      return {
        ...state,
        password: {
          value: state.password.value,
          isValid: state.password.value.trim().length > 6,
        },
        isValid: state.email.isValid && state.password.value.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    isValid: false,
    password: { value: '', isValid: false },
    email: { value: '', isValid: false },
  });

  const { isValid: emailIsValid } = formState.email;
  const { isValid: passwordIsValid } = formState.password;

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchForm({
      type: ACTIONS.EMAIL_INPUT,
      payload: { value: event.target.value },
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({
      type: ACTIONS.PASSWORD_INPUT,
      payload: { value: event.target.value },
    });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: ACTIONS.EMAIL_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: ACTIONS.PASSWORD_BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type='submit'
            className={classes.btn}
            disabled={!formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
