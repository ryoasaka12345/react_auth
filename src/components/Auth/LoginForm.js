import React, { useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';

const LoginForm = () => {
  const [formIsValid, setformIsValid] = useState(false);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);

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
        setToken(data.data);
        console.log(token);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }

  return (
    <Card className={classes.auth}>
      {message && <p className={classes.error}>{message}</p>}
      {token && <p className={classes.success}>Login successfully.</p>}
      {!token &&
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
