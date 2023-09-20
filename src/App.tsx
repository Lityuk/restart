import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: filterType
}

export type filterType = "All" | "Active" | "Completed";

function App() {



    // const [filter, setFilter] = useState<filterType>("All")

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: "todolistId1", title: "What to learn", filter: "All"},
        {id: "todolistId2", title: "What to buy", filter: "All"}
    ])

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "graphQL", isDone: true}
    ]);

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((t) => (t.id !== taskID)))
    }

    const addTask = (taskName: string) => {
        const newTask: TasksType = {id: v1(), title: taskName, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }

    }

    const addFilter = (filterValue: filterType,todolistId:string) => {
        let todolist = todolists.find(tl=>tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    // let tasksAfterFilter = tasks;
    //
    // if (filter === "Active") {
    //     tasksAfterFilter = tasksAfterFilter.filter((t) => (!t.isDone))
    // }
    // if (filter === "Completed") {
    //     tasksAfterFilter = tasksAfterFilter.filter((t) => (t.isDone))
    // }


    return (
        <div className="App">
            {
                todolists.map(t => {

                    let tasksAfterFilter = tasks;

                    if (t.filter === "Active") {
                        tasksAfterFilter = tasksAfterFilter.filter((t) => (!t.isDone))
                    }
                    if (t.filter === "Completed") {
                        tasksAfterFilter = tasksAfterFilter.filter((t) => (t.isDone))
                    }

                    return <Todolist
                        key={t.id}
                        todolistId={t.id}
                        title={t.title}
                        tasks={tasksAfterFilter}
                        removeTask={removeTask}
                        addFilter={addFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={t.filter}
                    />
                })
            }

        </div>
    );
}

export default App;
