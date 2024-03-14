"use client"
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useState, useEffect } from 'react';
import { IoIosMenu } from "react-icons/io";
import { NAV_LINKS } from "../constants";
import { useTranslations } from 'next-intl';
import { IoClose } from "react-icons/io5"; // Importing close icon
import LocalSwitcher from './local-switcher';


const Navbar = () => {
    const t = useTranslations('Navigation');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
        // document.body.style.backdropFilter = isSidebarOpen ? 'none' : 'blur(10px)';
    };

    const navStyle = {
        backgroundColor: isScrolled ? 'none' : 'transparent',
        backdropFilter: isScrolled && !isSidebarOpen ? 'blur(20px)' : 'none',
        transition: 'background-color 0.3s ease',
    };


    return (
        <nav className="flexBetween max-container pt-2 pb-2 padding-container fixed top-0 left-0 right-0 z-40 border-opacity-75 border-solid " style={navStyle}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
                <div className="relative flex h-16 items-center justify-between">
                    <Link href={"/"}>
                        <div className="flex items-center">
                            <div className="rounded-full overflow-hidden mr-2 w-17 h-15">
                                <Image src="/asset/img/fanash.png" width={80} height={80} alt="fanash" />
                            </div>
                            <span className="text-white p-4 flex flex-col"> Fanash <span className="text-gray-300">Beauty</span> </span>
                        </div>
                    </Link>
                    <ul className="hidden h-full gap-8 lg:flex items-right py-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                className="hover:bg-tertiary hover:text-white rounded-md px-3 py-2 text-sm font-medium regular-16 text-tertiary flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                                href={link.href}
                                key={link.key}
                            >
                                {t(link.label)} {/* Dynamically translate link label */}
                            </Link>
                        ))}
                    </ul>
                    <div className="flex items-center px-2">
                        <LocalSwitcher />
                        <div className="flex gap-3 text-tertiary text-4xl" style={{ lineHeight: "1.5rem" }}>
                            {/* <Link href='/login' className="hidden h-full gap-8 lg:flex items-right py-3">
                                <Button title="Login" />
                            </Link> */}
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
                        <IoClose className="text-white cursor-pointer text-4xl" onClick={toggleSidebar} />
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        {/* Sidebar items */}
                        {NAV_LINKS.map((link) => (
                            <Link
                                className="hover:bg-tertiary text-2xl hover:text-white rounded-md px-3 py-2  font-medium  text-tertiary flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold capitalize"
                                href={link.href}
                                key={link.key}
                                onClick={toggleSidebar} // Close the sidebar on item click
                            >
                                {t(link.label)}
                            </Link>
                        ))}
                        {/* <Link href='/login' >
                            <Button title="Login" />
                        </Link> */}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
