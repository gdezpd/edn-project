import React, { ChangeEvent, useState } from 'react';
import Input from "antd/es/input";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <Input
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
