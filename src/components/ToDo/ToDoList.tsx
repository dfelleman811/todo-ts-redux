import { ReactNode } from "react";
import { ToDo as TDType } from "../../utils/data-types";
import { Heading } from "../ui/Heading";
import ToDo from "./ToDo";
import { useAppSelector } from "../../store/hooks";

type ToDoListProps = {
    todos: TDType[];
    show: "all" | "complete" | "incomplete";
};
export function ToDoList({ todos, show }: ToDoListProps) {
    // If someone is not lgoged in - todos.filter -> not a function
    if (
        show === "incomplete" &&
        todos.filter((todo) => !todo.isComplete).length === 0
    ) {
        return <Heading text="All Done! Nice work" size={3} />;
    }

    let content: ReactNode;

    switch (show) {
        case "all": {
            // sort todos - need to copy since it's state?
            const todosCopy = [...todos];
            const sortedTodos = todosCopy.sort((todo) =>
                todo.isComplete ? 1 : -1
            );
            content = (
                <ul>
                    {sortedTodos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <ToDo todo={todo} />
                            </li>
                        );
                    })}
                </ul>
            );
            break;
        }
        case "complete": {
            const completedTodos = todos.filter((todo) => todo.isComplete);
            content = (
                <ul>
                    {completedTodos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <ToDo todo={todo} />
                            </li>
                        );
                    })}
                </ul>
            );
            break;
        }
        case "incomplete": {
            const incompleteTodos = todos.filter((todo) => !todo.isComplete);
            content = (
                <ul>
                    {incompleteTodos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <ToDo todo={todo} />
                            </li>
                        );
                    })}
                </ul>
            );

            break;
        }
    }

    return { ...content };
}
