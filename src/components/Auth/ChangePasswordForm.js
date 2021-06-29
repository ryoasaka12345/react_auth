import React, { useState, useRef, Fragment, useContext } from 'react';
import axios from "axios";

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/AuthContext";

const ChangePasswordForm = () => {
    const [formIsValid, setformIsValid] = useState(false);
    const [isShowForm, setShowForm] = useState(true);
    const [message, setMessage] = useState(null);

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
                "password": passwordInput.current.value
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
                setMessage(error.message);
            });
    }

    return (
        <Fragment>
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
        </Fragment>
    );
}

export default ChangePasswordForm;
