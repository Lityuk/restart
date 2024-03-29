import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

type TasksStateType = {
    [key: string]: Array<TasksType>
}


export type filterType = "All" | "Active" | "Completed";

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false},
            {id: v1(), title: "Corvus", isDone: false}
        ]
    });


    const removeTask = (taskID: string, todolistId: string) => {
        // Таски для удаления лежат в объекте, с ключом, который приходит в todolistId
        let todolistTasks = tasks[todolistId];
        //Перезапишем в этом объекте наши таски, отфильтров их по пришедшему ID
        tasks[todolistId] = todolistTasks.filter((t) => t.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = (taskName: string, todolistId: string) => {
        const newTask: TasksType = {id: v1(), title: taskName, isDone: false}
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    const changeTitle = (newTitle: string, taskID: string, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const addFilter = (filterValue: filterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        //найдем нужный тудулист
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {
                todolists.map(t => {

                    let allTodolistTasks = tasks[t.id]

                    let tasksAfterFilter = allTodolistTasks;

                    if (t.filter === "Active") {
                        tasksAfterFilter = allTodolistTasks.filter((t) => (!t.isDone))
                    }
                    if (t.filter === "Completed") {
                        tasksAfterFilter = allTodolistTasks.filter((t) => (t.isDone))
                    }

                    return <Todolist
                        key={t.id}
                        removeTodolist={removeTodolist}
                        todolistId={t.id}
                        title={t.title}
                        tasks={tasksAfterFilter}
                        removeTask={removeTask}
                        addFilter={addFilter}
                        addTask={addTask}
                        changeTitle={changeTitle}
                        changeStatus={changeStatus}
                        filter={t.filter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }</div>
    );
}

export default App;
