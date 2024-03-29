"use client";
import React, { useEffect, useState } from "react";

import NavbarComponent from "./Components/NavbarComponent";
import MainWeatherComponent from "./Components/MainWeatherComponent";
import FiveDayComponent from "./Components/FiveDayComponent";
import {
  convertUnixTimeToDayOfWeek,
  convertUnixTimeToPacificDate,
  convertUnixTimestampTo24Hour,
  getForecast,
  getLocationCoords,
  getWeather,
  separateArrayIntoChunks,
} from "./Dataservice/dataservice";
import { IForcast, List } from "./Interfaces/interface";

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
  const [date, setDate] = useState<string>("")

  const [fiveDayArr, setFiveDayArr] = useState<List[][]>()

  const defaultArr = [
    {
        "dt": 1712016000,
        "main": {
            "temp": 65.71,
            "feels_like": 64.09,
            "temp_min": 65.71,
            "temp_max": 65.71,
            "pressure": 1018,
            "sea_level": 1018,
            "grnd_level": 1017,
            "humidity": 45,
            "temp_kf": 0
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "clouds": {
            "all": 0
        },
        "wind": {
            "speed": 7.2,
            "deg": 327,
            "gust": 8.59
        },
        "visibility": 10000,
        "pop": 0,
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2024-04-02 00:00:00"
    }]
  
  const [day1Arr, setDay1Arr] = useState<List[]>(defaultArr)
  const [day2Arr, setDay2Arr] = useState<List[]>(defaultArr)
  const [day3Arr, setDay3Arr] = useState<List[]>(defaultArr)
  const [day4Arr, setDay4Arr] = useState<List[]>(defaultArr)
  const [day5Arr, setDay5Arr] = useState<List[]>(defaultArr)

  // const [lat, setLat] = useState<number>(10)
  // const [lon, setLon]= useState<number>(10)

  useEffect(() => {
    const getLocation = async () => {
      console.log(searchName)
      const fetchedlocation = await getLocationCoords(searchName);
      console.log(fetchedlocation);
      if (fetchedlocation.length == 1) {
        setCityName(fetchedlocation[0].name);
        setCountryName(fetchedlocation[0].country);
        getCurrent(fetchedlocation[0].lat, fetchedlocation[0].lon);
        
        let forcast = getForecast(fetchedlocation[0].lat, fetchedlocation[0].lon);
        const chunkedArrays = separateArrayIntoChunks((await forcast).list, 8)
        setFiveDayArr(chunkedArrays)
        chunkedArrays.forEach((chunk, index) => {
          switch(index+1) {
            case 1:
              setDay1Arr(chunk)
              break;
            case 2:
              setDay2Arr(chunk)
              break;
            case 3:
              setDay3Arr(chunk)
              break;
            case 4:
              setDay4Arr(chunk)
              break;
            case 5:
              setDay5Arr(chunk)
              break;
            default:
              break;
          }
      });
      } else {
        alert("You have entered a place that does not exist!");
      }
    };
    
    const getCurrent = async (lat: number, lon: number) => {
      const fetchedData = await getWeather(lat, lon);
      // console.log(fetchedData);

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

        setDate(convertUnixTimeToPacificDate(time))

        convertUnixTimeToDayOfWeek(time)
  },[time])

  const favClicked = (newCity:string) =>{
    setSearchName(newCity)
  }
  return (
  
    <div className="bg-[rgb(152,190,236)]  h-full lg:h-screen text-black">
      <NavbarComponent keydown={setSearchName} favClicked={favClicked}/>
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
        date={date}
        
        currentHour={currentHour}
        currentMin={currentMin}

        cityName={cityName}
        countryName={countryName}
      />
      <div className="mx-4 lg:mx-16 grid grid-cols-1  lg:grid-cols-5">
        <FiveDayComponent forcastArr={day1Arr}/>
        <FiveDayComponent forcastArr={day2Arr}/>
        <FiveDayComponent forcastArr={day3Arr}/>
        <FiveDayComponent forcastArr={day4Arr}/>
        <FiveDayComponent forcastArr={day5Arr}/>
      </div>
    </div>

  );
}
