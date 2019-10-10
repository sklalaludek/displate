import React from "react";
import ReactDOM from "react-dom";

import App from "./app/components/App";

import reducers from "./app/reducers";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";

const storeWithMiddleware = applyMiddleware(thunk)(createStore);
const store = storeWithMiddleware(reducers, composeWithDevTools());

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById("root"));