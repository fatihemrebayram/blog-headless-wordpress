import { Post } from '@/models/post';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

/**
 * Our BannerCard is a reusable UI component used to display a top section of our website
 *
 * @property featured image, a heading, author name and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface Props {
   post: Post;
}
const BannerCard = ({ post }: Props) => {
   return (
      <div className="relative rounded-xl font-work mb-24">
         <Image
            width="1216"
            height="600"
            alt={post.featuredImage?.node.altText}
            src={post.featuredImage?.node.sourceUrl}
            className="rounded-xl"
         />
         <div className="absolute -bottom-16 left-4 md:left-14 rounded-xl p-4 md:p-10 bg-base-100 w-10/12 md:w-7/12 lg:w-6/12 shadow-[0_12px_24px_-6px] shadow-base-content/20">

            <div className="flex flex-wrap">
               {post.categories.nodes.map((category) => (
                  <div  key={category.name} className="mr-2 w-fit text-primary-content px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-4 font-medium">
                        <p>{category.name}</p>
                  </div>

               ))}
            </div>
            <h3>
               <Link
                  href={`/${post.slug}`}
                  className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 hover:text-primary transition-all hover:duration-500"
               >
                  {post.title}
               </Link>
            </h3>
            <div className="mt-6 flex items-center gap-5">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image src={post.author.node.avatar.url} alt={post.author.node.name} width={36} height={36} />
                     </div>
                  </div>
                  <h6>
                     <Link
                        href="/"
                        className="text-base-content/60 text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        {post.author.node.name}
                     </Link>
                  </h6>
               </div>
               <p className="text-base-content/60 text-xs md:text-base">
                  {post.date.split('T')[0]}
               </p>
            </div>
         </div>
      </div>
   )
}

export default BannerCard
