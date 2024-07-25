import React from "react";
import HourlyForecast from "../components/HourlyForecast";
import { useOutletContext } from "react-router-dom";

const HourlyPage = () => {
  const { darkMode, degUnit, hourlyWeatherData } = useOutletContext();

  if(!hourlyWeatherData) return <div>Loading...</div>

  return (
    <>
      <HourlyForecast
        darkMode={darkMode}
        degUnit={degUnit}
        hourlyWeatherData={hourlyWeatherData}
      />
    </>
  );
};

export default HourlyPage;
