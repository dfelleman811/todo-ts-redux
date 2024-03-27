import { useEffect, useState } from "react";
import { ToDoList } from "../components/ToDo/ToDoList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTodos } from "../store/todoSlice";
import { Heading } from "../components/ui/Heading";
import { NewToDo } from "../components/ToDo/NewToDo";
import { ToDoControls } from "../components/ToDo/ToDoControls";
import { Category, ToDo } from "../utils/data-types";
import { Link } from "react-router-dom";

const ToDoPage = () => {
    const currentUser = useAppSelector(
        (state) => state.currentUser.currentUser
    );
    const [showCategory, setShowCategory] = useState<Category>("incomplete");

    const todos = useAppSelector((state) => state.todos);

    const dispatch = useAppDispatch();

    const updateCategoryHandler = (cat?: string) => {
        if (cat && cat === "all") {
            setShowCategory("all");
        } else {
            setShowCategory(
                showCategory === "incomplete" ? "complete" : "incomplete"
            );
        }
    };

    useEffect(() => {
        // call api endpoint to get todos
        (async () => {
            // make sure someone is logged in? this really shouldn't be happening here
            if (!currentUser.username) return;
            const cleanUsername = currentUser.username.replace("USER#", "");
            const res = await fetch(
                `https://de0lg4qob9.execute-api.us-east-1.amazonaws.com/dev/todos?username=${cleanUsername}`
            );
            console.log(res);
            const retrievedTodos = (await res.json()) as ToDo[];

            dispatch(setTodos(retrievedTodos));
        })();
    }, []);

    if (!currentUser.username) {
        return (
            <>
                <Heading
                    size={3}
                    text="Please login to see your todos"
                ></Heading>
                <Link to="/home" className="btn btn-warning">
                    Login
                </Link>
            </>
        );
    }
    return (
        <div className="container-lg main">
            <Heading size={3} text="Your ToDo List" className="app-title" />
            <NewToDo />
            <ToDoControls
                showCategory={showCategory}
                updateCategory={updateCategoryHandler}
            />
            <ToDoList todos={todos.todos} show={showCategory} />
        </div>
    );
};

export default ToDoPage;
