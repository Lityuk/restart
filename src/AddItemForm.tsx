import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else setError("Title is required")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }
    return <div>
        <input value={title}
               onChange={(e) => (onChangeHandler(e))}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}/>
        {error && <div className="error-message">{error}</div>}
        <button onClick={addItem}>+</button>
    </div>
}