import React from "react";
import {TasksType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksType>
    removeTask:(id:number)=> void
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
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span><button onClick={()=>props.removeTask(t.id)}>X</button></li>
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