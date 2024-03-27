import { FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToDo } from "../../utils/data-types";
import { addNewToDoThunk, addNewTodo } from "../../store/todoSlice";
import { v4 as uuiv4 } from "uuid";
import { current } from "@reduxjs/toolkit";

export function NewToDo() {
    const [showForm, setShowForm] = useState(false);
    const currentUser = useAppSelector(
        (state) => state.currentUser.currentUser
    );
    const dispatch = useAppDispatch();

    const titleInput = useRef<HTMLInputElement>(null);
    const descInput = useRef<HTMLInputElement>(null);

    const addNewToDoHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!currentUser) return;
        const newTodo: ToDo = {
            id: `TODO#${uuiv4()}`,
            title: titleInput.current!.value,
            description: descInput.current!.value,
            isComplete: false
        };
        console.log("before dispatch - created new todo");
        console.log(newTodo);
        //add user to payload
        const newTodoPayload = {
            username: currentUser.username,
            role: currentUser.role,
            ...newTodo
        };
        dispatch(addNewToDoThunk(newTodoPayload));
        event.currentTarget.reset();
        setShowForm(false);
    };

    if (showForm) {
        return (
            <form className="mb-3 new-todo" onSubmit={addNewToDoHandler}>
                <div id="title-input">
                    <label htmlFor="titleInput" className="form-label">
                        Title
                    </label>
                    <input
                        id="titleInput"
                        type="text"
                        className="form-control form-control-sm"
                        ref={titleInput}
                    />
                </div>
                <div>
                    <label htmlFor="descInput" className="form-label">
                        Description
                    </label>
                    <input
                        id="descInput"
                        type="text"
                        className="form-control form-control-sm"
                        ref={descInput}
                    />
                </div>
                <div id="new-todo-buttons">
                    <button className="btn btn-primary btn-sm">Add</button>
                    <button
                        className="btn btn-sm btn-secondary"
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
    return (
        <button
            id="addToDoToggle"
            className="btn btn-warning"
            onClick={() => setShowForm(!showForm)}
        >
            Add To Do
        </button>
    );
}
