import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";

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

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => props.addFilter("All", props.todolistId)
    const onActiveClickHandler = () => props.addFilter("Active", props.todolistId)
    const onCompletedClickHandler = () => props.addFilter("Completed", props.todolistId)

    const addTask = (title:string) => {
        props.addTask(title, props.todolistId)
    }


    return (
        <div>
            <h3>{props.title}
                <span> </span>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue, props.todolistId)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
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
