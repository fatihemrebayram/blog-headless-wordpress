import Loading from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import PostCard from "@/components/molecules/card/PostCard";
import ProjectCard from "@/components/molecules/card/ProjectCard";
import Breadcrumb from "@/components/organism/breadcrumbs/breadcrumbs";
import CustomTOC, { TOCItem } from "@/components/organism/content-table/CustomContentTable";
import { CustomOpenGraphMetadata, Post, Tag } from "@/models/post";
import { Project } from "@/models/project";
import { getPost, getPostsByCategory, getProject, getProjects } from "@/utils/actions";
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Image from 'next/image';
import React, { Suspense } from "react";

export const dynamicParams = true;

interface Props {
    params: { slug: string }
}


export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // Fetch data
    const post = await getProject(params.slug);

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
                            alt={image.attribs.alt}
                            width={image.attribs.width || 1920} // Adjust width as needed
                            height={image.attribs.height || 1080} // Use the calculated height
                            quality={70}
                        />
                    </div>
                </div>
            );

            if (figcaption) {
                const figcaptionElement = (
                    <figcaption className="text-center">{domToReact([figcaption])}</figcaption>
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
        const width = iframe.attribs.width;
        const height = iframe.attribs.height;

        // Replace the figure element with your custom YouTube component
        return (
            <figure className="flex justify-center items-center pt-5 ">
                <div className="flex justify-center items-center p-5 rounded-xl">
                    <iframe
                        title={title}
                        width={640}
                        height={360}
                        src={src}
                        frameBorder="0"
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
    const project = await getProject(params.slug);
    const threeProjects = await getProjects(3);


    const parsedContent = parse(project.content, options);
    if (!project)
        return (
            <NotFoundPage />
        )
    return (
        <Suspense fallback={<Loading/>}>

            <main>
                <section>
                    <div className="container mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-5/12 font-work">
                        <Breadcrumb breadcrumbs={[{ text: "Projelerim", url: "/blog" }, { text: project.title }]} align={"left"} />

                        <div className="py-5">

                            <h3 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 ">
                                {project.title}
                            </h3>
                            <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
                                <div className=" flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-9 rounded-full">
                                            <Image
                                                src={project.author.node.avatar.url}
                                                alt="avatar"
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                    </div>
                                    <a
                                        href="/"
                                        className=" text-xs md:text-sm font-medium hover:text-primary transition hover:duration-300"
                                    >
                                        {project.author.node.name}
                                    </a>
                                </div>
                                <p className="text-xs md:text-sm">{project.date.split("T")[0]}</p>
                            </div>
                        </div>
                        {project.featuredImage &&
                            <div className="mt-8">
                                <Image
                                    width="800"
                                    height="462"
                                    alt={`blog_image`}
                                    className={`rounded-xl mb-5`}
                                    src={project.featuredImage.node.sourceUrl}
                                />
                            </div>}
                        {/* article section start  */}
                        <div className="font-serif">
                            {parsedContent}
                        </div>

                    </div>
                </section>
                <div className="container mx-auto  p-3 my-5">
                    <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
                        Benzer yazılar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {threeProjects.map((item: Project) => (
                            <ProjectCard key={item.title} project={item} developing={false} />
                        ))}
                    </div>
                </div>
            </main>
        </Suspense>
    );
};

export default page;
