import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import HourlyForecast from "./pages/HourlyForecast";
import WeeklyForecast from "./pages/WeeklyForecast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layout/MainLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "hourly-forecast",
          element: <HourlyForecast />,
        },

        {
          path: "weekly-forecast",
          element: <WeeklyForecast />,
        },

        {
          path: "login",
          element: <Login />,
        },

        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "*",
          element: <div>Not found</div>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
