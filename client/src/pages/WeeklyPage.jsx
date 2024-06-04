import React from "react";
import DaysForecast from "../components/DaysForecast";
import { useOutletContext } from "react-router-dom";

const WeeklyPage = () => {
  const { darkMode, degUnit, forecastWeatherData } = useOutletContext();

  if (!forecastWeatherData) return <div>Loading...</div>;
  return (
    <DaysForecast
      darkMode={darkMode}
      degUnit={degUnit}
      forecastWeatherData={forecastWeatherData}
    />
  );
};

export default WeeklyPage;
