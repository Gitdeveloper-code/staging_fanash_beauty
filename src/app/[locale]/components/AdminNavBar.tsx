"use client"
import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import React, { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import {LINKS, NAV_LINKS } from "../constants";



const Navbar = () => {
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
    <nav className=" flexBetween max-container pt-4   padding-container relative z-30 bg-transparent">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
        <div className="relative flex h-16 items-center justify-between">
          {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
      <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
      </button>
        </div> */}
          <Link className="flex mt-4" href={"/"}>
            <Image src="/asset/img/fanash.png" width={100} height={100} alt="fanash"></Image> 
            <span className="text-white mt-4 p-4 flex flex-col"> Fanash
            <span>Beauty</span> </span>
          </Link>
          <ul className="hidden h-full gap-8 lg:flex items-ri py-3">
            {LINKS.map((link) => (
              <Link className=" hover:bg-tertiary hover:text-primary rounded-md px-3 py-2 text-sm font-medium regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                href={link.href} key={link.key}>{link.label} </Link>
            )

            )}
          </ul>


          <div className="flex justify-center items-center px-2">

            <div className="flex gap-3 text-tertiary text-4xl">
                {/* <Logo/> */}
                <Link href='/'>
                <Button
                title="Logout"
                />
                </Link>
               
              <IoIosMenu onClick={toggleSidebar}

               className="inline-block cursor-pointer lg:hidden "/>
            
            </div>


          </div>
        </div>
      </div>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="flex justify-end p-4">
            {/* Close button */}
            <IoIosMenu
              className="text-white cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex flex-col items-center">
            {/* Sidebar items */}
            {LINKS.map((link) => (
              <Link
                className=" hover:bg-tertiary hover:text-primary rounded-md px-3 py-2 text-sm font-medium regular-16 text-white flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
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
