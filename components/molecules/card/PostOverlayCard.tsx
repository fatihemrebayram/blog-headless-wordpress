import { Post } from '@/models/post';
import Image from 'next/image';
import React from 'react'

/**
 * Our PostOverlayCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface Props {
   post: Post;
}

const PostOverlayCard = ({ post }: Props) => {
   return (
      <div className="card relative font-work">
         {/* Card Image */}
         <figure>
            <Image
               width="1216"
               height="450"
               alt={post.title}
               src={post.featuredImage.node.sourceUrl}
               className="rounded-xl"
            />
         </figure>
         <div className="card-body p-2 md:p-10 absolute bottom-0 w-full md:w-8/12 z-20">
            <div className="flex flex-wrap">
               {post.categories&&post.categories&&post.categories.nodes.map((category) => (
                  <div key={category.name} className="mr-2 w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium">
                     <p>{category.name}</p>
                  </div>

               ))}
            </div>

            <h3>
               <a
                  href={`/${post.slug}`}
                  className="text-neutral-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 hover:text-primary transition hover:duration-500"
               >
                  {post.title}
               </a>
            </h3>
            <div className="mt-3 md:mt-6 flex items-center gap-5 text-neutral-content">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image src={post.author.node.avatar.url} width={100} height={100} alt={post.author.node.name} />
                     </div>
                  </div>
                  <h5>
                     <a
                        href="/"
                        className="text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        {post.author.node.name}
                     </a>
                  </h5>
               </div>
               <p className=" text-xs md:text-base">{post.date.split("T")[0]}</p>
            </div>
         </div>

         {/*  overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
      </div>
   )
}

export default PostOverlayCard
