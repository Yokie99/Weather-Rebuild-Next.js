'use client'

import { Button, List } from "flowbite-react";
import sun from "../assets/sun.png";
import {useEffect, useState } from "react";
import Image from "next/image";
import { getlocalStorage } from "../Dataservice/localstorage";

interface NavbarComponentProps{
  keydown: React.Dispatch<React.SetStateAction<string>>
  favClicked: (newCity:string)=> void
  
}

function NavbarComponent(props:NavbarComponentProps) {
  const [openFav, setOpenFav] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
      // Call your function here
      props.keydown(inputValue)
    }
  };
  
  const nameClick = (city:string) =>{
    props.favClicked(city);
    setOpenFav(false)
  }
  let localstorage = getlocalStorage();
 

  return (
    <>
      <div className=" bg-[rgb(117,114,238)] absolute w-full px-4">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-3">
            <Image src={sun} alt="" />
            <h1 className="text-3xl font-bold">Weather</h1>
          </div>

          <div className="">
            <input
              className="w-full"
              type="text"
              placeholder="Search for a City"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="justify-end flex">
            <Button onClick={()=>setOpenFav(!openFav)} className="">{openFav? "Close": "Open Favorites"}</Button>
          </div>
        </div>
        {openFav ? (
          <div className="grid grid-cols-3 items-center">
            {/* do not remove empty div below! */}
            <div></div>

            <div className="">
                <h1 className="solid-line text-center text-2xl py-3">Favorites</h1>
           
              <div>
                <List className=" text-black text-2xl py-3">
                  {localstorage.map((city: string, index:number) => (
                   <List.Item className="cursor-pointer hover:text-white" onClick={()=>nameClick(city)} key={index}> {city} </List.Item>
                  ))}
                </List>
              </div>
            </div>
            {/* do not remove empty div below! */}
            <div></div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default NavbarComponent;
