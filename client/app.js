import { h, app } from "hyperapp";
import { state  } from "./states";
import { actions  } from "./actions";
import { view  } from "./views";

app(state, actions, view, document.querySelector('#container'));
