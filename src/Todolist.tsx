import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, TasksType} from "./App";


type TodolistPropsType = {
    title?: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addFilter: (filterValue: filterType) => void
    addTask: (taskName: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e) => (onChangeHandler(e))} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
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