import React from "react";
import {TasksType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksType>
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => (
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
                ))}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}