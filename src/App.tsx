import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type filterType = "All" | "Active" | "Completed";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "RestAPI", isDone: false},
        {id: 5, title: "graphQL", isDone: true}
    ]);

    const [filter, setFilter] = useState("All")

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((t) => (t.id !== taskID)))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
