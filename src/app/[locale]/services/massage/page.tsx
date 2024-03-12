
import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent

import Link from 'next/link'
const Page = () => {
  const msg=useTranslations('ServicesDetails')

  const componentsData = [
    {
        title1: `${msg('massage')}`,
        paragraph1: `${msg('massageDetails')}`,
        title2: `${msg('manicure2')}`,
        paragraph2: `${msg('massageDetails2')}`,
        imagePath1: '/asset/img/massage1.png',
        imagePath2: '/asset/img/massage4.jpg',
    }
  ]

  return (
    
    <div>
        <Hero
        path='/asset/img/massage2.avif'
        height={450}
        isVisible={true}
        title="Massage"
        
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
                    serviceName="Massage"
                />
                ))}  
                
                
</div>

  )
}
export default Page
