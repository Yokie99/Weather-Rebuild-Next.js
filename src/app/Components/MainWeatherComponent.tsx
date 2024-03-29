'use client'
import React, { useEffect, useState } from 'react'
import up from '../assets/up_arrow.png'
import upBlock from '../assets/up_arrow_block.png'
import down from '../assets/down_arrow.png'
import downBlock from '../assets/down_arrow_block.png'
import water from '../assets/water_drop.png'
import wind from '../assets/wind.png'
import star from '../assets/star_unfilled.png'
import starFilled from '../assets/star_filled-.png'
import { roundUp } from '../Dataservice/dataservice'

import Image from 'next/image'
import { getlocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../Dataservice/localstorage'


interface MainWeatherComponentProps {
    desc: string,
    feelsLike: number,
    humidity: number,
    temp: number,
    tempMax: number,
    tempMin: number,
    windSpd: number,
    icon: string,

    SRHr: number,
    SRMin: number,
    SSHr: number,
    SSMin: number,
    date: string,


    cityName: string,
    countryName: string,
    currentHour: number,
    currentMin: number

}

const MainWeatherComponent = (props: MainWeatherComponentProps) => {

    const [isFav, setIsFav] = useState<boolean>(false)
    useEffect(()=>{
        
    },[isFav])

    const handleFavClick = () => {
        let localstorage = getlocalStorage();
        if (localstorage.includes(props.cityName)) {
            removeFromLocalStorage(props.cityName)
            setIsFav(false)
        } else {
            saveToLocalStorage(props.cityName)
            setIsFav(true)
        }
        // localstorage.map((city: string) =>{
        //     if(city == props.cityName){
        //         removeFromLocalStorage(city)

        //     }
        //     else{
        //         saveToLocalStorage(props.cityName)
        //     }
        // })

    }

    return (
        <div className='w-screen pt-[5rem] pb-12'>
            <div className='flex justify-between lg:mx-16 pb-4'>
                <div className=' text-xl lg:text-3xl'>
                    <h1>Local Time:</h1>
                    <p>{props.currentHour}:{props.currentMin}</p>
                </div>

                <div className='text-center'>
                    <h1 className='text-3xl lg:text-5xl'>{props.cityName},{props.countryName}</h1>
                    <p className='text-xl lg:text-3xl'>{props.date}</p>
                </div>
                {isFav ? <Image width={50} height={900} onClick={handleFavClick} className='object-contain' src={starFilled} alt="" />
                :<Image width={50} height={900} onClick={handleFavClick} className='object-contain' src={star} alt="" />
                }
                
            </div>

            <div className='bg-white border-black border-solid border-[3px] mx-4 lg:mx-16'>
                <div className='grid grid-cols-4 px-4 py-6'>

                    <div className='flex flex-col items-center justify-center col-span-2 lg:col-span-1'>
                        <h1 className='text-xl lg:text-3xl'>{props.desc}</h1>
                        
                        <img className='iconImage' src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
                    </div>

                    <div className='flex flex-col items-center justify-center col-span-2 lg:col-span-1'>
                        <p className='text-5xl lg:text-8xl'>{roundUp(props.temp)}°F</p>
                        <p className=' text-sm lg:text-3xl'>Feels Like {roundUp(props.feelsLike)}°F</p>
                    </div>

                    <div className='grid grid-rows-3 justify-center col-span-2 gap-2 lg:gap-0 lg:col-span-1'>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={upBlock} alt="" />
                            <p>High: {roundUp(props.tempMax)}°F</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={downBlock} alt="" />
                            <p>Low: {roundUp(props.tempMin)}°F</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={water} alt="" />
                            <p>Humidity: {props.humidity}</p>
                        </div>

                    </div>
                    <div className='grid grid-rows-3 justify-center col-span-2 gap-2 lg:gap-0  lg:col-span-1'>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={wind} alt="" />
                            <p>Wind: {props.windSpd}mph</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={up} alt="" />
                            <p>Sunrise: {props.SRHr}:{props.SRMin}</p>
                        </div>
                        <div className='flex justify-between align-middle items-center max-w-48'>
                            <Image className='pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]' src={down} alt="" />
                            <p>Sunset: {props.SSHr}:{props.SSMin}</p>
                        </div>

                    </div>



                </div>
            </div>


        </div>
    )
}

export default MainWeatherComponent