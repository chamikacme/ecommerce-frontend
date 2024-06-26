import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import NotFoundPage from "@/pages/common/NotFoundPage";
import HomePage from "@/pages/home/HomePage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProductPage from "@/pages/product/ProductPage";
import NewProductPage from "@/pages/newproduct/NewProductPage";
import MyProductsPage from "@/pages/my-products/MyProductsPage";
import FavoriteProductsPage from "@/pages/favorite-products/FavoriteProductsPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
    ],
  },
  {
    element: <PublicRoute element={<AuthLayout />} />,
    children: [
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/register",
        element: <SignUpPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    element: <ProtectedRoute element={<MainLayout />} />,
    children: [
      {
        path: "/products/new",
        element: <NewProductPage />,
      },
      {
        path: "/products/:id/edit",
        element: <NewProductPage />,
      },
      {
        path: "/products/my-products",
        element: <MyProductsPage />,
      },
      {
        path: "/products/favorites",
        element: <FavoriteProductsPage />,
      },
    ],
  },
]);

export default router;
