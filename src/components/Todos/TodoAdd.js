import React, { Fragment, useState, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './TodoAdd.module.css';
import axios from "axios";
import AuthContext from "../../store/AuthContext";


const TodoAdd = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const titleInput = useRef();
    const descriptionInput = useRef();

    const checkFormValidHandler = () => {
        if (titleInput.current.value === "" ||
            descriptionInput.current.value === "") {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        const todoAddAPI = 'http://localhost:5151/todos';
        const todoAddData = {
            title: titleInput.current.value,
            description: descriptionInput.current.value,
        };
        axios.post(todoAddAPI,
            JSON.stringify(todoAddData)
            ,
            {
                headers: {
                    "Authorization": token
                },
            }
        )
            .then(response => {
                if (response.status === 200) {
                    setMessage("add todo successfully");
                    window.location.replace("/todosList");
                    return;
                }
                setMessage("add todo failed, please check information!");
            })
            .catch((error) => {
                setMessage(error.message);
            });
    }


    return (
        <Card className={classes.field}>
            <h1>new todo</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <div>
                        <label>Title</label>
                    </div>
                    <input
                        type="text"
                        ref={titleInput}
                        onChange={checkFormValidHandler}
                    />
                </div>
                <div className={classes.control}>
                    <div>
                        <label>Description</label>
                    </div>
                    <textarea ref={descriptionInput} onChange={checkFormValidHandler} />
                </div>
                <div>
                    <Button type="submit" disabled={!isFormValid}>
                        Submit todo
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default TodoAdd;
