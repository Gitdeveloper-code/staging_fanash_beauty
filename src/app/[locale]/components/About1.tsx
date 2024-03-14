import Image from "next/image"
import Button from "./Button"
import { useTranslations } from 'next-intl';

const About1 = () => {
const a = useTranslations('About');
  return (
    <>
      <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 justify-center items-center flex">
                {/* Author's Picture */}
                <div className="relative lg:max-w-md">

                    <Image  src="/asset/img/fatma.png" alt="aboutimage" height={700} width={700} 
                        className=" object-cover w-full bg-cover bg-center rounded h-96 border-2 border-tertiary"/>
                   
                </div>
            </div>
    <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-5 ">
                {/* Author's Name */}
                <div className="pl-4 mb-6 border-l-4 border-tertiary ">
                    {/* <span className="text-sm text-tertiary uppercase dark:text-gray-400">{a("whoweare?")}</span> */}
                    <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                        Fatma Rahman
                    </h1>
                </div>
                <p className="mb-6 leading-7 text-white dark:text-gray-400 text-justify" style={{fontSize:"0.9rem"}}>
                {a("aboutuspara")}
                </p>
                <div className="flex justify-center">
                <Button 
                title={a("learnmore")}
                />
               </div>
            </div>
    </>
     )
}
export default About1
