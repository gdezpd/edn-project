import React, {useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {TaskType} from './Todolist'
import {Button, Checkbox} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";

import s from './task.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./App";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo(({
                                    task,
                                    todolistId,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask
                                }: TaskPropsType) => {

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback((e: CheckboxChangeEvent) => {
        let newIsDoneValue = e.target.checked
        changeTaskStatus(task.id, newIsDoneValue, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);


    return <div key={task.id} className={s.container}>

        <div className={s.wrapper}>
            <Checkbox checked={task.isDone} onChange={onChangeHandler} className={s.checkbox}/>
            <span className={s.text}><EditableSpan value={task.title} onChange={onTitleChangeHandler}/></span>
            <Button danger icon={<DeleteOutlined/>} onClick={onClickHandler} className={s.button}/>
        </div>
        <span className={s.time}>
            created {task.timeHours}:{task.timeMinutes}
        </span>
    </div>
})
