"use client"
import React, { useState, useEffect } from 'react';
import StarButton from './StarButton';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Service {
    name: string;
    price: number;
    category: string;
}

interface ImageText5050 {
    path: string;
    height: number;
    isVisible: boolean;
    title1: string;
    paragraph1: string;
    title2: string;
    paragraph2: string;
    imagePath1: string;
    imagePath2: string;
    serviceName: string;
}

const ImageText5050: React.FC<ImageText5050> = ({
    path,
    height,
    isVisible,
    title1,
    title2,
    paragraph1,
    paragraph2,
    imagePath1,
    imagePath2,
    serviceName,
}) => {
    const servicesTranslations = useTranslations('Services');
    const [servicesApi, setServicesApi] = useState<{ result: Service[] }>({ result: [] });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/services`, { cache: 'no-store' });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setServicesApi(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchData();

        const checkWindowSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);

        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, []);

    const renderServiceDetails = (serviceName: string, showDetails: boolean, selectedService: string | null) => {
        if (!showDetails || !selectedService) return null;

        const filteredServices = servicesApi.result.filter((item) => item.category === serviceName);

        return (
            <div className="absolute bg-black p-4 text-white shadow-md overflow-y-scroll scrollbar-hide" style={{ zIndex: 1, width: '50%', maxWidth: '500px', maxHeight: isMobile ? '200px' : '400px', overflowY: 'auto', ...(isMobile && { width: '90%' }) }}>
                <h3 className="text-xl font-bold mb-4 text-center text-tertiary">{selectedService.toUpperCase()}</h3>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div className="font-bold">Service Type</div>
                        <div className="font-bold">Price</div>
                    </div>
                    {filteredServices.map((detail, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div>{detail.name}</div>
                            <div>{"€" + detail.price}</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Link href="/price">
                        <StarButton title="Book appointment" />
                    </Link>
                </div>
            </div>
        );
    };

    const renderSection = (serviceName: string, imagePath: string, sectionNumber: number) => {
        return (
            <Section serviceName={serviceName} imagePath={imagePath} sectionNumber={sectionNumber} renderServiceDetails={renderServiceDetails} />
        );
    };

    return (
        <div>
            {/* First set of components */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3">
                <div className="px-0 md:px-14 p-4 flex flex-col justify-center items-center order-2 sm:order-1">
                    <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300 hyphenate break-words">{title1}</h2>
                    <div className="line-container my-5">
                        <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                    </div>
                    <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:my-5 tracking-tighter md:tracking-normal hyphenate break-words">{paragraph1}</p>
                </div>

                <div className="order-1 sm:order-2">
                    {renderSection(serviceName, imagePath1, 1)}
                </div>
            </div>

            {/* Second set of components */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3">
                <div>
                    {renderSection(serviceName, imagePath2, 2)}
                </div>
                <div className="p-4 flex flex-col justify-center items-center px-0 md:px-14">
                    <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300 tracking-tighter hyphenate break-words">{title2}</h2>
                    <div className="line-container my-5">
                        <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                    </div>
                    <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:my-5 tracking-tighter md:tracking-normal hyphenate break-words">{paragraph2}</p>
                </div>
            </div>
        </div>
    );
};

interface SectionProps {
    serviceName: string;
    imagePath: string;
    sectionNumber: number;
    renderServiceDetails: (serviceName: string, showDetails: boolean, selectedService: string | null) => JSX.Element | null;
}

const Section: React.FC<SectionProps> = ({ serviceName, imagePath, sectionNumber, renderServiceDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const handleMouseEnter = () => {
        setShowDetails(true);
        setSelectedService(serviceName); // Update the selectedService with the correct serviceName
    };

    const handleMouseLeave = () => {
        setShowDetails(false);
        setSelectedService(null);
    };

    return (
        <div
            key={sectionNumber}
            className=" p-4 flex items-center relative"
            style={{ border:"unset" , position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', maxHeight: '500px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image className="w-full h-full border-0" src={imagePath} width={500} height={500} alt="" style={{ filter: showDetails ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }} />
            {renderServiceDetails(serviceName, showDetails, selectedService)}
        </div>
    );
};

export default ImageText5050;
