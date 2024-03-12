"use client";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";


const Page = () => {
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      <div className="bg-gray-50 dark:bg-gray-900 col-span-2" style={{ backgroundColor: "#111827" }}>
        <Hero
          height={400}
          isVisible={false}
          path="/asset/img/login.png"
          title="Reserve Your Slot"
        />
       <div style={{ backgroundColor: "#111827" }} className="flex justify-center"> 
 
  <iframe
    src="https://fanash-beauty.salonized.com/widget_bookings/new"
    title="Embedded Content"
    className="w-full h-[90vh] md:w-[40%] md:h-[120vh] "
  
  > 
</iframe>



</div>

      </div>
      <div className="col-span-1"></div>
    
    </div>
  );
};

export default Page;
