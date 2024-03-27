import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentUser, ToDo } from "../utils/data-types";
import { type useAppDispatch } from "./hooks";
type ToDoState = {
    todos: ToDo[];
};

const initialState: ToDoState = {
    todos: []
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<ToDo[]>) => {
            state.todos = action.payload;
            return state;
        },
        addNewTodo: (state, action: PayloadAction<ToDo>) => {
            const newTodo = {
                ...action.payload
            };
            state.todos.push(newTodo);
        },
        deleteTodo: (state, action) => {
            const delIndex = state.todos.findIndex(
                (todo) => todo.id === action.payload
            );
            state.todos.splice(delIndex, 1);
        },
        markTodoComplete: (state, action) => {
            console.log("inside dispatch");
            const completeIndex = state.todos.findIndex(
                (todo) => todo.id === action.payload
            );
            console.log("completed Index : " + completeIndex);
            state.todos[completeIndex].isComplete = true;
        }
    }
});

export const { setTodos, addNewTodo, deleteTodo, markTodoComplete } =
    todoSlice.actions;

// thunk?
export const addNewToDoThunk =
    (todoPayload: ToDo & CurrentUser) =>
    async (dispatch: ReturnType<typeof useAppDispatch>) => {
        console.log("THUNKING - adding new todo");

        const { username, ...todo } = todoPayload;
        const cleanUsername = username.replace("USER#", "");
        console.log(cleanUsername);
        console.log(todo);
        const res = await fetch(
            `https://de0lg4qob9.execute-api.us-east-1.amazonaws.com/dev/todos?username=${cleanUsername}`,
            {
                method: "POST",
                body: JSON.stringify(todo),
                headers: { "Content-Type": "application/json" }
            }
        );

        if (res.ok) {
            dispatch(addNewTodo(todo));
        }
    };

export const markTodoCompleteThunk =
    (id: string, username: string) =>
    async (dispatch: ReturnType<typeof useAppDispatch>) => {
        console.log("THUNKING - with id: " + id);
        // stripping TODO# cause I can't figure out how to escape that in the url...
        const cleanId = id.replace("TODO#", "");
        console.log(`cleanid = ${cleanId}`);
        // same for username
        const cleanUsername = username.replace("USER#", "");
        const res = await fetch(
            `https://de0lg4qob9.execute-api.us-east-1.amazonaws.com/dev/todos/${cleanId}?username=${cleanUsername}`,
            { method: "PATCH" }
        );
        if (res.ok) {
            dispatch(markTodoComplete(id));
        }
    };

export const deleteTodoThunk =
    (id: string, username: string) =>
    async (dispatch: ReturnType<typeof useAppDispatch>) => {
        const cleanId = id.replace("TODO#", "");
        const cleanUsername = username.replace("USER#", "");
        const res = await fetch(
            `https://de0lg4qob9.execute-api.us-east-1.amazonaws.com/dev/todos/${cleanId}?username=${cleanUsername}`,
            { method: "DELETE" }
        );
        if (res.ok) {
            dispatch(deleteTodo(id));
        }
    };
