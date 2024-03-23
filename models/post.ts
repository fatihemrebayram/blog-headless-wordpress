
/*export interface Post {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt:{
        rendered:string;
    }
    yoast_head_json:YoastHeadJson;
}
interface YoastHeadJson {
    title: string;
    description: string;
    robots: {
        index: string;
        follow: string;
        'max-snippet': string;
        'max-image-preview': string;
        'max-video-preview': string;
    };
    canonical: string;
    og_locale: string;
    og_type: string;
    og_title: string;
    og_description: string;
    og_url: string;
    og_site_name: string;
    article_published_time: string;
    article_modified_time: string;
    og_image: {
        width: number;
        height: number;
        url: string;
        type: string;
    }[];
    author: string;
    twitter_card: string;
    twitter_creator: string;
    twitter_site: string;
    twitter_misc: {
        [key: string]: string;
    };
    schema: {
        '@context': string;
        '@graph': {
            '@type': string;
            '@id': string;
            isPartOf: {
                '@id': string;
            };
            author: {
                name: string;
                '@id': string;
            };
            headline: string;
            datePublished: string;
            dateModified: string;
            mainEntityOfPage: {
                '@id': string;
            };
            wordCount: number;
            commentCount: number;
            publisher: {
                '@id': string;
            };
            image: {
                "@type": string;
                inLanguage: string;
                "@id": string;
                url: string;
                contentUrl: string;
                width: number;
                height: number;
                caption: string;
            };
            thumbnailUrl: string;
            keywords: string[];
            articleSection: string[];
            inLanguage: string;
            potentialAction: {
                '@type': string;
                name: string;
                target: string[];
            }[];
        }[];
    };
}


export interface PostCardData {
    slug:string;
    title:string;
    description:string;
    thumbnailUrl:string;
    date: string;
    author: {
        name: string;
        image: string;
    };
    categories: string[];

}
*/
export interface Post {
  title: string;
  content: string;
  slug: string;
  date: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  author: {
    node: {
      avatar: {
        url: string;
      };
      name: string;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  seo?: {
    fullHead: string;
    breadcrumbs: {
      text: string;
      url: string;
    }[];
  };
  tags: {
    nodes: Tag[];
  }
}
export interface Tag {
  name: string;
  slug: string;

}

export interface GetPostsByCategory {
  name: string;
  slug: string;
  posts: {
    nodes: Post[];
  };
}
export interface CustomOpenGraphMetadata {
  type: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
  url?: string;
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  images?: { url: string }[];
  imageWidth?: number; // Add imageWidth property
  imageHeight?: number;
  imageType?: string;
  // Add more Open Graph metadata fields here
}

