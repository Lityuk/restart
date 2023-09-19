import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, TasksType} from "./App";


type TodolistPropsType = {
    title?: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addFilter: (filterValue: filterType) => void
    addTask: (taskName: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: filterType
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState("")

    const [error, setError] = useState<string | null>("")


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else setError("Task title is required")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                {error && <div className="error-message">{error}</div>}
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone? "is-done" : ""}> <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                })}

            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
