import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {

    const task1 = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest Api", isDone: true},
        {id: v1(), title: "Angular", isDone: false},
    ]

    const [tasks, setTasks] = useState(task1)

    const addTask = (title:string) => {

        setTasks([{id: v1(), title, isDone: false},...tasks])
    }

    const removeTask = (id: string) => {

        setTasks([...tasks].filter((t) => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} addTask={addTask}/>
        </div>
    );
}

export default App;
