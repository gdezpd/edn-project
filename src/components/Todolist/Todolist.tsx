import React, {useCallback} from 'react'
import {AddItemForm} from '../../features/AddItemForm/AddItemForm'
import {EditableSpan} from '../../features/EditableSpan/EditableSpan'
import {Task} from '../Task/Task'
import {FilterValuesType} from '../App/App';
import {Button, Card, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    timeHours: number,
    timeMinutes: number
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(function (
    {
        id,
        title,
        tasks,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        removeTask,
        removeTodolist,
        changeTodolistTitle,
        filter
    }: PropsType) {

    const addTodo = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(id, title)
    }, [id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id, changeFilter])


    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return <div>
        <Space direction="vertical" size="middle" style={{display: 'flex', margin: '10px'}}>
            <Card title={
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            }
                  extra={<Button icon={<DeleteOutlined/>} onClick={removeTodolistHandler}/>}
                  size="default">
                <AddItemForm addItem={addTodo}/>
                <div>
                    {
                        tasksForTodolist.map(t =>
                            <Task key={t.id} task={t} todolistId={id}
                                  removeTask={removeTask}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTaskStatus={changeTaskStatus}
                            />
                        )
                    }
                </div>
                <div style={{paddingTop: '10px'}}>
                    <Space className="site-button-ghost-wrapper" wrap>
                        <Button type={filter === 'all' ? 'dashed' : 'default'}
                                onClick={onAllClickHandler}>
                            All
                        </Button>
                        <Button type={filter === 'active' ? 'dashed' : 'default'} onClick={onActiveClickHandler}>
                            Active
                        </Button>
                        <Button type={filter === 'completed' ? 'dashed' : 'default'}
                                onClick={onCompletedClickHandler}>
                            Completed
                        </Button>
                    </Space>
                </div>
            </Card>
        </Space>
    </div>
})


