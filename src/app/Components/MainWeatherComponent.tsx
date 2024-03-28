'use client'
import React, { useEffect } from 'react'
import up from '../assets/up_arrow.png'
import upBlock from '../assets/up_arrow_block.png'
import down from '../assets/down_arrow.png'
import downBlock from '../assets/down_arrow_block.png'
import water from '../assets/water_drop.png'
import wind from '../assets/wind.png'
import star from '../assets/star_unfilled.png'
import { getLocationCoords } from '../Dataservice/dataservice'

import Image from 'next/image'


interface MainWeatherComponentProps{
    desc: string,
    feelsLike:number,
    humidity:number,
    temp:number,
    tempMax:number,
    tempMin:number,
    windSpd:number,
    icon: string,
    
    SRHr:number,
    SRMin:number,
    SSHr:number,
    SSMin:number,


    cityName: string,
  countryName: string,
  currentHour:number,
  currentMin:number

}

const MainWeatherComponent = (props: MainWeatherComponentProps) => {



    return (
        <div className='bg-blue-400 w-screen pt-[5rem] pb-12'>
            <div className='flex justify-between mx-16 pb-4'>
                <div className=' text-3xl'>
                    <h1>Local Time:</h1>
                    <p>{props.currentHour}:{props.currentMin}</p>
                </div>

                <div className='text-center'>
                    <h1 className='text-5xl'>{props.cityName},{props.countryName}</h1>
                    <p className='text-3xl'>Mon, March 25, 2024</p>
                </div>

                <Image width={50} height={900} className='object-contain' src={star} alt="" />
            </div>

            <div className='bg-white border-black border-solid border-[3px] mx-16'>
                <div className='grid grid-cols-4 px-4 py-6'>

                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl'>{props.desc}</h1>
                        <img  className='iconImage' src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <p className=' text-8xl'>{props.temp}°F</p>
                        <p className='text-3xl'>Feels Like {props.feelsLike}°F</p>
                    </div>

                    <div className='grid grid-rows-3 justify-center'>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={upBlock} alt="" />
                            <p>High: {props.tempMax}°F</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={downBlock} alt="" />
                            <p>Low: {props.tempMin}°F</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={water} alt="" />
                            <p>Humidity: {props.humidity}</p>
                        </div>

                    </div>
                    <div className='grid grid-rows-3 justify-center'>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={wind} alt="" />
                            <p>Wind: {props.windSpd}mph</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={up} alt="" />
                            <p>Sunrise: {props.SRHr}:{props.SRMin}</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 icons' src={down} alt="" />
                            <p>Sunset: {props.SSHr}:{props.SSMin}</p>
                        </div>

                    </div>



                </div>
            </div>


        </div>
    )
}

export default MainWeatherComponent