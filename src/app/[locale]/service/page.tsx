import Service from "../components/Service"
import Hero from "../components/Hero"
import { THREADING, WAXING } from "../constants"


const getServices = async () => {
  try {
    const response = await fetch(`/api/services`, { cache: "no-store" });

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



const Page =async () => {


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



  return (
    <main>
      <Hero
      path="/asset/img/hero_service.png"
      height={500}
      isVisible={true}
      title="Services we Offer"
      description="We provide best and comprehensive beauty services"
      />
    <div className="bg-white mx-auto px-12 grid w-full grid-cols-1 gap-10 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:gap-10">
    
    {services.map((service, index) => (
          <Service key={index} path={service.path} title={service.title} details={service.details} />
        ))}   
        
    </div>
 
    </main>
  )
}

export default Page
