import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import Main from "./components/main/main";
import AppHeader from "./components/app-header/app-header";
import Profile from "./pages/account-management/profile";
import Login from "./pages/account-management/login";
import Register from "./pages/account-management/register";
import ForgotPassword from "./pages/account-management/forgot-password";
import ResetPassword from "./pages/account-management/reset-password";
import IngredientPage from "./pages/ingredient-page";
import ProtectedRoute from "./components/protected-route/protected-route";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import Feed from "./pages/feed";
import Orders from "./pages/account-management/orders";
import { FeedOrder, ProfileOrder } from "./components/order-info";

export default function App() {

  const { goBack } = useHistory()

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact ><Main /></Route>
        <Route path="/profile" exact ><ProtectedRoute><Profile /></ProtectedRoute></Route>
        <Route path="/profile/orders" exact ><ProtectedRoute><Orders /></ProtectedRoute></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/forgot-password"><ForgotPassword /></Route>
        <Route path="/reset-password"><ResetPassword /></Route>
        <Route path="/ingredients/:id"><IngredientPage /></Route>
        <Route path="/feed" exact ><Feed /></Route>
        <Route path="/feed/:id"><FeedOrder className="pt-10" /></Route>
        <Route path="/profile/orders/:id"><ProtectedRoute><ProfileOrder className="pt-10" /></ProtectedRoute></Route>
      </Switch>
      {background &&
        <Switch>
          <Route path="/ingredients/:id">
            <Modal toggle={goBack} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal toggle={goBack}>
              <FeedOrder />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <ProtectedRoute>
              <Modal toggle={goBack}>
                <ProfileOrder />
              </Modal>
            </ProtectedRoute>
          </Route>
        </Switch>
      }
    </>
  )
}