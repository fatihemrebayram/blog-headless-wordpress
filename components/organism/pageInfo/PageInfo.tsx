import Link from 'next/link'
import React from 'react'
import Breadcrumb from '../breadcrumbs/breadcrumbs';

interface Breadcrumb {
   text: string;
   url?: string;
}

interface PageInfoProps {
   pageTitle: string;
   breadcrumbs: Breadcrumb[];
}

export default function PageInfo({ pageTitle, breadcrumbs }: PageInfoProps) {
   return (
      <div className="py-4 bg-base-100 text-center font-work">
         <h1 className="text-base-content text-3xl font-semibold">
            {pageTitle}
         </h1>

         <Breadcrumb breadcrumbs={breadcrumbs} />

      </div>
   )
}
