import reducers from "../store";
import { createStore, compose } from "redux";

export default function createReduxStore(initialState = {}) {
  const enhancers = [];

  if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }

  const createStoreWithMiddleware: any = compose(...enhancers)(createStore);

  return createStoreWithMiddleware(reducers);
}
