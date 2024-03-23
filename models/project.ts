export interface Project {
  title: string;
  content: string;
  slug: string;
  date: string;
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
}


