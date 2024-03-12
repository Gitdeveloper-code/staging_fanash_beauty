
import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent

const Page = () => {
  const sh=useTranslations('ServicesDetails')

  const componentsData = [
    {
        title1:`${sh('sugarepilation')}`,
        paragraph1: `${sh('sugarepilationDetails')}`,
        title2: `${sh('sugarepilation')}`,
        paragraph2: `${sh('sugarepilationDetails')}`,
        imagePath1: '/asset/img/waxing7.jpg',
        imagePath2: '/asset/img/Sugarepilation1.jpg',
    }
  ]

  return (
    
    <div>
        <Hero
        path='/asset/img/Sugarepilation2.jpg'
        height={450}
        isVisible={true}
        title="Sugarepilation"
        
        />
   {/* Render AnotherComponent dynamically for each object in the componentsData array */}
   {componentsData.map((data, index) => (
                <ImageText5050
                    key={index}
                    path='/asset/img/make-up.jpeg'
                    height={450}
                    isVisible={true}
                    title1={data.title1}
                    paragraph1={data.paragraph1}
                    title2={data.title2}
                    paragraph2={data.paragraph2}
                    imagePath1={data.imagePath1}
                    imagePath2={data.imagePath2}
                    serviceName="sugare pilation"
                />
                ))}  
                
</div>

  )
}
export default Page
