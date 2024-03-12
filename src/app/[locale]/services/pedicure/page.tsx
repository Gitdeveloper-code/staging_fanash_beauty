
import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent


import Link from 'next/link'
const Page = () => {
  const pd=useTranslations('ServicesDetails')


  const componentsData = [
    {
        title1: `${pd('pedicure')}`,
        paragraph1: `${pd('pedicureDetails')}`,
        title2: `${pd('pedicure2')}`,
        paragraph2: `${pd('pedicureDetails2')}`,
        imagePath1: '/asset/img/padicure.jpg',
        imagePath2: '/asset/img/Pedicure5.jpg',
    }
   
    // Add more objects as needed
];

  return (
    
    <div>
        <Hero
        path='/asset/img/Pedicure3.jpg'
        height={450}
        isVisible={true}
        title="Pedicure"
        
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
                    serviceName="Pedicure"
                />
                ))}  
                
</div>

  )
}
export default Page
