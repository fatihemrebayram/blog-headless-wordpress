import { BannerSkeleton } from '@/components/skeletons/banner-skeleton';
import { Project } from '@/models/project';
import Image from 'next/image';
import React, { Suspense } from 'react'

/**
 * Our PostOverlayCard is a reusable UI component used to display a project as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

interface Props {
   project: Project;
}

const ProjectOverlayCard = ({ project }: Props) => {
   return (
      <Suspense fallback={<BannerSkeleton/>}>

      <div className="hidden xl:block card relative font-work">
         {/* Card Image */}
         <figure>
            <Image
               width="1216"
               height="450"
               alt={project.title}
               src={project.featuredImage.node.sourceUrl}
               className="rounded-xl"
            />
         </figure>
         <div className="card-body p-2 md:p-10 absolute bottom-0 w-full md:w-8/12 z-20">
        

            <h3>
               <a
                  href={`/projects/${project.slug}`}
                  className="text-neutral-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 hover:text-primary transition hover:duration-500"
               >
                  {project.title}
               </a>
            </h3>
            <div className="mt-3 md:mt-6 flex items-center gap-5 text-neutral-content">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image src={project.author.node.avatar.url} width={100} height={100} alt={project.author.node.name} />
                     </div>
                  </div>
                  <h5>
                     <a
                        href="/"
                        className="text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        {project.author.node.name}
                     </a>
                  </h5>
               </div>
               <p className=" text-xs md:text-base">{project.date.split("T")[0]}</p>
            </div>
         </div>

         {/*  overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
      </div>
      </Suspense>
   )
}

export default ProjectOverlayCard
