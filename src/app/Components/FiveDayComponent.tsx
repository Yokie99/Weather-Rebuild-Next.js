'use client'
import React, { useState } from "react";
import upBlock from "../assets/up_arrow_block.png";
import downBlock from "../assets/down_arrow_block.png";
import sun from "../assets/sun.png";
import Image from "next/image";
import { List } from "../Interfaces/interface";
import { convertUnixTimeToDayOfWeek, roundUp} from "../Dataservice/dataservice";


interface FiveDayComponentProps {
 forcastArr: List[]
}
const FiveDayComponent = (props: FiveDayComponentProps) => {
let icon = "01d"
let dayofWeek = "XXXX"
if(props.forcastArr.length == 8){
  icon = props.forcastArr[0].weather[0].icon
  dayofWeek = convertUnixTimeToDayOfWeek(props.forcastArr[3].dt)
}

//  console.log(props.forcastArr)
let tempMax = 0
if(props.forcastArr){
  for(let i = 0; props.forcastArr?.length > i; i++){
    if(props.forcastArr[i].main.temp_max > tempMax){
      tempMax = props.forcastArr[i].main.temp_max
    }
  }
}
  

let tempMin = 9999
if(props.forcastArr){
  for(let i = 0; props.forcastArr?.length > i; i++){
    if(props.forcastArr[i].main.temp_min < tempMin){
      tempMin = props.forcastArr[i].main.temp_min
    }
  }
}

  
  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center border-black border-4 pt-10 max-w-screen">
        <h1 className="text-4xl pb-5">{dayofWeek}</h1>
        <img  className='iconImage' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />


        <div className="flex align-middle items-center p-6 text-2xl">
          <div className="flex ">
            <Image className="pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]" src={upBlock} alt="" />
            <p>High:</p>
          </div>
          <p>{roundUp(tempMax)}°F</p>
          
        </div>
        <div className="flex align-middle items-center text-2xl pb-10">
          <div className="flex">
            <Image className="pe-4 smallScreenIcons lg:w-[2.5vw] lg:h-[2vw]" src={downBlock} alt="" />
            <p>Low:</p>
          </div>
          <p>{roundUp(tempMin)}°F</p>
          
        </div>
        
      </div>
    </>
  );
};

export default FiveDayComponent;
