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
                setTodos(response.data.data);
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
    console.log(token);

    return (
        <ul className={classes["todos-list"]}>
            <li className={classes.todo}>
                <h2>Eu vix putent ceteros</h2>
                <p>
                    Eu vix putent ceteros. Et usu tempor perpetua, sea ludus labitur eu.
                    Te has etiam tempor expetenda. Ex possit detracto nominati ius, vix te
                    dicat dicam habemus, ei omnes primis omnesque ius. Eu vide erant
                    reprimique duo. Ut doctus oporteat duo, cu eum labitur inciderint, nec
                    illum virtute maluisset cu.
                </p>
            </li>
            <li className={classes.todo}>
                <h2>Eu vix putent ceteros</h2>
                <p>
                    Eu vix putent ceteros. Et usu tempor perpetua, sea ludus labitur eu.
                    Te has etiam tempor expetenda. Ex possit detracto nominati ius, vix te
                    dicat dicam habemus, ei omnes primis omnesque ius. Eu vide erant
                    reprimique duo. Ut doctus oporteat duo, cu eum labitur inciderint, nec
                    illum virtute maluisset cu.
                </p>

            </li>
        </ul>
    );
};

export default TodosList;
