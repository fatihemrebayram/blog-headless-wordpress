import Advertisement from '@/components/organism/advertisement/Advertisement'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import PostCard from '@/components/molecules/card/PostCard'
import PageInfo from '@/components/organism/pageInfo/PageInfo'
import React, { Suspense } from 'react'
import { Post } from '@/models/post'
import { getClient } from '@/utils/client'
import { GET_POSTS, getPosts } from '@/utils/actions'
import NotFoundPage from '../not-found'
import Loading from '../loading'

export const metadata = {
   title: 'Fatih Emre BAYRAM',
   description: 'Sitemde hata çözümleri, çeşitli anlatımlar vb. şeyler olmak üzere paylaşıyorum. Ayrıca çoğu yazının video hali de bulunmakta.',
   canonical: 'https://fatihemrebayram.com/',
   openGraph: {
      locale: 'tr_TR',
      type: 'website',
      url: 'https://fatihemrebayram.com/',
      siteName: 'Fatih Emre BAYRAM',
      title: 'Fatih Emre BAYRAM',
      description: 'Sitemde hata çözümleri, çeşitli anlatımlar vb. şeyler olmak üzere paylaşıyorum. Ayrıca çoğu yazının video hali de bulunmakta.',
      images: [
         {
            url: 'https://fatihemrebayram.com/Logo.png',
            width: 512,
            height: 512,
            alt: 'Fatih Emre BAYRAM Logo',
         },
      ],
   },
   twitter: {
      cardType: 'summary_large_image',
      site: '@fatihemrebay_',
   },
};

const BlogListing = async () => {


   const posts = await getPosts(120);
   if (posts.length === 0)
      return (
         <NotFoundPage />
      )
   //const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);
   return (
      <Suspense fallback={<Loading />}>

         <main>
            <div className="container mx-auto p-3">
               {/* Page title info */}
               <section>
                  <PageInfo pageTitle={"Blog Yazıları"} breadcrumbs={[{ text: "Blog Yazıları", url: "/blog" }]} />
               </section>

               {/* Banner */}
               <section className="my-12">
                  <PostOverlayCard post={posts[0]} />
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

export default BlogListing
