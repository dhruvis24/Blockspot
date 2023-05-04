import { createBrowserRouter } from "react-router-dom";
import HomePage from "../screens/HomePage";
import DiscoverPage from "../screens/DiscoverPage";
import AddProductPage from "../screens/AddProductPage";
import SingleProductPage from "../screens/SingleProductPage";
import ResearchPage from "../screens/ResearchPage";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import TermsAndConditions from "../screens/TermsAndConditions";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

    {
        path: "/login",
        element: <LoginPage />,
        // loader: rootLoader,
    },

    {
        path: "/register",
        element: <RegisterPage />,
    },

    {
        path: "/discover",
        element: <DiscoverPage />,
    },

    {
        path: "/product/:productID",
        element: <SingleProductPage />,
    },

    {
        path: "/research",
        element: <ResearchPage />,
    },

    {
        path: "/connect",
        element: <AddProductPage />,
    },

    {
      path: "/t&c",
      element: <TermsAndConditions />,
    }
      
]);
