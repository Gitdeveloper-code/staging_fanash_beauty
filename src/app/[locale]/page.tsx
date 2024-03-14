import Image from 'next/image'
import Hero from './components/Hero';
import StarButton from './components/StarButton'
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { getTranslations } from 'next-intl/server';
import StickyButton from "./components/StickyButton"
import Link from 'next/link'


async function connectToDatabase() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(ConnectionString);
        }
        return true

    }
    catch (error) {
        return false
    }

}

const getServices = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/services", { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return { res: "Error" };
    }
};


async function isConnectedDb() {
    const isConnected = await connectToDatabase();

    if (isConnected) {
        console.log('Connected to the database!');
        // Your code here
    } else {
        console.log('Failed to connect to the database.');
    }
}



const Page = async () => {
    // const t = await getTranslations('Testimonial');
    const home = await getTranslations('Home');
    const ser_vice = await getTranslations('Services');

    const servicesApi = await getServices()
    console.log(servicesApi)



    isConnectedDb()


    return (
        <div className="relative cursor-default w-full h-full" >

            <div>
                <div>

                    <Hero
                        path="/asset/img/Home.jpg"
                        height={600}
                        isVisible={true}
                        title='Fanash Beauty'
                        description={home("fanashbeautydescription")}
                    />

                    <h3
                        className="pt-8 pb-8 text-lg uppercase sm:text-4xl lg:text-4xl text-tertiary text-center"

                    >
                        {home("serviceweoffer")}
                    </h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center order-2 sm:order-1'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("threading")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("theredingDiscription")}
                            </p>
                            <div className='pt-5'>
                            <Link href='./services/threading'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>

                        {/* Image */}
                        <div className='border-0 p-4 flex items-center order-1 sm:order-2'>
                            <Image className='w-full h-full ' src='/asset/img/service1.png' width={500} height={500} alt='' />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Image */}
                        <div className='border-0 p-4 flex items-center'>
                            <Image className='w-full h-full ' src='/asset/img/service10.png' width={500} height={500} alt='' />
                        </div>

                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("waxing")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("waxingDiscription")}
                            </p>
                            <div className='pt-5'>
                            <Link href='./services/waxing'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>
                    </div>



                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center order-2 sm:order-1'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("sugarepilation")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("sugarepilationDiscription")}
                            </p>
                           <div className='pt-5'>
                            <Link href='./services/sugarepilation'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>

                        {/* Image */}
                        <div className='border-0 p-4 flex items-center order-1 sm:order-2'>
                            <Image className='w-full h-full ' src='/asset/img/service3.png' width={500} height={500} alt='' />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Image */}
                        <div className=' p-4 flex items-center'>
                            <Image className='w-full h-full ' src='/asset/img/service9.png' width={500} height={500} alt='' />
                        </div>

                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("facial")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("facialDiscription")}
                            </p>
                           <div className='pt-5'>
                            <Link href='./services/facial'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>
                    </div>



                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center order-2 sm:order-1'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("manicure")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("manicureDiscription")}
                            </p>
                            <div className='pt-5'>
                            <Link href='./services/manicure'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>

                        {/* Image */}
                        <div className='border-0 p-4 flex items-center order-1 sm:order-2'>
                            <Image className='w-full h-full ' src='/asset/img/service5.png' width={500} height={500} alt='' />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Image */}
                        <div className='border-0 p-4 flex items-center'>
                            <Image className='w-full h-full ' src='/asset/img/service6.png' width={500} height={500} alt='' />
                        </div>

                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("pedicure")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("pedicureDiscription")}
                            </p>
                           <div className='pt-5'>
                            <Link href='./services/pedicure'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>
                    </div>


                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3'>
                        {/* Text */}
                        <div className='p-4 flex flex-col justify-center items-center order-2 sm:order-1'>
                            <h2 className="text-3xl text-white md:text-5xl dark:text-gray-300">
                                {ser_vice("massage")}
                            </h2>
                            <div className="line-container mt-5">
                                <div className="line bg-tertiary h-1 w-40 mx-auto"></div>
                            </div>
                            <p className="text-base leading-7 text-white dark:text-gray-400 text-justify md:px-14 md:my-5">
                                {ser_vice("massageDiscription")}
                            </p>
                           <div className='pt-5'>
                            <Link href='./services/massage'>
                                <StarButton title={ser_vice("learnmore")} />
                            </Link>
                           </div>
                        </div>

                        {/* Image */}
                        <div className='border-0 p-4 flex items-center order-1 sm:order-2'>
                            <Image className='w-full h-full ' src='/asset/img/service8.png' width={500} height={500} alt='' />
                        </div>
                    </div>



                </div>
            </div>

        </div>

    )
}

export default Page
