import { ACTION_FETCH } from "./weather.actions";

export default function weatherReducer(state = [], action: any) {
  if (action && action.type === ACTION_FETCH) {
    return action.payload;
  }
  return state;
}
