"use client";
import React, { useEffect, useState } from "react";

import NavbarComponent from "./Components/NavbarComponent";
import MainWeatherComponent from "./Components/MainWeatherComponent";
import FiveDayComponent from "./Components/FiveDayComponent";
import {
  convertUnixTimeToDayOfWeek,
  convertUnixTimestampTo24Hour,
  getForecast,
  getLocationCoords,
  getWeather,
} from "./Dataservice/dataservice";

export default function Home() {
  const [feelsLike, setFeelsLike] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [temp, setTemp] = useState<number>(0);
  const [tempMax, setTempMax] = useState<number>(0);
  const [tempMin, setTempMin] = useState<number>(0);
  const [windSpd, setWindSpd] = useState<number>(0);
  const [icon, setIcon] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [sunrise, setSunrise] = useState<number>(0);
  const [sunset, setSunset] = useState<number>(0);

  const [searchName, setSearchName] = useState<string>("manteca");
  const [cityName, setCityName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [time, setTime] = useState<number>(9999);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [currentMin, setCurrentMin] = useState<number>(0);
  const [SRHr, setSRHr] = useState<number>(0);
  const [SRMin, setSRMin] = useState<number>(0);
  const [SSHr, setSSHr] = useState<number>(0);
  const [SSMin, setSSMin] = useState<number>(0);

  // const [lat, setLat] = useState<number>(10)
  // const [lon, setLon]= useState<number>(10)

  useEffect(() => {
    const getCurrent = async (lat: number, lon: number) => {
      const fetchedData = await getWeather(lat, lon);
      console.log(fetchedData);

      setDesc(fetchedData.weather[0].description);
      setFeelsLike(fetchedData.main.feels_like);
      setHumidity(fetchedData.main.humidity);
      setIcon(fetchedData.weather[0].icon);
      setTemp(fetchedData.main.temp);
      setTempMax(fetchedData.main.temp_max);
      setTempMin(fetchedData.main.temp_min);
      setWindSpd(fetchedData.wind.speed);
      setSunrise(fetchedData.sys.sunrise);
      setSunset(fetchedData.sys.sunset);

      setTime(fetchedData.dt);
    };

    const getLocation = async () => {
      const fetchedlocation = await getLocationCoords(searchName);
      console.log(fetchedlocation);
      if (fetchedlocation.length == 1) {
        setCityName(fetchedlocation[0].name);
        setCountryName(fetchedlocation[0].country);
        getCurrent(fetchedlocation[0].lat, fetchedlocation[0].lon);
        
        getForecast(fetchedlocation[0].lat, fetchedlocation[0].lon);
      } else {
        alert("You have entered a place that does not exist!");
      }
    };
    getLocation();
  }, [searchName]);

  useEffect(()=>{
    console.log(time);
        let convertedtime = convertUnixTimestampTo24Hour(time);
        setCurrentHour(convertedtime.hours)
        setCurrentMin(convertedtime.minutes)
        let convertSunrise = convertUnixTimestampTo24Hour(sunrise)
        setSRHr(convertSunrise.hours)
        setSRMin(convertSunrise.minutes)
        let convertSunset = convertUnixTimestampTo24Hour(sunset)
        setSSHr(convertSunset.hours)
        setSSMin(convertSunset.minutes)

        convertUnixTimeToDayOfWeek(time)
  },[time])
  return (
  
    <div className="bg-blue-400 h-full lg:h-screen text-black">
      <NavbarComponent keydown={setSearchName} />
      <MainWeatherComponent
        desc={desc}
        feelsLike={feelsLike}
        humidity={humidity}
        temp={temp}
        tempMax={tempMax}
        tempMin={tempMin}
        windSpd={windSpd}
        icon={icon}
        SRHr={SRHr}
        SRMin={SRMin}
        SSHr={SSHr}
        SSMin={SSMin}
        
        currentHour={currentHour}
        currentMin={currentMin}

        cityName={cityName}
        countryName={countryName}
      />
      <div className="mx-16 grid grid-cols-5">
        <FiveDayComponent />
        <FiveDayComponent />
        <FiveDayComponent />
        <FiveDayComponent />
        <FiveDayComponent />
      </div>
    </div>

  );
}
