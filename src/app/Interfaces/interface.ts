export interface ILocation{
    lat:number,
    lon:number,
    country: string,
    name:string
    
}





export interface ICurrentWeather {
  dt: number,
    main: {
      feels_like:number,
      humidity: number,
      temp:number,
      temp_max:number,
      temp_min:number
    }
    wind:{
      speed:number
    }
    sys:{
      sunrise:number
      sunset:number
    }
    weather: Weather[]

  }
   interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
    rain?: Rain;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
 
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Sys {
    pod: string;
  }
  
  interface Rain {
    '3h': number;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface Coord {
    lat: number;
    lon: number;
  }