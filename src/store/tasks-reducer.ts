import { TaskType } from '../components/Todolist/Todolist'
import { v1 } from 'uuid'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolists-reducer'
import { TasksStateType } from '../components/App/App'

const initialState: TasksStateType = {}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todolistId]
      const newTasks = tasks.filter(t => t.id !== action.taskId)
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state }
      const date = new Date()
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
        timeHours: date.getHours(),
        timeMinutes: date.getMinutes(),
      }
      const tasks = stateCopy[action.todolistId]
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId]
      let newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      )

      state[action.todolistId] = newTasksArray
      return { ...state }
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId]
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      )

      state[action.todolistId] = newTasksArray
      return { ...state }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId,
  } as const)

export const addTaskAC = (title: string, todolistId: string) =>
  ({
    type: 'ADD-TASK',
    title,
    todolistId,
  } as const)
export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) =>
  ({
    type: 'CHANGE-TASK-STATUS',
    isDone,
    todolistId,
    taskId,
  } as const)
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) =>
  ({
    type: 'CHANGE-TASK-TITLE',
    title,
    todolistId,
    taskId,
  } as const)

//type
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
