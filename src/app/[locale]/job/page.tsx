"use client"
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import StickyButton from "../components/StickyButton"
import Link from 'next/link'

interface Job {
  category: string;
  design: string;
  type: string;
}


const Page: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        console.log("Fetching jobs...");
       let response= await fetch("https://stage-fanashbeauty.netlify.app/api/jobs", {cache:"no-store"})
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobs(data.result || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Handle error gracefully
      }
    };

    getJobs();
  }, []);

  return (
    <div className='items-center'>  
      <Hero
        height={400}
        isVisible={false}
        path='/asset/img/hero_opening.png'
        title='Featured Job'
      />
       <div className='flex justify-center flex-wrap'>
      {jobs.map((item: Job, index: number) => (
        <div key={index} id='openings' className='container p-5 m-5 md:m-5 bg-white border rounded-xl md:w-[90%] mx-auto'>
          <div className='flex flex-col md:flex-row justify-between m-2'>
            <div className='md:mr-5 mb-5 md:mb-0'>
              <h3 className='inline-block px-2.5 py-1 text-xs text-white font-medium bg-tertiary uppercase rounded-md mb-2 md:mb-4'>
                {item.category}
              </h3>
              <h1 className='text-xl text-black font-heading mb-2.5 font-bold leading-snug'>
                {item.design}
              </h1>
              <p>{item.type}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
        

                

    </div>
  );
};

export default Page;
