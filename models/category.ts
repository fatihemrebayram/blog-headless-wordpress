export interface Category {
    name: string;
    link: string;
    slug: string;
    seo: {
      fullHead: string;
    };
  }
  

  
  export interface Categories {
    categories: { nodes: Category[]};
  }
  