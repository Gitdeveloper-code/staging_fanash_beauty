import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants'
import Button from './Button'
import { FaFacebook } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import LocalSwitcher from './local-switcher';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='flexCenter pt-10 bg-cover' style={{ background: "#000"}}>
      <div className='padding-container max-container flex w-full flex-col gap-7'>
       <div className='flex flex-col items-start px-5 justify-center gap-[14%] md:flex-row '>
  <div className="mb-4 md:mb-0">
    <Link href="/">
      <div className='block'>
        <Image src="/asset/img/fanash.png" width={74} height={29} alt="fanash" />
      </div>
    </Link>
    <div className="mt-4">
      <p className='text-white'>{t("changelanguage")}</p>
      <LocalSwitcher />
    </div>
  </div>

  <div className="mb-4">
    <FooterColumn title={t('learnmore')}>
      <ul className="regular-14 flex flex-col gap-4 text-gray-600">
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

  <div className="mb-4">
    <FooterColumn title={t(FOOTER_CONTACT_INFO.title)}>
      {FOOTER_CONTACT_INFO.links.map((link) => (
        <Link href="/contact" key={link.label}>
          <Button title={t(link.label)} />
        </Link>
      ))}
    </FooterColumn>
  </div>

  <div className="mb-4">
    <FooterColumn title={t(SOCIALS.title)}>
      <ul className="text-sm text-gray-30">
        {SOCIALS.links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="flex items-center mb-2">
              <Image src={link.src} alt="logo" width={15} height={15} /> 
              <span className="ml-1 text-gray-600">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </FooterColumn>
  </div>
</div>

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
      <h4 className="bold-18 text-white whitespace-nowrap ">{title}</h4>
      {children}
    </div>
  )
}

export default Footer
