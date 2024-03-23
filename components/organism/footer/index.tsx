
import { FooterDataOne, FooterDataTwo } from '@/data/footerData'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NewsLetter from '@/components/molecules/newsletter/NewsLetter'
import useMode from '@/utils/themeMode'
import { Favicon } from '@/components/organism/header'
import { getCategories } from '@/utils/actions'
import LogoLight from '@/public/LogoDarkBg.png'
import LogoDark from '@/public/LogoLightNoBg.png'
import { Category } from '@/models/category'
import { Categories } from '@/data/categories'
import { headerData } from '@/data/headerData'
/**
 * Our Footer is a reusable UI component that used to represent bottom section of any website.
 *
 * @property website details, email, phone number, some necessary link and a newsletter component.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const Footer = () => {
   const { theme, setTheme, themes, hydrationError } = useMode()
   const [categories, setCategories] = useState<Category[]>();
   const [logo, setLogo] = useState<any>();

   useEffect(() => {

      // Ensure theme state is hydrated before applying logo selection logic
      if (theme) {
         const LogoHd = theme === 'dark' ? LogoDark : LogoLight;
         setLogo(LogoHd);
      }
   }, [theme]); // Re-run effect when theme changes or is hydrated

   useEffect(() => {
      const fetchData = async () => {
         try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
         } catch (error) {
            console.error('Error fetching categories:', error);
         }
      };

      fetchData();
   }, []);
   return (
      <footer className="bg-base-200 px-5 md:px-0 font-sans mt-10">
         <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-5 py-16">
               <div className="col-span-12 lg:col-span-3">
                  <div className='pl-10 pr-10 pb-5'>
                     <h6 className="footer-title">Sosyal</h6>
                     <div className="grid grid-flow-col gap-4">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        <a href='mailto:admin@fatihemrebayram.com'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="fill-current" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path  d="M440.917,67.925H71.083C31.827,67.925,0,99.752,0,139.008v233.984c0,39.256,31.827,71.083,71.083,71.083 h369.834c39.255,0,71.083-31.827,71.083-71.083V139.008C512,99.752,480.172,67.925,440.917,67.925z M178.166,321.72l-99.54,84.92 c-7.021,5.992-17.576,5.159-23.567-1.869c-5.992-7.021-5.159-17.576,1.87-23.567l99.54-84.92c7.02-5.992,17.574-5.159,23.566,1.87 C186.027,305.174,185.194,315.729,178.166,321.72z M256,289.436c-13.314-0.033-26.22-4.457-36.31-13.183l0.008,0.008l-0.032-0.024 c0.008,0.008,0.017,0.008,0.024,0.016L66.962,143.694c-6.98-6.058-7.723-16.612-1.674-23.583c6.057-6.98,16.612-7.723,23.582-1.674 l152.771,132.592c3.265,2.906,8.645,5.004,14.359,4.971c5.706,0.017,10.995-2.024,14.44-5.028l0.074-0.065l152.615-132.469 c6.971-6.049,17.526-5.306,23.583,1.674c6.048,6.97,5.306,17.525-1.674,23.583l-152.77,132.599 C282.211,284.929,269.322,289.419,256,289.436z M456.948,404.771c-5.992,7.028-16.547,7.861-23.566,1.869l-99.54-84.92 c-7.028-5.992-7.861-16.546-1.869-23.566c5.991-7.029,16.546-7.861,23.566-1.87l99.54,84.92 C462.107,387.195,462.94,397.75,456.948,404.771z"></path> </g> </g></svg></a>
                     </div>
                  </div>
               
               </div>
               <div className="flex p-10  justify-between lg:justify-center lg:gap-20 col-span-12 lg:col-span-5 lg:p-0">
                  <div>
                     <h5 className="text-base-content text-lg font-semibold font-sans">
                        Linkler
                     </h5>
                     <div className="flex flex-col gap-y-2 mt-6">
                        {headerData.map((item: any, index: number) => (
                           <div key={index}>
                              <Link
                                 href={item.link}
                                 className="link link-hover text-base text-base-content/70 hover:text-primary transition hover:duration-300"
                              >
                                 {item.name}
                              </Link>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h5 className="text-base-content text-lg font-semibold font-sans">
                        Kategoriler
                     </h5>
                     <div className="flex flex-col gap-y-2 mt-6">
                        {Categories.map((item: any, index: number) => (
                           <div key={index}>
                              <Link
                                 href={item.link}
                                 className="link link-hover text-base text-base-content/70 hover:text-primary transition hover:duration-300"
                              >
                                 {item.title}
                              </Link>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="col-span-12 lg:col-span-4">
               </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between py-8 bg-base-200 border-t border-base-content/10">
               <div className="flex items-center gap-2.5">
                  <Link href="/">
                     <Favicon logoFav={logo} />
                  </Link>
                  <div>
                     <h4 className="text-xl text-base-content font-sans">
                        FATİH EMRE<strong> BAYRAM</strong>
                     </h4>
                     <p className="mt-0.5 txt-base-content/e70 text-base">
                        © 2024.Türm hakları saklıdır
                     </p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-base-content/70">
                  <Link
                     href="/"
                     className="text-base border-r border-base-content/10 pr-4 hover:text-primary transition hover:duration-300"
                  >
                     Hakkımda
                  </Link>
                  <Link
                     href="/pages/gizlilik-politikasi"
                     className="text-base border-r border-base-content/10 pr-4  hover:text-primary transition hover:duration-300"
                  >
                     Gizlilik Politikası
                  </Link>
                  <Link
                     href="/"
                     className="text-base hover:text-primary transition hover:duration-300"
                  >
                     İletişim
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
