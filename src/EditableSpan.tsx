import React, {useState} from "react";

type EditableSpanPropsType = {
    value: string
    // onChange: (newValue: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)

    function onDoubleClickHandler() {
        setEditMode(true)
    }

    return (
        <span>
          { editMode ? <input value={props.value}/> :
              <span onDoubleClick={onDoubleClickHandler}>{props.value}</span> }
            <span> </span>
        </span>

    )


}