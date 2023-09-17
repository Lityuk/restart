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

    const onAllClickHandler = () => props.addFilter("All")
    const onActiveClickHandler = () => props.addFilter("Active")
    const onCompletedClickHandler = () => props.addFilter("Completed")



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={(e) => (onChangeHandler(e))}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    return <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}