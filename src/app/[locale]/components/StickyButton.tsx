"use client"
import Image from "next/image"
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MdClose } from 'react-icons/md'; // Import the close icon from react-icons

type ButtonProps = {
    icon?: string;
    action?: () => void;
};

const StickyButton = ({ icon, action }: ButtonProps) => {
    const [iframeVisible, setIframeVisible] = useState(false);
    const t = useTranslations('Footer');

    const toggleIframe = () => {
        setIframeVisible(!iframeVisible);
    };

    const handleClose = () => {
        setIframeVisible(false); // Close the iframe
    };

    return (
        <div>
            <button
                className="fixed bottom-8 right-4 md:right-[2rem] flex items-center px-2 py-2 shadow z-30 text-white font-mono border border-tertiary rounded-md hover:bg-primary hover:text-secondary  font-medium"
                style={{ backgroundColor: '#ff6575' }}
                onClick={toggleIframe}
            >
                {icon && (
                    <Image
                        src={icon}
                        alt=""
                        className="mr-2 pr-2"
                        height={29}
                        width={29}
                        style={{ borderRight: '1px dashed rgba(255, 255, 255, .5)' }}
                    />
                )}
                <span>{t('bookappointment')}</span>
            </button>

            {/* Conditional rendering of iframe */}
            {iframeVisible && (
                <div className="fixed bottom-8 md:bottom-10 right-4 md:right-[1rem] flex items-center  shadow z-30  md:w-[31%] md:h-[80vh] rounded-md">
                    {/* Close button */}
                    <button
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={handleClose}
                    >
                        <MdClose size={24} />
                    </button>
                    {/* Iframe */}
                    <iframe
                        src="https://fanash-beauty.salonized.com/widget_bookings/new"
                        title="Embedded Content"
                        className="w-full h-[86vh] md:w-[100%] md:h-[85vh] rounded-md"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default StickyButton;
