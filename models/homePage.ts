interface SeoData {
  seo: {
    schema: {
      inLanguage: string;
      siteName: string;
      siteUrl: string;
    };
    meta: {
      homepage: {
        description: string;
        title: string;
      };
    };
  };
}

export type { SeoData };
