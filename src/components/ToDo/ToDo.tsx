import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTodoThunk, markTodoCompleteThunk } from "../../store/todoSlice";
import { ToDo as TDType } from "../../utils/data-types";
import { Check, X } from "react-bootstrap-icons";
export type ToDoProps = {
    todo: TDType;
};

export default function ToDo({ todo }: ToDoProps) {
    const [isXHighlighted, setIsXHighlighted] = useState<boolean>(false);

    const currentUser = useAppSelector(
        (state) => state.currentUser.currentUser
    );

    const dispatch = useAppDispatch();

    const onCompleteHandler = () => {
        console.log(todo);
        dispatch(markTodoCompleteThunk(todo.id, currentUser.username));
    };

    const onDeleteHandler = () => {
        dispatch(deleteTodoThunk(todo.id, currentUser.username));
    };

    const highlightX = () => {
        setIsXHighlighted(!isXHighlighted);
    };

    const xColor = isXHighlighted ? "red" : "grey";

    return (
        <div className="todo">
            <button onClick={onDeleteHandler} type="button">
                <X
                    color={xColor}
                    size={25}
                    onMouseOver={() => highlightX()}
                    onMouseLeave={() => highlightX()}
                ></X>
            </button>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>

            {todo.isComplete ? (
                <button>
                    <Check color="lightgreen" size={35}></Check>
                </button>
            ) : (
                <button onClick={onCompleteHandler} type="button">
                    Complete
                </button>
            )}
        </div>
    );
}
