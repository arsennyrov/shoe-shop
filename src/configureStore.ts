import { Store, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { routerMiddleware } from "connected-react-router";

import { History } from "history";

import { ApplicationState, createRootReducer } from "./store";

const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }

};
const persistedStore = loadFromLocalStorage();

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  const store = createStore(
    createRootReducer(history),
    persistedStore,
    applyMiddleware(routerMiddleware(history), thunk)
  );
  store.subscribe(() => {
    saveToLocalStorage(store.getState());
  });
  return store;
}
