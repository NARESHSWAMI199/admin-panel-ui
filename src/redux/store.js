import { createStore, compose, applyMiddleware } from "redux";
import authReducer from "./reducer/reducer";
import thunk from "redux-thunk";

// Get the Redux DevTools composer if available, otherwise use compose
const composeEnhancers = 
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  authReducer,
  composeEnhancers(applyMiddleware(thunk))
);
