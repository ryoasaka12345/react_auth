import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';

const SignupForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  return (
    <Card className={classes.auth}>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Full Name</label>
          <input
            type="text"
            id="fullname"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;