import React from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id:number) => void
}

type TasksType = {
    id: number
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {

    const removeTaskHandler = (id:number) => {
        props.removeTask(id)
    }

    return (
        <div>
            <h3> {props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => (
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={()=>removeTaskHandler(t.id)}>X</button>
                    </li>))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )


}