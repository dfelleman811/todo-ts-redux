import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        currentUser: userSlice.reducer
    }
});

// need to export types for useSelector/useDispatch -> we'll be making our own custom versions to keep typescript happy
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
