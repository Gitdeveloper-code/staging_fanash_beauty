import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent
import Link from 'next/link'
const Page = () => {

  const wx=useTranslations('ServicesDetails')
  // Define an array of objects with data for each AnotherComponent
  const componentsData = [
    {
        title1: `${wx('waxing')}`,
        paragraph1: `${wx('waxingDetails')}`,
        title2: `${wx('waxing2')}`,
        paragraph2: `${wx('waxingDetails2')}`,
        imagePath1: '/asset/img/waxing8.jpg',
        imagePath2: '/asset/img/waxing10.jpg',
    },
    {
        title1: `${wx('waxing3')}`,
        paragraph1: `${wx('waxingDetails3')}`,
        title2:`${wx('waxing4')}`,
        paragraph2: `${wx('waxingDetails4')}`,
        imagePath1: '/asset/img/waxing3.jpg',
        imagePath2: '/asset/img/waxing9.jpg',
    }
    // Add more objects as needed
];


  return (
    
    <div>
        <Hero
        path='/asset/img/waxing.webp'
        height={450}
        isVisible={true}
        title="Waxing"
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
                    serviceName="Waxing"
                />
                ))}  
</div>

  )
}
export default Page
