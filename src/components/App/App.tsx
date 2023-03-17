import React, {useCallback} from 'react'
import './App.css';
import {TaskType, Todolist} from '../Todolist/Todolist';
import {AddItemForm} from '../../features/AddItemForm/AddItemForm';

import {Col, Layout, Menu, Row, theme} from 'antd';

import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const {Header, Content, Footer} = Layout;
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    return (
        <div className="App">
            <Layout className="layout">
                <Header style={{position:'relative'}}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={new Array(1).fill(null).map((_, index) => {
                            const key = index + 1;
                            return {
                                key,
                                label: `Todo List`,
                            };
                        })}
                    />
                </Header>
                <Content>
                    <div className="site-layout-content" style={{background: colorBgContainer}}>
                        <Row>
                            <Col span={24} style={{
                                width: '320px',
                                marginLeft: '10px',
                                marginTop: '20px',
                                marginBottom: '20px',
                                flex: 'none',
                                padding: '5px',
                                maxWidth: 'none',
                                border: '1px solid rgb(217, 217, 217)',
                                borderRadius: '6px'
                            }}>
                                <AddItemForm addItem={addTodolist}/>
                            </Col>
                        </Row>
                        <Row>
                            {
                                todolists.map(tl => {
                                    let allTodolistTasks = tasks[tl.id];

                                    return <Col span={6} key={tl.id}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={allTodolistTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Col>
                                })}
                        </Row>
                    </div>
                </Content>

                <Footer style={{width:'100%', position:'fixed', bottom:'0px', textAlign: 'center'}}>Todolist on Ant Design ©2023 Created by Pavel Chobanyuk</Footer>
            </Layout>
        </div>
    )
}

export default App;
