import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    function onDoubleClickHandler() {
        setEditMode(true)
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChange(title)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            activateViewMode()
        }
    }

    return (
        <span>
          {editMode ? <input value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}
                             onKeyPress={onKeyPressHandler}/> :
              <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>}
            <span> </span>
        </span>

    )


}