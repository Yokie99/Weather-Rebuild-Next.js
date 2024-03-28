import { ICurrentWeather, IForcast, ILocation } from "../Interfaces/interface"
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
    const data:IForcast = await promise.json();
    return data
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

export const convertUnixTimeToDayOfWeek = (unixTime: number) =>{
    // Convert Unix time (in seconds) to milliseconds
    const unixTimeMillis = unixTime * 1000;

    // Get the date in Pacific Time
    const dateInPacificTime = new Date(unixTimeMillis);
    const utcOffset = -7 * 60 * 60 * 1000; // Pacific Time (PST) is UTC-7
    const pacificTimeDate = new Date(dateInPacificTime.getTime() + utcOffset);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = pacificTimeDate.getUTCDay();

    // Define an array of day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Return the day of the week
    // console.log(dayNames[dayOfWeek]) ;
    return(dayNames[dayOfWeek])
}

export function convertUnixTimeToPacificDate(unixTime: number): string{
    // Convert Unix time (in seconds) to milliseconds
    const unixTimeMillis = unixTime * 1000;

    // Get the date in Pacific Time
    const dateInPacificTime = new Date(unixTimeMillis);
    const utcOffset = -7 * 60 * 60 * 1000; // Pacific Time (PST) is UTC-7
    const pacificTimeDate = new Date(dateInPacificTime.getTime() + utcOffset);

    // Define arrays for month names and day names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Extract day, month, and year
    const dayOfWeek = pacificTimeDate.getUTCDay();
    const month = pacificTimeDate.getUTCMonth();
    const dayOfMonth = pacificTimeDate.getUTCDate();
    const year = pacificTimeDate.getUTCFullYear();

    // Format the date string
    const formattedDate = `${dayNames[dayOfWeek]}, ${monthNames[month]} ${dayOfMonth}, ${year}`;

    return formattedDate;
}

export function separateArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export function roundUp(num: number): number {
    const decimal = num - Math.floor(num);
    if (decimal >= 0.5) {
        return Math.ceil(num);
    } else {
        return Math.floor(num);
    }
}
