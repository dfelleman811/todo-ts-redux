import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, type AppDispatch } from "./store";

/**
 * our custom hooks
 * only really need to be custom to have the types play nicely with ts
 */

//creating a function type that returns the dispatch from our store
type DispatchFunction = () => AppDispatch;

// exporting our custom hook with that type
export const useAppDispatch: DispatchFunction = useDispatch;

// creating a typed use selector hook - that holds our custom root state from our store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
