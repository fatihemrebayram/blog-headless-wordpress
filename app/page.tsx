import Advertisement from '@/components/organism/advertisement/Advertisement'
import PostCard from '@/components/molecules/card/PostCard'
import React from 'react'
import {  Post } from '@/models/post'
import { GET_POSTS, getCategories, getHomePage, getPosts, getPostsByCategory } from '@/utils/actions'
import BannerCard from '@/components/molecules/card/BannerCard'
import { getClient } from '@/utils/client'
import { ResolvingMetadata, Metadata } from 'next'
import Link from 'next/link'
/*
export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
   // Fetch data
const homePage = await getHomePage();
   // Construct metadata object
   const metadata: Metadata = {
       title:homePage.seo.meta.homepage.title,
       description: homePage.seo.meta.homepage.description,
       
       openGraph: {
           canonical: homePage.seo.schema.siteUrl, 
           type: "website",
           url: homePage.seo.schema.siteUrl,
           siteName: homePage.seo.schema.siteName,
           locale: homePage.seo.schema.inLanguage,
       } as CustomOpenGraphMetadata,
   };

   return metadata;
}
*/

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

   const posts = await getPosts(6);
  // const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);

   return (
      <main className="container mx-auto">
         {/* Banner Component */}
         <section>
            <BannerCard post={posts[0]} />
         </section>

         {/* Advertisement Component 
         <section className="pt-12">
            <Advertisement />
         </section>*/}

         {/* Latest Post */}
         <section className="my-20">
            <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
               En son yazılar
            </h3>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               {posts.map((item: Post) => (
                  <PostCard key={item.title} post={item} />
               ))}
            </div>
            <div className="flex items-center justify-center w-full mt-8">
               <Link href={'/blog'}>
                  <button className="btn btn-outline btn-secondary font-work px-5 text-base font-medium">
                     Tümünü görüntüle
                  </button>
                  </Link>
               </div>
            <div className="flex items-center justify-center w-full mt-8">
               {/*haveMorePosts ? (
                  <form
                     method="post"
                     onSubmit={(event) => {
                        event.preventDefault();
                      //  fetchMore({ variables: { after: data.posts.pageInfo.endCursor } });
                     }}
                  >
                     <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Load more"}
                     </button>
                  </form>
               ) : (
                  <p>✅ All posts loaded.</p>
               )*/}
            </div>
         </section>

         {/* Advertisement Component 
         <section className="mb-24">
            <Advertisement />
         </section>*/}
      </main>
   )
}

export default BlogListing
