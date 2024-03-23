import { Post } from '@/models/post';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

/**
 * Our PostCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface Props {
   post: Post;
}
const PostCard = ({ post }: Props) => {
   return (
      <div className="card w-fit p-4 border border-base-content/10 rounded-xl font-work">
         <figure>
            <Image
               src={post.featuredImage.node.sourceUrl}
               alt={post.title}
               className={`rounded-xl`}
               width={640}
               height={480}
            />
         </figure>
         <div className="card-body py-6 px-2">
            <div className="flex flex-wrap">
               {post.categories.nodes.map((category: { name: string ,slug:string}) => (
                  <span key={category.name} className="btn no-animation hover:bg-primary hover:text-primary-content bg-primary/5 border-0 text-primary text-sm px-3 py-2 min-h-fit h-fit rounded-md w-fit capitalize font-medium mr-2 mb-2">
                     <Link href={"/category/"+category.slug}>{category.name}</Link>
                  </span>
               ))}
            </div>


            <h3>
               <Link
                  href={"/" + post.slug}
                  className="text-base-content hover:text-primary transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl lg:text-2xl mt-2"
               >
                  {post.title}
               </Link>
            </h3>
            <div className="mt-5 flex items-center gap-5 text-base-content/60 ">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image src={post.author.node.avatar.url} alt={post.author.node.name}width={256} height={256} />
                     </div>
                  </div>
                  <h5>
                     <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition hover:duration-300"
                     >
                        {post.author.node.name}
                     </Link>
                  </h5>
               </div>
               <p className="text-sm">{post.date.split("T")[0]}</p>
            </div>
         </div>
      </div>
   )
}

export default PostCard
