import { app } from "hyperapp";
import { view } from "./views";
import { state } from "./states";
import { actions } from "./actions";

app(state, actions, view, document.querySelector('#container'));