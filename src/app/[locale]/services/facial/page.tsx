import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';
import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent


const Page = () => {
  const f=useTranslations('ServicesDetails')

  // Define an array of objects with data for each AnotherComponent
  const componentsData = [
    {
        title1: `${f('facial')}` ,
        paragraph1: `${f('facialDetails')}`,
        title2: `${f('facial2')}`,
        paragraph2: `${f('facialDetails2')}`,
        imagePath1: '/asset/img/facial5.webp',
        imagePath2: '/asset/img/facial2.jpg',
    },
    {
        title1:`${f('facial3')}` ,
        paragraph1: `${f('facialDetails3')}`,
        title2: `${f('facial4')}`,
        paragraph2: `${f('facialDetails4')}`,
        imagePath1: '/asset/img/facial3.jpg',
        imagePath2: '/asset/img/facial6.webp',
    }
    // Add more objects as needed
];

  return (
    
    <div>
        <Hero
        path='/asset/img/service9.png'
        height={450}
        isVisible={true}
        title="Facial"
        
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
                    serviceName="Facial"
                />
            ))}
                
</div>

  )
}
export default Page
