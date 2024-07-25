import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import HourlyPage from "./pages/HourlyPage";
import WeeklyForecast from "./pages/WeeklyPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layout/MainLayout";
import WeatherReport from "./pages/WeatherReport";
import User from "./pages/User";

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
          element: <HourlyPage />,
        },

        {
          path: "weekly-forecast",
          element: <WeeklyForecast />,
        },
        {
          path: "weather-reports",
          element: <WeatherReport />,
        },
        {
          path: "user",
          element: <User />,
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
