// Page.tsx
import React from 'react';
import Hero from '../../components/Hero';
import { useTranslations } from 'next-intl';

import ImageText5050 from '../../components/ImageText5050'; // Import AnotherComponent

const Page = () => {
    const th=useTranslations('ServicesDetails')
    // Define an array of objects with data for each AnotherComponent
    const componentsData = [
        {
            title1:`${th('threading')}`,
            paragraph1: `${th('theredingDetails')}`,
            title2: `${th('threading2')}`,
            paragraph2: `${th('theredingDetails2')}`,
            imagePath1: '/asset/img/therading2.jpg',
            imagePath2: '/asset/img/upperlipthreading.webp',
        },
        {
            title1: `${th('threading3')}`,
            paragraph1: `${th('theredingDetails')}`,
            title2: `${th('threading4')}`,
            paragraph2: `${th('theredingDetails')}`,
            imagePath1: '/asset/img/threadingchin.jpg',
            imagePath2: '/asset/img/hadethreading.jpg',
        }
        // Add more objects as needed
    ];

    return (
        <div>
            {/* Pass props to Hero component */}
            <Hero
                path='/asset/img/threading.webp'
                height={450}
                isVisible={true}
                title="Threading"
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
                    serviceName="Threading"
                />
            ))}
        </div>
    );
};

export default Page;
