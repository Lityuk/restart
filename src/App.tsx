import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    const task1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest Api", isDone: true},
        {id: 5, title: "Angular", isDone: false},
    ]

    let [tasks, setTasks] = useState(task1)

    const removeTask = (id: number) => {

        console.log(id)
        setTasks([...tasks].filter((t) => t.id !== id))
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
