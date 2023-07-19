import React from "react";
import ReactDom from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./index.css";
import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDom.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="26497861188-amnd9v0p656k5b8m4d362hms301h02q5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
