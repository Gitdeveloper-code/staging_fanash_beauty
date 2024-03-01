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
    const response = await fetch("https://fanash-beauty.netlify.app/api/services", { cache: "no-store" });

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



{/* 
          <h3
            className="pt-8 pb-8 text-lg uppercase  lg:text-4xl text-tertiary text-center"

          >
            Services We Offer
          </h3>
          <div
            className=" border-secondary grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 md:gap-0 md:pt-0 lg:grid-cols-2 bg-[#f8eee7]"
          >
            <div className="group rounded px-8 py-12 shadow hover:bg-primary bg-cover bg-no-repeat"
              style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),  url(/asset/img/hairstyling.jpeg)"
              }}

            >
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28" >
                <div className="hidden group-hover:block">
                  <Image width={100} height={100}
                    src="/asset/img/hair-dryer.png"
                    alt="Hair"

                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image width={100} height={100}
                    src="/asset/img/hair-dryer.png"
                    alt="Hair"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className=" pt-8 text-lg font-semibold uppercase text-primary hover:text-secondary group-hover:text-yellow lg:text-xl"
                >
                  Hair Styling
                </h3>
                <p className="text-white pt-4 text-sm group-hover:text-primary md:text-base"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <div className="group rounded px-8 py-12 shadow hover:bg-primary bg-cover bg-no-repeat"
              style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(/asset/img/bridal.jpeg",
              }}>
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28" >
                <div className="hidden group-hover:block">
                  <Image width={100} height={100}
                    src="/asset/img/makeup.svg"
                    alt="Make Up Icon"

                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image width={100} height={100}
                    src="/asset/img/makeup.svg"
                    alt="Make Up Icon"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className=" pt-8 text-lg font-semibold uppercase text-primary hover:text-secondary group-hover:text-yellow lg:text-xl"
                >
                  Bridal Make-Up
                </h3>
                <p className="text-white pt-4 text-sm group-hover:text-primary md:text-base"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="group rounded px-8 py-12 shadow hover:bg-primary bg-cover bg-no-repeat"
              style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(/asset/img/make-up.jpeg" }}>
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28" >
                <div className="hidden group-hover:block">
                  <Image width={100} height={100}
                    src="/asset/img/makeup.png"
                    alt="Make Up"

                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image width={100} height={100}
                    src="/asset/img/makeup.png"
                    alt="Make Up"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className=" pt-8 text-lg font-semibold uppercase text-primary hover:text-secondary group-hover:text-yellow lg:text-xl"


                >
                  Make-Up
                </h3>
                <p className="text-white pt-4 text-sm group-hover:text-quaternary md:text-base ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="group rounded px-8 py-12 shadow hover:bg-primary bg-cover"
              style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(/asset/img/spa.jpeg" }}>
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28" >
                <div className="hidden group-hover:block">
                  <Image width={100} height={100}
                    src="/asset/img/bath-tube.svg"
                    alt="Bath Icon"

                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image width={100} height={100}
                    src="/asset/img/bath-tube.svg"
                    alt="Bath Icon"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className=" pt-8 text-lg font-semibold uppercase text-primary hover:text-secondary group-hover:text-yellow lg:text-xl"

                >
                  Skin Care
                </h3>
                <p className="text-white pt-4 text-sm group-hover:text-white md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div> */}



              <div className=" mx-auto px-12 grid w-full grid-cols-1 gap-10 pb-12 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:gap-10">

    
    {services.map((service, index) => (
          <Service key={index} path={service.path} title={service.title} details={service.details} />
        ))}   
        
    </div>
 

          {/* <h1 className="pt-8  text-center text-lg font-semibold uppercase text-tertiary lg:text-4xl"
          > Best Seller</h1>

          <div
            className="mx-auto px-12 grid w-full grid-cols-1 gap-10 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
          >
            <Link href="/" className="shadow">
              <div
                style={{ backgroundImage: "url(/asset/img/product-01.jpg)" }}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
              >
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                ></span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-secondary text-secondary px-6 py-2 text-center font-body text-sm font-bold uppercase  md:text-base"

                >Explore</span>

              </div>
              <div className="bg-primary py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-center text-tertiary"

                > Huda Beauty</span>
                <span className="block pt-2 font-body text-grey-20"
                ></span >
              </div>
            </Link>
            <Link href="" className="shadow">
              <div
                style={{ backgroundImage: "url(/asset/img/product-02.jpg)" }}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
              >
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                ></span>
                <span
                  className="absolute right-0 bottom-0 border-secondary text-secondary mr-4 mb-4 block rounded-full border-2 px-6 py-2 text-center font-body text-sm font-bold uppercase md:text-base"

                >Explore</span>

              </div>
              <div className="bg-primary py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-tertiary  text-center"
                >  Bath and Body Works</span>

                <span className="block pt-2 font-body text-grey-20"
                ></span>

              </div>
            </Link>
            <Link href="" className="shadow">
              <div
                style={{ backgroundImage: "url(/asset/img/product-03.jpg)" }}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
              >
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                ></span>
                <span
                  className="absolute border-secondary text-secondary right-0 bottom-0 mr-4 mb-4 block rounded-full border-2  px-6 py-2 text-center font-body text-sm font-bold uppercase  md:text-base"

                >Explore</span>

              </div>
              <div className="bg-primary py-6 px-5 xl:py-8">
                <span className=" text-tertiary block font-body text-lg font-semibold  text-center"

                > Sephora </span>

                <span className="block pt-2 font-body text-grey-20"
                ></span>

              </div>
            </Link>

          </div> */}


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



    </div>

  )
}

export default Page
