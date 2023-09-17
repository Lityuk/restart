import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "All" | "Active" | "Completed";

function App() {

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

    const [filter, setFilter] = useState<filterType>("All")

    const addFilter = (filterValue: filterType) => {
        setFilter(filterValue)
    }

    let tasksAfterFilter = tasks;


    if (filter === "Active") {
        tasksAfterFilter = tasksAfterFilter.filter((t) => (!t.isDone))
    }
    if (filter === "Completed") {
        tasksAfterFilter = tasksAfterFilter.filter((t) => (t.isDone))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksAfterFilter}
                      removeTask={removeTask}
                      addFilter={addFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
