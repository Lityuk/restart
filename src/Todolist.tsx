import React from "react";
import {filterType, TasksType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    addFilter: (filterValue: filterType) => void
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
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>X</button>
                    </li>
                ))}

            </ul>
            <div>
                <button onClick={() => props.addFilter("All")}>All</button>
                <button onClick={() => props.addFilter("Active")}>Active</button>
                <button onClick={() => props.addFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}