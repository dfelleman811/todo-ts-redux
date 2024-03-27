import { Category } from "../../utils/data-types";

type ToDoControlsProps = {
    showCategory: Category;
    updateCategory: (cat?: string) => void;
};

export function ToDoControls({
    showCategory,
    updateCategory
}: ToDoControlsProps) {
    const showAll = () => {
        updateCategory("all");
    };

    return (
        <div className="controls">
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => updateCategory()}
            >
                {showCategory === "incomplete" ? "Completed" : "To Do"}
            </button>

            {showCategory === "all" ? (
                <></>
            ) : (
                <button className="btn btn-secondary btn-sm" onClick={showAll}>
                    Show All
                </button>
            )}
        </div>
    );
}
