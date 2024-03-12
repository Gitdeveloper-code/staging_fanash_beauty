"use client"
import Button from "./Button";
import { useState } from "react";
  import Image from "next/image";
  import Link from "next/link"
import StarButton from './StarButton'
import { useTranslations } from 'next-intl';
type ServiceProps={
  path:string;
  title:string;
  details: { name: string; price: string; time: string }[];

}

 const Service = ({path,title,details,}:ServiceProps) => {
 const ser_vice = useTranslations('Services');
 

 
  return (
 <div className="relative cursor-default w-full h-full" >

    


   

</div>

  )
}

export default Service;
