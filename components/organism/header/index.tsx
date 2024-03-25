'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { headerData } from '@/data/headerData'
import useMode from '@/utils/themeMode'
import MobileNav from './MobileNav'
import Image from 'next/image'
import LogoLight from '@/public/LogoDarkBg.png'
import LogoDark from '@/public/LogoLightNoBg.png'
import { useRouter } from 'next/navigation'
import SearchBar from '../search-bar/SearchBar'
import { getCategories } from '@/utils/actions'
import { Category } from '@/models/category'
import { Categories } from '@/data/categories'
/**
 * Our Header is a reusable UI component that used to represent top navbar section of any website.
 *
 * @property website logo, all page title with navigation link, search field  and a theme changing button.
 *
 * @returns React component that can be easily integrated into any web application.
 */
const Header = () => {
   const { theme, setTheme, themes, hydrationError } = useMode()

   const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false)
   const [logo, setLogo] = useState<any>();
   //const [categories, setCategories] = useState<Category[]>();
   /*  useEffect(() => {
        const fetchData = async () => {
           try {
              const categoriesData = await getCategories();
              setCategories(categoriesData);
           } catch (error) {
              console.error('Error fetching categories:', error);
           }
        };
  
        fetchData();
     }, []);*/

   useEffect(() => {
      // Ensure theme state is hydrated before applying logo selection logic
      if (theme) {
         const LogoHd = theme === 'dark' ? LogoDark : LogoLight;
         setLogo(LogoHd);
      }
   }, [theme]);


   return (
      <header className="py-5">
         <div className="container mx-auto font-work">
            <div className="navbar grid grid-cols-12">
               <div className="col-span-3">
                  <Link href={`/`} aria-label='Logo'>
                     <Logo LogoHd={logo || LogoLight} />
                  </Link>
               </div>
               <nav className="hidden xl:block col-span-6">
                  <div className=" w-full flex items-center justify-center gap-10">
                     {headerData.map((item: any, index: number) => (
                        <div key={index}>
                           <Link
                              href={item.link}
                              className="link link-hover text-base text-base-content/80 hover:text-primary transition hover:duration-300"
                           >
                              {item.name}
                           </Link>
                        </div>
                     ))}
                  </div>
               </nav>
               <div className="flex items-center justify-end xl:justify-center gap-10 col-span-9 xl:col-span-3" id='themeToggle'>
                  {/* Search Block */}
                  <SearchBar />
                  <input
                     type="checkbox"
                     className={`toggle rounded-full hidden xl:block $
                       !lightMode ? 'toggle-primary' : ''
                  }`}
                     onClick={() => {
                        if (theme === 'light') {
                           setTheme('dark')
                        } else {
                           setTheme('light')
                        }
                     }}
                     defaultChecked={theme === 'dark'}
                     aria-labelledby="themeToggle"
                  />

                  {/*Multi themes switcher */}
                  <div className="flex-none z-50">
                     <div className="dropdown dropdown-end">
                        <label
                           tabIndex={0}
                           className="btn btn-ghost btn-circle avatar"
                        >
                           <div className="w-7 rounded-full">
                              <svg
                                 stroke="currentColor"
                                 fill="currentColor"
                                 strokeWidth="0"
                                 viewBox="0 0 512 512"
                                 className="w-7 h-7 text-base-content"
                                 height="1em"
                                 width="1em"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path d="M441 336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77 5.34-9.94l30.28-26.87c25.92-22.91 40.2-53.66 40.2-86.59s-14.25-63.68-40.2-86.6c-35.89-31.59-85-49-138.37-49C223.72 48 162 71.37 116 112.11c-43.87 38.77-68 90.71-68 146.24s24.16 107.47 68 146.23c21.75 19.24 47.49 34.18 76.52 44.42a266.17 266.17 0 0086.87 15h1.81c61 0 119.09-20.57 159.39-56.4 9.7-8.56 15.15-20.83 15.34-34.56.21-14.17-5.37-27.95-14.93-36.84zM112 208a32 32 0 1132 32 32 32 0 01-32-32zm40 135a32 32 0 1132-32 32 32 0 01-32 32zm40-199a32 32 0 1132 32 32 32 0 01-32-32zm64 271a48 48 0 1148-48 48 48 0 01-48 48zm72-239a32 32 0 1132-32 32 32 0 01-32 32z"></path>
                              </svg>
                           </div>
                        </label>
                        <ul
                           tabIndex={0}
                           className="grid dropdown-content p-3 shadow-lg mt-5 bg-base-200 rounded-lg w-52 max-h-80 overflow-x-auto"
                        >
                           {themes.map((item: any) => (
                              <li
                                 data-theme={item}
                                 key={item}
                                 className={`capitalize w-full flex mb-2 rounded-md last-of-type:mb-0 justify-between items-center px-2 py-2 hover:bg-base-300 transition-all duration-300 cursor-pointer`}
                                 onClick={() => {
                                    setTheme(item)
                                 }}
                              >
                                 <span className="text-base-content flex items-center gap-2">
                                    {hydrationError && theme === item && (
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="w-3 h-3 text-primary"
                                       >
                                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                                       </svg>
                                    )}
                                    {item}
                                 </span>
                                 <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                                    <div className="bg-primary w-2 rounded"></div>{' '}
                                    <div className="bg-secondary w-2 rounded"></div>{' '}
                                    <div className="bg-accent w-2 rounded"></div>{' '}
                                    <div className="bg-neutral w-2 rounded"></div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* Responsive Sidebar Menu */}
                  <svg
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                     className="cursor-pointer w-8 h-8 xl:hidden text-base-content"
                     width="20"
                     height="20"
                     viewBox="0 0 20 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M3.33301 5H16.6663M3.33301 10H16.6663M3.33301 15H16.6663"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </div>
            </div>
            {/* Responsive Sidebar Layout */}
            <MobileNav
               sidebarOpen={sidebarOpen}
               setSidebarOpen={setSidebarOpen}
            />
         </div>
         <nav className="hidden xl:block col-span-6 col-span-12 text-sm mt-5">
            <div className="w-full flex flex-wrap justify-center gap-4">
               {Categories.map((item: any, index: number) => (
                  <div key={index} className="mb-3">
                     <Link
                        href={item.link}
                        className="link link-hover text-base text-base-content/80 hover:text-primary transition hover:duration-300"
                     >
                        {item.title}
                     </Link>
                  </div>

               ))}
            </div>
         </nav>

      </header>
   )
}

// Header logo svg component
export const Logo = ({ LogoHd }: any) => (
   <div className="flex flex-col items-center sm:flex-row sm:items-center">
      <Image src={LogoHd} alt={'Logo'} width="36" height="36" className="mb-2 sm:mb-0" />
      <h5 className="text-base-content text-xs font-bold text-sm ml-0 sm:ml-3 hidden md:inline xl:text-xl">FATİH EMRE BAYRAM</h5>
   </div>


)

// Site Favicon svg component
export const Favicon = ({ logoFav }: any) => (
   <div className="flex flex-col items-center sm:flex-row sm:items-center">
      <Image src={logoFav} alt={'Logo'} width="36" height="36" className="mb-2 sm:mb-0" />
   </div>
)
export default Header
