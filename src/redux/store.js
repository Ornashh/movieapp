import { createStore } from "redux";
import { AppState } from "./reducer";

export const store = createStore(AppState);
