import React, { useState } from "react";
import Faq from "../components/Faq";
import StickyButton from "../components/StickyButton"
import Link from 'next/link'

   
 const Page = () => {
  return (
         <>
   <Faq/>
 <div className="block group-hover:hidden">
                 
                <Link href='\booking2'>
                    <StickyButton title="" icon="/asset/img/calendar.png" />
                  </Link>  
                </div>

</>

            
  );
};

export default Page;


