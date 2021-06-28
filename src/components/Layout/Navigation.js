import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = () => {

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/" exact>Home</NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/signup">Signup</NavLink>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
