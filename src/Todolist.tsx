import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    id:string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    changeTaskStatus: (id: string, e: boolean) => void
    filter:FilterValueType
}

type TasksType = {
    id: string
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')

    const [error,setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle('')
        } else {
            setError("Title is required")
        }

    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue)
    }

    const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(id, newIsDoneValue)

    }

    return (
        <div>
            <h3> {props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message"> {error}</div> }

            </div>
            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox" checked={t.isDone}
                                   onChange={(e) => onChangeStatusHandler(t.id, e)}/>
                            <span >{t.title}</span> <span>  </span>
                            <button onClick={() => removeTaskHandler(t.id)}> x</button>
                        </li>)
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={() => changeFilterHandler("all")}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ""} onClick={() => changeFilterHandler("active")}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={() => changeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )


}