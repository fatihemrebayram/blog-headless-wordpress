import Link from 'next/link'
import React from 'react'

interface Breadcrumb {
    text: string;
    url?: string;
}

interface Props {
    breadcrumbs: Breadcrumb[];
    align?: 'center' | 'left' | 'right';
}

export default function Breadcrumb({  breadcrumbs,align="center" }:Props) {
   return (
      <div className="py-4 bg-base-100 text-${align} font-work">
        
        <div className={` text-sm xl:text-base breadcrumbs text-base-content/80 font-work mt-2 flex items-${align} justify-${align}`}>
            <ul>
               <li>
                  <Link href={`/`} className="hover:text-primary transition hover:duration-300 font-medium xl:font-medium  text-sm xl:text-base">
                     Anasayfa
                  </Link>
               </li>
               {breadcrumbs.map((breadcrumb, index) => (
                  <li key={index}>
                     {breadcrumb.url ? (
                        <Link href={breadcrumb.url} className="hover:text-primary transition hover:duration-300 font-medium  text-sm xl:text-base">
                           {breadcrumb.text}
                        </Link>
                     ) : (
                        <span className="text-base-content/60 font-medium  text-sm xl:text-base">
                           {breadcrumb.text}
                        </span>
                     )}
                  </li>
               ))}
            </ul>
         </div>
          
      </div>
   )
}
