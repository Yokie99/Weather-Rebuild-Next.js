import { ICurrentWeather, ILocation } from "../Interfaces/interface"
import APIKey from "../environment/environment"

// let city = "manteca"
let APIkey = APIKey;
// let lat = "37.9577";
// let lon = "-121.2908";
let units = "imperial";


export const getWeather = async (lat:number, lon:number) =>{
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`)
    const data:ICurrentWeather = await promise.json();
    // console.log(data);
    return data;
    // from Main : Feels like, humidity, Temp, Temp Max, Temp Min, 
// from wind: speed
// from sys: sunrise, sunset
// from weather[0]: description, icon, 
}

export const getLocationCoords = async (city:string) =>{
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${APIkey}`)
    const data:ILocation[] = await promise.json();
    // console.log(data[0].country, data[0].name, data[0].lat, data[0].lon);
    return data
}

export const getForecast = async (lat:number, lon:number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${units}`)
    const data = await promise.json();
    console.log(data)
}

export const convertUnixTimestampTo24Hour = (unixTimestamp:number) => {
    // Convert Unix timestamp to milliseconds
    var milliseconds = unixTimestamp * 1000;
    
    // Create a new Date object
    var date = new Date(milliseconds);
    
    // Get hour, minute, and second components
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    
    // Return the time in 24-hour format
    return {hours, minutes};
  }