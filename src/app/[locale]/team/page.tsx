
import { TeamMembers } from '../components/TeamMembers'
import Hero from '../components/Hero'
import About1 from '../components/About1'
import {getTranslations} from 'next-intl/server';
import StickyButton from "../components/StickyButton"
import Link from 'next/link'


const getJobs= async()=> {
  let response= await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/teams`, {cache:"no-store"})
  if (!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`);
    return {res:"Error"}
  }
  else{
    let data= await response.json()
    return data
  }
  
}

const page = async () => {
const team = await getTranslations('Team');

  const serviceApi= await getJobs()
   console.log(serviceApi)
  


  return (
    <div>
      <Hero
        height={500}
        isVisible={true}
        title={team("meetourstylist")}
        path='/asset/img/bg.png'
        // description={team("meetourstylist")}
      />
    
       

  <div className='dark:bg-gray-900 justify-center flex-1 max-w-screen-xl py-4 md:px-6 mx-auto lg:py-16 lg:px-6' style={{ backgroundColor: "#111827" }}>
       <div className="flex flex-wrap ">
        <About1/>
        </div>
     </div>

      <section className="dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
     <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2" style={{ backgroundColor: "#111827" }}>
  {Array.isArray(serviceApi.result) ? 
    serviceApi.result.map((item: { name: string; design: string; description: string }, index: number) => (
      <TeamMembers
        key={index}
        name={item.name}
        design={item.design}
        description={item.description}
      />
    ))
  : <p>No data available</p>}
</div>


      </section>

    </div>
  )
}

export default page