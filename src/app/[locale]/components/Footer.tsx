import Image from 'next/image'
import React from 'react'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants'
import Button from './Button'
import { FaFacebook } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import StickyButton from "./StickyButton"
import Link from 'next/link'
// import LocalSwitcher from './local-switcher';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='flexCenter pt-10 bg-cover' style={{ background: "#262626"}}>
      <div className='padding-container max-container flex w-full flex-col gap-7'>
       <div className='flex flex-col items-start px-5 justify-center gap-[30%] md:flex-row '>
  {/* <div className="mb-4 md:mb-0">
    <Link href="/">
      <div className='block'>
        <Image src="/asset/img/fanash.png" width={74} height={29} alt="fanash" />
      </div>
    </Link>
    <div className="mt-4">
      <p className='text-white'>{t("changelanguage")}</p>
      <LocalSwitcher />
    </div>
  </div> */}

  <div className="mb-4">
    <FooterColumn title={t('learnmore')}>
      <ul className="regular-14 flex flex-col gap-3 text-sm text-white">
        {FOOTER_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </FooterColumn>
  </div>

  <div className="mb-4  text-white">
   <FooterColumn title={t(FOOTER_CONTACT_INFO.title)}>
              {/* This part has been removed */}
              
               <div className="text-sm text-gray-30 regular-14 ">
    <p className="mb-2">Meander 787, 1181 WN,</p>
    <p className="mb-2">Amstelveen (Shopping Center)</p>
    <p className="mb-2 text-blue-500">info@fanashbeauty.nl</p>
    <p className="mb-2">+31 6 86271027</p>
</div>

               
              
            </FooterColumn>
  </div>


  <div className="mb-4">
    <FooterColumn title={t(SOCIALS.title)}>
      <ul className="text-sm text-gray-30 regular-14 flex flex-col gap-2 ">
        {SOCIALS.links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="flex items-center mb-2">
              <Image src={link.src} alt="logo" width={15} height={15} /> 
              <span className="ml-1 text-white">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </FooterColumn>
  </div>
</div>
        <hr className="w-full border-gray-600" />
        
        <p className="regular-14 w-full text-center text-white pb-5">{t('copyright')}</p>
        
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title,children }: FooterColumnProps) => {
  return (
<>   
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 text-white whitespace-nowrap font-bold ">{title}</h4>
      {children}
    </div>

<div className="block group-hover:hidden">
  
    <StickyButton  icon="/asset/img/fanash.png" />
 
</div>
</>
  )
}

export default Footer
