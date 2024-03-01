
import { TeamMembers } from '../components/TeamMembers'
import Hero from '../components/Hero'
import About1 from '../components/About1'
import {getTranslations} from 'next-intl/server';

const getJobs= async()=> {
  let response= await fetch("https://fanash-beauty.netlify.app/api/teams", {cache:"no-store"})
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
        title={team("ourteam")}
        path='/asset/img/bg.png'
        description={team("meetourstylist")}
      />
    
       

      <section className="dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
 <div className='justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6'>
       <div className="flex flex-wrap ">
          
        <About1/>
    
        </div>
     </div>
     <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
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