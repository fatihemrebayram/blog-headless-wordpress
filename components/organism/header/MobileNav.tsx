import { headerData } from '@/data/headerData'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import blogIcon from '@/public/icon/blog.svg';
import { usePathname, useRouter } from 'next/navigation';
import useMode from '@/utils/themeMode';
/**
 * Our MobileNav is a reusable UI component that used to represent navbar section of any website in mobile version.
 *
 * @property website logo, all page title with navigation link, search field.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface SidebarLayoutProps {
   sidebarOpen: boolean
   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ')
}
const MobileNav = ({ sidebarOpen, setSidebarOpen }: SidebarLayoutProps) => {
   const path = usePathname();
   const { theme, setTheme, themes, hydrationError } = useMode()

   return (<>

      <nav>
         <div className="block xl:hidden">
            <div
               className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col h-screen w-full max-w-[300px] fixed bg-base-200  duration-500 ease-in  gap-2 md:gap-0 shadow-xl ${sidebarOpen ? 'left-0' : '-left-full'
                  }`}
            >
               <div className="relative flex flex-col gap-5 px-5 pb-6 mt-4 text-lg font-normal leading-6">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-base text-base-content/80">Menu</h4>
                     <svg
                        className="cursor-pointer"
                        onClick={() => setSidebarOpen(!open)}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M1 9L9 1M1 1L9 9"
                           stroke="#6B7280"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>
                  {/*  search box */}

                  {/*  menu lists */}
                  {headerData.map((item: any, index: number) => (
                     <Link
                        href={item.link}
                        key={index}
                        className="link link-hover text-base text-base-content/80 hover:text-primary transition hover:duration-300 font-work"
                     >
                        {item.name}
                     </Link>
                  ))}
               </div>
            </div>
         </div>
         {/* bg overlay */}
         <div
            className={`xl:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out bg-[#1B2631] opacity-80 h-full w-full ${sidebarOpen ? 'left-0' : '-left-full'
               }`}
            onClick={() => setSidebarOpen(false)}
         />
      </nav>
      <div className="btm-nav z-50 xl:hidden">
         <Link href='/' className={classNames(path === "/" ? 'active' : '')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
         </Link>
         <Link href='/blog' className={classNames(path === "/blog" ? 'active' : '')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

         </Link>
         <div >

            <label className="swap swap-rotate">

               {/* this hidden checkbox controls the state */}
               <input type="checkbox" className="theme-controller" onChange={() => {
                  if (theme === 'light') {
                     setTheme('dark');
                  } else {
                     setTheme('light');
                  }
               }}
                  checked={theme === 'dark'} />

               {/* sun icon */}
               <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

               {/* moon icon */}
               <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

            </label>
         </div>
      </div>
   </>
   )
}

export default MobileNav
