import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import {HelmetProvider} from "react-helmet-async"
import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assest/styles/bootstrap.custom.css";
import "./assest/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import Order from "./screens/Order";
import OrderList from "./screens/admin/OrderList";
import Profile from "./screens/Profile";
import ProductList from "./screens/admin/ProductList";
import ProductEdit from "./screens/admin/ProductEdit";
import UserList from "./screens/admin/UserList";
import UserEdit from "./screens/admin/UserEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
reportWebVitals();
