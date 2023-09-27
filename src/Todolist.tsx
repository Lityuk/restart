import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, TasksType} from "./App";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    removeTodolist: (todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addFilter: (filterValue: filterType, todolistId: string) => void
    addTask: (taskName: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterType
}


export const Todolist = (props: TodolistPropsType) => {


    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
            setTitle("")
        } else setError("Task title is required")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => props.addFilter("All", props.todolistId)
    const onActiveClickHandler = () => props.addFilter("Active", props.todolistId)
    const onCompletedClickHandler = () => props.addFilter("Completed", props.todolistId)


    return (
        <div>
            <h3>{props.title}
                <span> </span>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <div>
                <input value={title}
                       onChange={(e) => (onChangeHandler(e))}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                {error && <div className="error-message">{error}</div>}
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue, props.todolistId)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                       onChange={onChangeStatusHandler}
                                                                                       checked={t.isDone}/>
                        <span>{t.title}</span>
                        <span> </span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                })}

            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
