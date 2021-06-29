import React from "react";
import Card from "../UI/Card/Card";
import classes from "./TodosList.module.css";

const TodoList = () => {
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

export default TodoList;
