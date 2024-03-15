import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent

const Page = () => {
  const mn=useTranslations('ServicesDetails')

  const componentsData = [
    {
        title1: `${mn('manicure')}`,
        paragraph1: `${mn('manicureDetails')}`,
        title2: `${mn('manicure2')}`,
        paragraph2: `${mn('manicureDetails2')}`,
        imagePath1: '/asset/img/manicure.jpg',
        imagePath2: '/asset/img/manicure3.jpg',
    }
   
    // Add more objects as needed
];
  return (
    
    <div>
        <Hero
        path='/asset/img/manicure3.jpg'
        height={450}
        isVisible={true}
        title="Manicure"
        
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
                    serviceName="Manicure"
                />
                ))}     
</div>

  )
}
export default Page
