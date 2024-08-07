import { CardSkeleton } from '@/components/skeletons/card-skeleton';
import { Post } from '@/models/post';
import { Project } from '@/models/project';
import Image from 'next/image';
import Link from 'next/link'
import React, { Suspense } from 'react'

/**
 * Our PostCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface Props {
    project: Project;
   developing:boolean;
}
const ProjectCard = ({ project ,developing}: Props) => {
   return (
      <Suspense fallback={<CardSkeleton/>}>
      <div className="card w-fit p-4 border border-base-content/10 rounded-xl font-work">
         <figure>
            <Image
               src={project.featuredImage.node.sourceUrl}
               alt={project.title}
               className={`rounded-xl`}
               width={1920}
               height={1080}
            />
         </figure>
         <div className="card-body py-6 px-2">
            <div className="flex flex-wrap">
               {developing&&
                  <span  className="btn no-animation hover:bg-primary hover:text-primary-content bg-primary/5 border-0 text-primary text-sm px-3 py-2 min-h-fit h-fit rounded-md w-fit capitalize font-medium mr-2 mb-2">
                    Geliştiriliyor
                  </span>
               }
            </div>


            <h3>
               <Link
                  href={"/projects/" + project.slug}
                  className="text-base-content hover:text-primary transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl lg:text-2xl mt-2"
               >
                  {project.title}
               </Link>
            </h3>
            <div className="mt-5 flex items-center gap-5 text-base-content/60 ">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image src={project.author.node.avatar.url} alt={project.author.node.name} width={256} height={256} />
                     </div>
                  </div>
                  <h5>
                     <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition hover:duration-300"
                     >
                        {project.author.node.name}
                     </Link>
                  </h5>
               </div>
               <p className="text-sm">{project.date.split("T")[0]}</p>
            </div>
         </div>
      </div>
      </Suspense>
   )
}

export default ProjectCard
