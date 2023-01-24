import React, {KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
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

    return (
        <div>
            <h3> {props.title}</h3>
            <div>
                <input value={title} onChange={changeInput} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>

            </div>
            <ul>
                {props.tasks.map(t => (
                    <li><input key={t.id} type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={() => removeTaskHandler(t.id)}>X</button>
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