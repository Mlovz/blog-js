import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  global: globalReducer
});

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
