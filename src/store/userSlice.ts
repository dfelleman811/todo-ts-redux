import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { CurrentUser, Role } from "../utils/data-types";
import { useAppDispatch } from "./hooks";

type CurrentUserState = {
    currentUser: CurrentUser;
};

const initialState: CurrentUserState = {
    currentUser: {
        username: "",
        role: ""
    }
};

type UserCredentials = {
    username: string;
    password: string;
    role?: Role;
};

export const userSlice = createSlice({
    name: "current-user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<CurrentUser>) => {
            const { username, role } = action.payload;
            state.currentUser.username = username;
            state.currentUser.role = role;
        },
        logoutUser: (state) => {
            state.currentUser.username = "";
            state.currentUser.role = "";
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions;

export const loginUserThunk =
    (userCredentials: UserCredentials) =>
    async (dispatch: ReturnType<typeof useAppDispatch>) => {
        // send credentials to auth endpoint
        console.log("in thunk - sending credentials");
        console.log(userCredentials);
        const res = await fetch(
            `https://de0lg4qob9.execute-api.us-east-1.amazonaws.com/dev/auth`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userCredentials)
            }
        );
        if (res.ok) {
            console.log("res.ok - parsing");
            const returnedUser = (await res.json()) as CurrentUser;
            dispatch(loginUser(returnedUser));
        }
    };
