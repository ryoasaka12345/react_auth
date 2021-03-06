import React, { useState, useRef, Fragment, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from "axios";

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/AuthContext";

const ChangePasswordForm = () => {
    const [formIsValid, setformIsValid] = useState(false);
    const [isShowForm, setShowForm] = useState(true);
    const [message, setMessage] = useState(null);
    const history = useHistory();

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const passwordInput = useRef();

    const checkFormValidHandler = () => {
        if (passwordInput === "") {
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
        const changePwAPI = `http://localhost:5151/change_password`;
        console.log(passwordInput.current.value);
        axios.post(changePwAPI,
            {
                "new_password": passwordInput.current.value
            },
            {
                headers: {
                    "Authorization": token
                },
            }
        )
            .then(response => {
                if (response.status == 200) {
                    setMessage("Change password successfully");
                    setShowForm(false);
                    return;
                }
                setMessage("Change password failed, please check information!");
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 401) {
                        history.push("/login");
                        return;
                    }
                }
                setMessage(error.message);
            });
    }

    return (
        <Card className={classes.auth}>
            {message != null && <p className={classes.error}>{message}</p>}
            {isShowForm &&
                <form onSubmit={submitHandler}>
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
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            Change password
                        </Button>
                    </div>
                </form>
            }
        </Card>
    );
}

export default ChangePasswordForm;
