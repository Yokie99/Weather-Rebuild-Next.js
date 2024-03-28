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
  
  
  interface Coord {
    lat: number;
    lon: number;
  }

  export interface IForcast { 
    list: List[]
  }

  export interface List{
    dt:number,
    main: {
      temp_max:number,
      temp_min:number,
    }
    weather: Weather[]
  }