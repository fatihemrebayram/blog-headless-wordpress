import Advertisement from '@/components/organism/advertisement/Advertisement'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import PostCard from '@/components/molecules/card/PostCard'
import PageInfo from '@/components/organism/pageInfo/PageInfo'
import React, { Suspense } from 'react'
import { Post } from '@/models/post'
import { searchPost } from '@/utils/actions'
import { Metadata, ResolvingMetadata } from 'next'
import NotFoundPage from '@/app/not-found'
import Loading from '@/app/loading'

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {


   // Construct metadata object
   const metadata: Metadata = {
      title: params.search,

   };

   return metadata;
}

export const dynamicParams = true;

interface Props {
   params: { search: string }
}

const PostsByCategory = async ({ params }: Props) => {

   const posts = await searchPost(params.search);
   if (posts.length === 0)
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
               <PageInfo pageTitle={params.search} breadcrumbs={[{ text: params.search, url: "/search/" + params.search }]} />
            </section>

          
            {/* All posts component */}
            <section className="my-20">
               <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts.map((item: Post) => (
                     <PostCard key={item.title} post={item} />
                  ))}
               </div>

            </section>

            {/* Advertisement component 
            <section className="mb-24">
               <Advertisement />
            </section>*/}
         </div>
      </main>
      </Suspense>
   )
}

export default PostsByCategory
