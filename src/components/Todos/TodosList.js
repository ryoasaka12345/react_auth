import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
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
                setTodos(response.data.data);
                setError(null);
                console.log(response.data.data);
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

    let todosList = <p>No Todo</p>
    if (todos != null) {
        todosList = todos.map((todo) => (
            <li className={classes.todo}>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
            </li>
        ))
    }

    return (
        <ul className={classes["todos-list"]}>
            <h1><NavLink activeClassName={classes.active} to="/todoAdd">add new todo</NavLink></h1>
            {todosList}
        </ul>
    );
};

export default TodosList;

