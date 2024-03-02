"use client"
import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import React, { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { NAV_LINKS } from "../constants";
import { useTranslations } from 'next-intl';

const Navbar = () => {
const t = useTranslations('Navigation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const Logo = () => {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    return (
      <div
        className="flex items-center flex-shrink-0 mr-6 cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
          {isHovering ? (
            <Image src="/asset/img/user-clicked.png" width={30} height={30} alt="logo" />
          ) : (
            <Image src="/asset/img/user.png" width={30} height={30} alt="logo" />
          )}
      </div>
    );
  };
  return (
  <nav className="flexBetween max-container pt-2 pb-2 padding-container fixed top-0 left-0 right-0 z-30 bg-transparent backdrop-filter backdrop-blur-md bg-opacity-25  border-opacity-75 border-solid rounded-md shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
        <div className="relative flex h-16 items-center justify-between">
            <Link className="flex items-center" href={"/"}>
                <div className="flex items-center">
                    <div className="rounded-full overflow-hidden mr-2 w-17 h-15">
    <Image src="/asset/img/fanash.png" width={80} height={80} alt="fanash" />
</div>

                    <span className="text-white p-4 flex flex-col"> Fanash <span className="text-gray-300">Beauty</span> </span>
                </div>                </Link>
            <ul className="hidden h-full gap-8 lg:flex items-right py-3">
      {NAV_LINKS.map((link) => (
        <Link
          className="hover:bg-tertiary hover:text-primary rounded-md px-3 py-2 text-sm font-medium regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"         href={link.href}
          key={link.key}
        >
          {t(link.label)} {/* Dynamically translate link label */}
        </Link>
      ))}
    </ul>
            <div className="flex items-center px-2">
             <div className="flex gap-3 text-tertiary text-4xl" style={{ lineHeight: "1.5rem" }}>

                    <Link href='/login'>
                        <Button title="Login" />
                    </Link>
                    <IoIosMenu onClick={toggleSidebar} className="inline-block cursor-pointer lg:hidden" />
                </div>
            </div>
        </div>
    </div>
    {/* Sidebar */}
    {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="flex justify-end p-4">
                {/* Close button */}
                <IoIosMenu className="text-white cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className="flex flex-col items-center">
                {/* Sidebar items */}
                {NAV_LINKS.map((link) => (
                    <Link
                        className="hover:bg-tertiary hover:text-primary rounded-md px-3 py-2 text-sm font-medium regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                        href={link.href}
                        key={link.key}
                        onClick={toggleSidebar} // Close the sidebar on item click
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )}
   </nav>

  )
}

export default Navbar
