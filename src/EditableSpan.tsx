import React from "react";

type EditableSpanPropsType = {
    value:string
    onChange:(newValue:string)=>void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    return (
        <div>

        </div>
        // <li key={t.id} className={t.isDone ? "is-done" : ""}>
        //     <input type="checkbox"
        //            onChange={props.onChangeStatusHandler}
        //            checked={t.isDone}/>
        //     <span>{props.value}</span>
        //     <span> </span>
        //     <button onClick={props.onClickHandler}>X</button>
        // </li>
    )
}