import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import Card from "../UI/Card/Card";
import classes from "./TodosList.module.css";
import AuthContext from "../../store/AuthContext";

const TodosList = () => {
    const [todos, setTodos] = useState(null);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const token = authCtx.token;

    useEffect(() => {
        axios.get('http://localhost:5151/todos', {
            headers: {
                "Authorization": token
            }
        })
            .then(response => {
                setTodos(response);
                setError(null);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 401) {
                        history.push("/login");
                        return;
                    }
                }
                setError(error.data);
            });
    }, []);

    console.dir(todos);

    let todosList = <p>No Todo</p>;

    if (todos.data.length !== 0) {
        let todosList = <p>test</p>;
    }

    return (
        <ul className={classes["todos-list"]}>
            {todosList}
        </ul>
    );
};

export default TodosList;
