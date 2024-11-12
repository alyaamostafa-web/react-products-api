import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import CookiseServices from "../services/CookiseServices";
import AppLayout from "../pages/Layout";
import HomePage from "../pages";
import ProductsPage from "../pages/Products";
import ProductDetailsPage from "../pages/ProductDetails";
import PrivateRoute from "../components/auth/PrivateRoute";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import AdminDashboard from "../pages/Dashboard";
import DashboardProducts from "../pages/Dashboard/DashboardProducts";



const token = CookiseServices.get('jwt');

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage/>} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage isAuthenticated={token} />} />

      {/* // * Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAllowed={token} redirectPath="/login">
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard/>} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="categories" element={<h2>categories</h2>} />
      </Route>
      <Route path="*" element={<h2>Page not found!</h2>} />
    </>
  )
);

export default router;
