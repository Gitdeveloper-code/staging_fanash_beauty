import Image from 'next/image'
import Link from 'next/link';
import Script from 'next/script';
import Hero from './components/Hero';
import { THREADING, WAXING } from "./constants"
import Service from "./components/Service"
import Button from './components/Button';
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import {getTranslations} from 'next-intl/server';
import StickyButton from "./components/StickyButton"


async function connectToDatabase(){
  try{
      if (mongoose.connection.readyState === 0) {
          await mongoose.connect(ConnectionString);
        }
        return true

  }
  catch (error){
      return false
  }

}

const getServices = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/services", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return { res: "Error" };
  }
};



async function isConnectedDb() {
  const isConnected = await connectToDatabase();
  
  if (isConnected) {
      console.log('Connected to the database!');
      // Your code here
  } else {
      console.log('Failed to connect to the database.');
  }
}



 const Page = async () => {
const t = await getTranslations('Testimonial');
const home = await getTranslations('Home');
  const servicesApi= await getServices()
  console.log(servicesApi)

   const services = [
    { path: "/asset/img/service1.png", title: THREADING.title, details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Threading').map((item: { category: string }) => item) },
    { path: "/asset/img/service10.png", title: WAXING.title, details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Waxing').map((item: { category: string }) => item) },
    { path: "/asset/img/service3.png", title: "SUGAR EPILATION", details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Sugar Epilation').map((item: { category: string }) => item) },
    { path: "/asset/img/service9.png", title: "FACIAL", details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Facial').map((item: { category: string }) => item) },
    { path: "/asset/img/service5.png", title: "MANICURE", details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Manicure').map((item: { category: string }) => item) },
    { path: "/asset/img/service6.png", title: "PEDICURE", details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Pedicure').map((item: { category: string }) => item) },
    { path: "/asset/img/service8.png", title: "MASSAGE", details: (servicesApi.result ?? []).filter((item: { category: string }) => item.category === 'Massage').map((item: { category: string }) => item) },
    // Add more services as needed
];


  isConnectedDb()


  return (
    <div className="relative cursor-default w-full h-full" >
  
      <div>
        <div>

          <Hero
          path="/asset/img/hero.webp"
          height={600}
          isVisible={true}
          title='Fanash Beauty'
          description={home("fanashbeautydescription")}
          />
        
          <h3
            className="pt-8 pb-8 text-lg uppercase sm:text-4xl lg:text-4xl text-tertiary text-center"

          >
            {home("serviceweoffer")}
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2'>
  {/* Grid 1 */}
  <div className='bg-gray-300 col-span-1 sm:order-2'>
    <Image className='w-full h-full' src='/asset/img/make-up.jpeg' width={500} height={500} alt='' />
  </div>

  {/* Grid 2 */}
  <div className='p-10 col-span-1 items-center justify-center text-center sm:order-1'>
    <h2 className="mt-2 text-3xl text-white md:text-5xl dark:text-gray-300">
       {home("makeup")}
    </h2>
    <div className="line-container w-full mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="line bg-tertiary" style={{ height: 2, width: '40%' }}></div>
    </div>
    <p className="m-2 text-base leading-7 text-white dark:text-gray-400 text-justify p-5 mx-5">
      {home("makeupdescription")}
    </p>
    <Button title='Learn More' />
  </div>
</div>


          {/* Services on Home Page */}
          <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 mt-10 '>
               {/* Grid 1 */}
               <div className='bg-gray-300 col-span-1'>
              <Image className='w-full h-full' src='/asset/img/bridal.jpeg' width={500} height={500} alt='' />
            </div>
            {/* Grid 2 */}
          <div className='p-10 col-span-1 items-center justify-center text-center'>
              <h2 className="mt-10 text-3xl text-center  text-white md:text-5xl  dark:text-gray-300 ">
                {home("hairstyling")} 
              </h2>
              <div className="line-container w-full mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="line bg-tertiary" style={{ height: 2, width: '40%' }}>

                </div>
              </div>
              <p className="m-2 text-center text-base leading-7 text-white dark:text-gray-400  p-5 mx-5">
              {home("hairstylingdescription")}             </p>
              <Button
                title='Learn More'
              /></div>

           
          </div>

              <div className=" mx-auto px-12 grid w-full grid-cols-1 gap-10 pb-12 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:gap-10">

    
    {services.map((service, index) => (
          <Service key={index} path={service.path} title={service.title} details={service.details} />
        ))}   
        
    </div>

          <section className=" dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
         <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 text-tertiary dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-2xl font-medium text-white dark:text-white">{t("testimonialdescription")}</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <Image className="w-6 h-6 rounded-full" src="/asset/img/team.png" alt="profile picture" height={500} width={500}/>
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-500 dark:text-white">Micheal Gough</div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">CEO at Google</div>
              </div>
          </figcaption>
      </figure>
  </div>
</section>


        </div>
      </div>


<div className="block group-hover:hidden">
                 
                <Link href='\booking2'>
                    <StickyButton title="" icon="/asset/img/calendar.png" />
                  </Link>  
                </div>
    </div>

  )
}

export default Page
