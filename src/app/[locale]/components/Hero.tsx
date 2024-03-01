"use client"

import React from 'react'
import GetStarted from './GetStarted'
import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'
import Button from "./Button"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type HeroProps={
  path:string
  height:number
  isVisible:boolean
  title:string
  description?:string
  
}



// ... (existing imports)

const Hero = ({ path, height, isVisible, title, description }: HeroProps) => {
  // ... (existing state and styles)

  return (
    <section
      className=' bg-cover bg-no-repeat w-full'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))  ,url(${path})`,
        height: height,
      }}
    >
      <div>
        <Navbar />
      </div>

      <div id="home" className={`flex md:flex-row flex-col sm:py-16 py-6 bg-no-repeat bg-cover`}>
        <div className="flex-1 flex justify-center items-start flex-col xl:px-4 sm:px-16  ">
          <div className="flex flex-col justify-between items-center w-full relative mt-20">
            <h1 className={`font-mono ss:text-[68px] text-[52px] ss:leading-[100.8px] leading-[75px] w-full text-center text-white `}>
              {title}
            </h1>
            <p className="text-white font-poppins text-center font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[600px] mt-5">
              {description}
            </p>
          </div>
          <div className="line-container w-full mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="line bg-tertiary" style={{ height: 2, width: '25%' }}></div>
          </div>

          <div className="ss:hidden flex justify-center text-center w-full mt-10 px-2">
            {isVisible && (
              <div className="flex gap-3 items-center">
                <div className="hidden group-hover:block">
                  <Link href='\booking2'>
                    <Button title="Book Your Slot" icon="/asset/img/calendar-clicked.png" />
                  </Link>
                </div>
                <div className="block group-hover:hidden">
                 
                <Link href='\booking2'>
                    <Button title="Book Your Slot" icon="/asset/img/calendar.png" />
                  </Link>  
                </div>
             
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
