"use client";
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const openmenu = () => {
        document.getElementById("mobile-menu-2").classList.toggle("hidden");
    }

    const isActive = (path) => {
        return pathname === path
    }
    return (
        <header className='sticky top-0 z-50 '>
            <nav className=" px-4 lg:px-6 py-2.5 bg-gray-800 backdrop:blur-md">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center select-none">
                        <Image src={"/logo.png"} width={150} height={150} className='w-28 raleway font-bold text-secondary-500' alt='company logo' />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link href="/contact" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Send Message</Link>
                        <button onClick={() => openmenu()} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link href="/" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Home</Link>
                            </li>
                          
                            <li>
                                <Link href="/services" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/services') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Services</Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/portfolio') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Portfolio</Link>
                            </li>
                              <li>
                                <Link href="/blog" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/blog') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Blog</Link>
                            </li>
                            <li>
                                <Link href="/about" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/about') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>About</Link>
                            </li>
                            <li>
                                <Link href="/contact" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/contact') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Contact</Link>
                            </li>
                            <li>
                                <Link href="/track-project" className={`block py-2 pr-4 pl-3  border-b lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ${isActive('/track-project') ? "text-white" : "text-gray-400"} hover:bg-gray-700 hover:text-white hover:bg-transparent border-gray-700`}>Track Project</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
