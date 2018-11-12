import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducer from "./reducers.js";
// import { createLogger } from "redux-logger";
const middleware = [promise];
if (process.env.NODE_ENV !== "production") {
  // middleware.push(createLogger());
}
const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
