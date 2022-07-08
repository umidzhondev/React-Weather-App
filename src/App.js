import "./App.css";
import React, { useState } from "react";

const api = {
  key: "49b111206369736cc35e352b8f5bf4cd",
  baseurl: `https://api.openweathermap.org/data/2.5/weather?q=`,
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState({});

  const getData = async(value) => {
    const response = await fetch(`${api.baseurl}${inputValue}&APPID=${api.key}`);
    const data = await response.json();
    setWeather(data)
    setInputValue("")
  }

  const search = (e) => {
    if (e.key === "Enter") {
        getData(inputValue)
    }
  };

  const dateBuilder = (u) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jule",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[u.getDay()];
    let date = u.getDate();
    let month = months[u.getMonth()];
    let year = u.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? ((weather.main.temp-273.15 > 16)
            ? "app"
            : "app cold")
          : "app"
      }
    >
      <main className="app__main">
        <div className="app__search">
          <input
            type="text"
            className="app__input"
            value={inputValue}
            onKeyPress={search}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="app__info">
            <h3 className="app__country">
              {weather.name} , {weather.sys.country}
            </h3>
            <div className="app__date">{dateBuilder(new Date())}</div>
            <h1 className="app__temperature">
              {Math.round(weather.main.temp - 273.15)}
              <span>°C</span>
            </h1>
            <h2 className="app__status">{weather.weather[0].main}</h2>
          </div>
        ) : (
          <div className="app__info">
            <h3 className="app__country">Osh ,KG</h3>
            <div className="app__date">Friday 8 Jule 2022</div>
            <h1 className="app__temperature">
              45<span>°C</span>
            </h1>
            <h2 className="app__status">Clouds</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
