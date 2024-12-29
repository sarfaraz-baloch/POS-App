import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootReducer } from "./RootReducer";

const finalReducer = combineReducers({
  RootReducer,
});

const initialState = {
  RootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// const middleware = [thunk];

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
