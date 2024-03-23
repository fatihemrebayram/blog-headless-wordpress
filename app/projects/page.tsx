import Advertisement from '@/components/organism/advertisement/Advertisement'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import PostCard from '@/components/molecules/card/PostCard'
import PageInfo from '@/components/organism/pageInfo/PageInfo'
import React, { Suspense } from 'react'
import { Post } from '@/models/post'
import { getPosts, getProjects } from '@/utils/actions'
import ProjectCard from '@/components/molecules/card/ProjectCard'
import { Project } from '@/models/project'
import ProjectOverlayCard from '@/components/molecules/card/ProjectOverlayCard'
import NotFoundPage from '../not-found'
import Loading from '../loading'

export const metadata = {
   title: 'Projelerim',
   description: 'Sizlerle projelerimi paylaşıyorum. Projelerim hakkında bilgi almak için bana ulaşabilirsiniz.',
   canonical: 'https://fatihemrebayram.com/projects',
   openGraph: {
      locale: 'tr_TR',
      type: 'website',
      url: 'https://fatihemrebayram.com/projects',
      siteName: 'Fatih Emre BAYRAM',
      title: 'Projelerim',
      description: 'Sizlerle projelerimi paylaşıyorum. Projelerim hakkında bilgi almak için bana ulaşabilirsiniz.',
      images: [
         {
            url: 'https://fatihemrebayram.com/projects.png',
            width: 512,
            height: 512,
            alt: 'Fatih Emre BAYRAM Proejcts Banner',
         },
      ],
   },
   twitter: {
      cardType: 'summary_large_image',
      site: '@fatihemrebay_',
   },
};

const Projects = async () => {


   const projects = await getProjects(120);
   if (projects.length === 0)
      return (
         <NotFoundPage />
      )
   //const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);
   return (
      <Suspense fallback={<Loading/>}>
      <main>
         <div className="container mx-auto p-3">
            {/* Page title info */}
            <section>
               <PageInfo pageTitle={"Blog Yazıları"} breadcrumbs={[{ text: "Blog Yazıları", url: "/blog" }]} />
            </section>

            {/* Banner */}
            <section className="my-12">
               <ProjectOverlayCard project={projects[0]} />
            </section>

            {/* All posts component */}
            <section className="my-20">
               <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((item: Project) => (
                     <ProjectCard key={item.title} project={item} developing={false} />
                  ))}
               </div>

            </section>

            {/* Advertisement component 
            <section className="mb-24">
               <Advertisement />
            </section> */}
         </div>
      </main>
      </Suspense>
   )
}

export default Projects
