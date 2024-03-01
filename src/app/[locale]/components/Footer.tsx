import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants'
// import page from '../app/about/page'
import { pages } from 'next/dist/build/templates/app-page'
import Button from './Button'
import { FaFacebook } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import LocalSwitcher from './local-switcher';


const Footer = () => {
const t = useTranslations('Footer');
  return (
    <footer className='flexCenter pt-10 bg-cover' style={{ background: "#000"}}>
      <div className='padding-container max-container flex w-full flex-col gap-7'>

        <div className='flex flex-col items-start px-5 justify-center gap-[5%] md:flex-row '>
        <Link href="/" className='mb-10'>
          <Image src="/asset/img/fanash.png" width={74} height={29} alt="fanash"></Image>
        </Link>

        <div className='flex flex-wrap mx-10 sm:justify-between md:flex-1'>
          {/* Page Links */}
           <FooterColumn title={t('learnmore')}>
           <ul className="regular-14 flex flex-col gap-4 text-gray-600">
            {FOOTER_LINKS.map((link) => (
              <Link className=" flex flex-col gap-5 transition-all hover:font-bold"
                href={link.href} key={link.key}>{t(link.label)}</Link>
            )

            )}
          </ul>
          </FooterColumn>
            {/* Contact */}
            <div className="flex justify-center flex-col gap-5 mx-10">
              <FooterColumn title={t(FOOTER_CONTACT_INFO.title)}>              {FOOTER_CONTACT_INFO.links.map((link) => (
    <Link href="/contact" key={link.label}>
      <Button title={t(link.label)} />
    </Link>

))}
 <div className="flex rounded-md justify-center text-tertiary">
             <LocalSwitcher />
          </div>

              </FooterColumn>
            </div>
              {/* Social Icons */}
            <div className="flex flex-col mr-4">
  <FooterColumn title={t(SOCIALS.title)}>
    <ul className="text-sm text-gray-30">
      {SOCIALS.links.map((link, index) => (
        <li className="flex items-center mb-2" key={index}>
          <a href={link.href} className="flex items-center">
            <Image className='' src={link.src} alt="logo" width={15} height={15} /> 
            <span className="ml-1 text-gray-600">{link.label}</span>
          </a>
        </li>
  ))}
</ul>
              </FooterColumn>
            </div>

          
          </div>
        </div>

        <div/>
        <p className="regular-14 w-full text-center text-gray-700 pb-3">{t('copyright')}</p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer