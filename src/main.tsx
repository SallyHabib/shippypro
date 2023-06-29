
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import Home from "./modules/home/home";
import store from "./store";


const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <Home />
  </Provider>,
);
