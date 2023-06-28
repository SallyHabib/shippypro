import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import Home from "./modules/home/home";
import store from "./store";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  rootElement
);
