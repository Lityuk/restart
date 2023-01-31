import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter:(filterValue:FilterValueType)=>void
}

type TasksType = {
    id: string
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filterValue:FilterValueType) =>{
        props.changeFilter(filterValue)
    }

    return (
        <div>
            <h3> {props.title}</h3>
            <div>
                <input value={title} onChange={changeInput} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>

            </div>
            <ul>
                {props.tasks.map(t => (
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span> <span>  </span>
                        <button onClick={() => removeTaskHandler(t.id)}> x</button>
                    </li>))}
            </ul>
            <div>
                <button onClick={()=>changeFilterHandler("all")} >All</button>
                <button onClick={()=>changeFilterHandler("active")}>Active</button>
                <button onClick={()=>changeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )


}