import PostCard from "@/components/molecules/card/PostCard";
import Breadcrumb from "@/components/organism/breadcrumbs/breadcrumbs";
import CustomTOC, { TOCItem } from "@/components/organism/content-table/CustomContentTable";
import { CustomOpenGraphMetadata, Post, Tag } from "@/models/post";
import { getPost, getPostsByCategory } from "@/utils/actions";
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Image from 'next/image';
import React, { Suspense } from "react";
import NotFoundPage from "../not-found";
import Loading from "../loading";
import { YouTubeEmbed } from "@next/third-parties/google";

export const dynamicParams = true;

interface Props {
    params: { slug: string }
}


export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // Fetch data
    const post = await getPost(params.slug);

    // Extract metadata from fullHead
    const fullHead = post.seo?.fullHead || '';

    // Extract title
    const titleMatch = fullHead.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : undefined;

    // Extract description
    const descriptionMatch = fullHead.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/);
    const description = descriptionMatch ? descriptionMatch[1] : undefined;

    // Extract og:image
    const ogImageMatch = fullHead.match(/<meta\s+property="og:image"\s+content="(.*?)"\s*\/?>/);
    const ogImage = ogImageMatch ? ogImageMatch[1] : undefined;

    // Extract other Open Graph metadata fields
    const ogTypeMatch = fullHead.match(/<meta\s+property="og:type"\s+content="(.*?)"\s*\/?>/);
    const ogType = ogTypeMatch ? ogTypeMatch[1] : undefined;

    const ogUrlMatch = fullHead.match(/<meta\s+property="og:url"\s+content="(.*?)"\s*\/?>/);
    const ogUrl = ogUrlMatch ? ogUrlMatch[1] : undefined;

    const ogSiteNameMatch = fullHead.match(/<meta\s+property="og:site_name"\s+content="(.*?)"\s*\/?>/);
    const ogSiteName = ogSiteNameMatch ? ogSiteNameMatch[1] : undefined;

    const ogPublishedTimeMatch = fullHead.match(/<meta\s+property="article:published_time"\s+content="(.*?)"\s*\/?>/);
    const ogPublishedTime = ogPublishedTimeMatch ? ogPublishedTimeMatch[1] : undefined;

    const ogModifiedTimeMatch = fullHead.match(/<meta\s+property="article:modified_time"\s+content="(.*?)"\s*\/?>/);
    const ogModifiedTime = ogModifiedTimeMatch ? ogModifiedTimeMatch[1] : undefined;

    const ogImageWidthMatch = fullHead.match(/<meta\s+property="og:image:width"\s+content="(.*?)"\s*\/?>/);
    const ogImageWidth = ogImageWidthMatch ? ogImageWidthMatch[1] : undefined;

    const ogImageHeightMatch = fullHead.match(/<meta\s+property="og:image:height"\s+content="(.*?)"\s*\/?>/);
    const ogImageHeight = ogImageHeightMatch ? ogImageHeightMatch[1] : undefined;

    const ogImageTypeMatch = fullHead.match(/<meta\s+property="og:image:type"\s+content="(.*?)"\s*\/?>/);
    const ogImageType = ogImageTypeMatch ? ogImageTypeMatch[1] : undefined;

    const ogImageAltMatch = fullHead.match(/<meta\s+property="og:image:alt"\s+content="(.*?)"\s*\/?>/);
    const ogImageAlt = ogImageAltMatch ? ogImageAltMatch[1] : undefined;

    const ogImageSecureUrlMatch = fullHead.match(/<meta\s+property="og:image:secure_url"\s+content="(.*?)"\s*\/?>/);
    const ogImageSecureUrl = ogImageSecureUrlMatch ? ogImageSecureUrlMatch[1] : undefined;

    // Construct metadata object
    const metadata: Metadata = {
        title,
        description,
        openGraph: {
            type: ogType as CustomOpenGraphMetadata["type"],
            url: ogUrl,
            siteName: ogSiteName,
            publishedTime: ogPublishedTime,
            modifiedTime: ogModifiedTime,
            images: ogImage ? [{ url: ogImage }] : undefined,
            imageWidth: ogImageWidth ? parseInt(ogImageWidth) : undefined,
            imageHeight: ogImageHeight ? parseInt(ogImageHeight) : undefined,
            imageType: ogImageType,
            imageAlt: ogImageAlt,
            imageSecureUrl: ogImageSecureUrl,
            // Add more Open Graph metadata fields here
        } as CustomOpenGraphMetadata,
    };

    return metadata;
}
const generateTOCData = (content: string): TOCItem[] => {
    const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/g);
    if (!headings) return [];
    return headings.map((heading) => {
        const idMatch = heading.match(/id="([^"]+)"/);
        const titleMatch = heading.match(/>([^<]+)</);
        if (!idMatch || !titleMatch) return null;
        return {
            id: idMatch[1],
            title: titleMatch[1],
            level: parseInt(heading.charAt(2)),
        } as TOCItem;
    }).filter((tocItem): tocItem is TOCItem => tocItem !== null);
};



const replaceHeading = (domNode: any) => {
    if (domNode.type === 'tag' && domNode.name.match(/^h[1-6]$/)) {
        // Extract the heading level from the tag name (h1, h2, ..., h6)
        const level = parseInt(domNode.name.charAt(1));
        return React.createElement(
            `h${level}`,
            {
                className: (4 - level) <= 1 ? `text-base-content font-semibold text-xl md:text-xl lg:text-xl leading-5 md:leading-10 mb-5 mt-5` : `text-base-content font-semibold text-${4 - level}xl md:text-${4 - level}xl lg:text-${4 - level}xl leading-5 md:leading-10 mb-5 mt-5`
            },
            domToReact(domNode.children) // Render the children of the heading
        );

    }
    return undefined;
}


const replaceFigure = (domNode: any) => {
    if (domNode.type === 'tag' && domNode.name === 'figure') {
        const children = domNode.children || [];
        const image = children.find((child: any) => child.name === 'img');
        const figcaption = children.find((child: any) => child.name === 'figcaption');

        if (image) {
            const imageElement = (
                <div className="flex justify-center items-center pt-5 ">
                    <div className="flex justify-center items-center p-5 rounded-xl">
                        <Image
                            src={image.attribs.src}
                            alt={image.attribs.alt || "image"}
                            width={image.attribs.width || 1920} // Adjust width as needed
                            height={image.attribs.height || 1080} // Use the calculated height
                            quality={70}
                        />
                    </div>
                </div>
            );

            if (figcaption) {
                const figcaptionElement = (
                    <figcaption className="text-center text-base-content/50 text-sm">{domToReact([figcaption])}</figcaption>
                );

                return (
                    <div>
                        {imageElement}
                        {figcaptionElement}
                    </div>
                );
            }

            return imageElement;
        }
    }
    return undefined;
};
const replaceToc = (domNode: any) => {
    if (domNode.type === 'tag' && domNode.attribs.class && domNode.attribs.class.includes('lwptoc')) {
        // Extract the TOC data from the figure element
        // Replace the figure element with the custom TOC component
        return <div />;
    }
    return undefined;
};


const replaceParagraph = (domNode: any) => {
    if (domNode.type === 'tag' && domNode.name === 'p') {
        return (
            <p className="leading-8 text-base-content/80 pt-4 pb-4">
                {domToReact(domNode.children)}
            </p>
        );
    }
    return undefined;
}
const replaceVideo = (domNode: any) => {
    if (domNode.name === 'figure' && domNode.attribs.class.includes('wp-block-embed') && domNode.attribs.class.includes('is-provider-youtube')) {
        // Extract the necessary attributes from the figure element
        const iframe = domNode.children.find((child: { name: string; }) => child.name === 'div').children.find((child: { name: string; }) => child.name === 'p').children.find((child: { name: string; }) => child.name === 'iframe');
        const src = iframe.attribs.src;
        const title = iframe.attribs.title;
        //  const width = iframe.attribs.width;
        //const height = iframe.attribs.height;

        // Replace the figure element with your custom YouTube component
        return (
            <figure className="flex justify-center items-center pt-5 ">
                <div className="flex justify-center items-center p-5 rounded-xl">
                    <iframe
                        title={title}
                        width={460}
                        height={260}
                        src={src}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </figure>
        );
    }
    return null;
};
const options: HTMLReactParserOptions = {
    replace: (domNode) =>
        replaceFigure(domNode) ||
        replaceHeading(domNode) ||
        replaceParagraph(domNode) ||
        replaceVideo(domNode) ||
        replaceToc(domNode)
};

const page = async ({ params }: Props) => {
    const post = await getPost(params.slug);
    const postsByCategory = await getPostsByCategory(post.categories.nodes[0].slug, 3);


    const parsedContent = parse(post.content, options);
    if (!post)
        return (
            <NotFoundPage />
        )
    return (
        <Suspense fallback={<Loading />}>

            <main>
                <section>
                    <div className="container mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-5/12 font-work">
                        <Breadcrumb breadcrumbs={[{ text: "Blog", url: "/blog" }, { text: post.title }]} align={"left"} />

                        <div className="py-5">
                            <div className="flex flex-wrap">
                                {post.categories.nodes.map((category) => (
                                    <div key={category.name} className="w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium mr-5">
                                        <p>{category.name}</p>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 ">
                                {post.title}
                            </h3>
                            <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
                                <div className=" flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-9 rounded-full">
                                            <Image
                                                src={post.author.node.avatar.url}
                                                alt={post.author.node.name}
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                    </div>
                                    <a
                                        href="/"
                                        className=" text-xs md:text-sm font-medium hover:text-primary transition hover:duration-300"
                                    >
                                        {post.author.node.name}
                                    </a>
                                </div>
                                <p className="text-xs md:text-sm">{post.date.split("T")[0]}</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Image
                                width="800"
                                height="462"
                                alt={post.title}
                                className={`rounded-xl mb-5`}
                                src={post.featuredImage.node.sourceUrl}
                            />
                        </div>
                        <CustomTOC tocData={generateTOCData(post.content)} />
                        {/* article section start  */}
                        <div className="font-serif">
                            {parsedContent}
                        </div>
                        <span className="block mb-2 mt-2">Etkietler:</span>
                        <div className="mt-2 flex flex-wrap">
                            {post.tags.nodes.map((tag) => (
                                <span
                                    key={tag.slug}
                                    className="btn no-animation hover:bg-primary hover:text-primary-content bg-primary/5 border-0 text-primary text-xs px-3 py-2 min-h-fit h-fit rounded-md w-fit capitalize font-small mr-2 mb-2 "
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                    </div>
                </section>
                <div className="container mx-auto  p-3 my-5">
                    <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
                        Benzer yazılar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {postsByCategory.posts.nodes.map((item: Post) => (
                            <PostCard key={item.title} post={item} />
                        ))}
                    </div>
                </div>
            </main>
        </Suspense>
    );
};

export default page;
