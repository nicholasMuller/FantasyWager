import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import HomeScreen from "./pages/HomeScreen.jsx";
import LoginScreen from "./pages/user/LoginScreen.jsx";
import RegisterScreen from "./pages/user/RegisterScreen.jsx";
import ProfileScreen from "./pages/user/ProfileScreen.jsx";
import UserBetsScreen from "./pages/user/UserBetsScreen.jsx";
import PrivateRoute from "./components/common/PrivateRoute.jsx";
import NFLOddsScreen from "./pages/odds/NFLOddsPage.jsx";
import NBAOddsScreen from "./pages/odds/NBAOddsPage.jsx";
import NHLOddsScreen from "./pages/odds/NHLOddsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/bets" element={<UserBetsScreen />} />
      </Route>
      <Route path="/NFLodds" element={<NFLOddsScreen />}></Route>
      <Route path="/NBAodds" element={<NBAOddsScreen />}></Route>
      <Route path="/NHLodds" element={<NHLOddsScreen />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
