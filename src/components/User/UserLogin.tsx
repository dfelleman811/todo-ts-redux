import { type FormEvent, useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loginUserThunk } from "../../store/userSlice";

export default function UserLogin() {
    const dispatch = useAppDispatch();
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!usernameInput.current!.value || !passwordInput.current!.value)
            return;
        dispatch(
            loginUserThunk({
                username: usernameInput.current!.value,
                password: passwordInput.current!.value
            })
        );
    };
    return (
        <div id="loginForm">
            <form onSubmit={loginHandler} id="login">
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        ref={usernameInput}
                        id="usernameinput"
                        type="text"
                        className="form-control form-control-sm"
                    ></input>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        ref={passwordInput}
                        id="passwordInput"
                        type="password"
                        className="form-control form-control-sm"
                    ></input>
                </div>
                <div>
                    <button className="btn btn-primary btn-sm">Login</button>
                </div>
            </form>
        </div>
    );
}
