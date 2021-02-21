import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [loaded, setLoaded] = useState("false");
  let [city, setCity] = useState("");
  let [temp, setTemp] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  let apiKey = "af173d370d3263e90c511e8cd78a494a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(url).then(showData);
  }

  function updateCity(response) {
    setCity(response.target.value);
  }

  function showData(response) {
    console.log(response);
    setLoaded(true);
    setTemp(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }

  let form = (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          placeholder="Enter a city..."
          autoFocus={true}
          onChange={updateCity}
        />
        <input type="button" value="Submit" />
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div className="weather">
          <h2>
            {" "}
            {city}
            <ul>
              <li> Current Temp: {temp}° F </li>
              <li> Description: {description} </li>
              <li> Humidity: {humidity}% </li>
              <li> Wind: {wind} mph </li>
              <li>
                {" "}
                <img src={iconUrl} alt="Weather Icon" />{" "}
              </li>
            </ul>
          </h2>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
