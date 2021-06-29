import React, { useState, useEffect, useReducer, useRef, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../store/AuthContext';

const LoginForm = () => {
  const [formIsValid, setformIsValid] = useState(false);
  const [message, setMessage] = useState(null);

  const authCtx = useContext(AuthContext);

  const emailInput = useRef();
  const passwordInput = useRef();

  const checkFormValidHandler = () => {
    if (emailInput.current.value === "" ||
      passwordInput.current.value === "") {
      setformIsValid(false);
      return;
    }
    setformIsValid(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const signupAPI = `http://localhost:5151/login?email=${email}&password=${password}`;
    fetch(signupAPI)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Your email or password is invalid!");
        }
        return response.json();
      })
      .then(data => {
        authCtx.login(data.data);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }

  return (
    <Card className={classes.auth}>
      {message && <p className={classes.error}>{message}</p>}
      {authCtx.isLoggedIn && <p className={classes.success}>Login successfully.</p>}
      {!authCtx.isLoggedIn &&
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailInput}
              onChange={checkFormValidHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInput}
              onChange={checkFormValidHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} sisabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      }
    </Card>
  );
};

export default LoginForm;
