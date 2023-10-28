import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, BrowserRouter } from "react-router-dom"
import AppHeader from "./components/app-header/app-header";
import Profile from "./pages/account-management/profile";
import Login from "./pages/account-management/login";
import Register from "./pages/account-management/register";
import ForgotPassword from "./pages/account-management/forgot-password";
import ResetPassword from "./pages/account-management/reset-password";
import IngredientPage from "./pages/ingredient-page";
import ProtectedRoute from "./components/protected-route/protected-route";
import Orders from "./pages/orders";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <AppHeader />
          <Route exact path="/react-stellar-burger/"><App /></Route>
          <Route path="/react-stellar-burger/profile"><ProtectedRoute><Profile /></ProtectedRoute></Route>
          <Route path="/react-stellar-burger/login"><Login /></Route>
          <Route path="/react-stellar-burger/register"><Register /></Route>
          <Route path="/react-stellar-burger/forgot-password"><ForgotPassword /></Route>
          <Route path="/react-stellar-burger/reset-password"><ResetPassword /></Route>
          <Route path="/react-stellar-burger/ingredients/:id"><IngredientPage /></Route>
          <Route path="/react-stellar-burger/feed/"><Orders /></Route>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
