import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"


function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValueType>("all")

    let tasksForTodolist = tasks;

    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }

    if (filter === "active") {
        tasksForTodolist = [...tasks].filter((t) => !t.isDone)
    }

    if (filter === "completed") {
        tasksForTodolist = [...tasks].filter((t) => t.isDone)
    }


    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const removeTask = (id: string) => {
        setTasks([...tasks].filter((t) => t.id !== id))
        console.log(tasks)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} addTask={addTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
