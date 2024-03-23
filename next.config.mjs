/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        NEXT_PUBLIC_WORDPRESS_API_URL:"https://fatihemrebayram.com/wp-json/wp/v2",
        NEXT_PUBLIC_GRAPHQL_ENDPOINT:"https://fatihemrebayram.com/graphql",


     
      },
      images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '**',
            },
         /*   {
                protocol: 'http',
                hostname: '**',
                pathname: '**',
            },*/
        ],
    },
};

export default nextConfig;
