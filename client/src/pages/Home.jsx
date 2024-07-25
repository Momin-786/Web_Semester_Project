import React from "react";
import { useOutletContext } from "react-router-dom";
import TimeDate from "../components/TimeDate";
import CurrentWeather from "../components/CurrentWeather";

const Home = () => {
  const { darkMode, degUnit, setDegUnit, currentWeatherData } =
    useOutletContext();

    if (!currentWeatherData) return <div>Loading...</div>;

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    }}>
      <TimeDate
        darkMode={darkMode}
        currentWeatherData={currentWeatherData}
      />
      <CurrentWeather
        darkMode={darkMode}
        degUnit={degUnit}
        setDegUnit={setDegUnit}
        currentWeatherData={currentWeatherData}
      />
      
    </div>
  );
};

export default Home;
