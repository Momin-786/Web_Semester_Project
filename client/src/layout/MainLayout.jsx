import React, { useEffect, useState } from "react";
import { fetchCurrentWeather, fetchForecastWeather } from "../utils/api";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [degUnit, setDegUnit] = React.useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);

  const handleDarkMode = () => {
    setDarkMode((oldDarkMode) => !oldDarkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  function handleGetCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const currentData = await fetchCurrentWeather(location);
        setCurrentWeatherData(currentData);

        const forecastData = await fetchForecastWeather(location);
        const indicesToSelect = [8, 16, 24, 32, 39];
        setForecastWeatherData(
          forecastData.list.filter((item, index) =>
            indicesToSelect.includes(index)
          )
        );

        const hourlyData = await fetchForecastWeather(location);
        setHourlyWeatherData(hourlyData.list.splice(0, 5));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [location]);

  const HandleOnSearchChange = (searchData) => {
    setLocation({
      lat: searchData.value.split(" ")[0],
      lon: searchData.value.split(" ")[1],
    });
  };

  return (
    <>
      <Header
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
        onSearchChange={HandleOnSearchChange}
        handleGetCurrentLocation={handleGetCurrentLocation}
      />
      <main>
        <Outlet
          context={
            ((darkMode = { darkMode }),
            (currentWeatherData = { currentWeatherData }),
            (forecastWeatherData = { forecastWeatherData }),
            (hourlyWeatherData = { hourlyWeatherData }),
            (degUnit = { degUnit }),
            (setDegUnit = { setDegUnit }))
          }
        />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default MainLayout;
