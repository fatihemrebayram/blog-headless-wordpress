import { GetPostsByCategory, Post } from "@/models/post";
import { gql } from "@apollo/client";
import { Category } from "@/models/category";
import { Project } from "@/models/project";

export async function getPosts(pageSize: number) {
  const query = `
    query GetPosts($first: Int) {
      posts(first: $first) {
        nodes {
          title
          content
          slug
          date
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              avatar {
                url
              }
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          seo {
            breadcrumbs {
              text
              url
            }
          }
        }
      }
    }
  `;

  const variables = {
    first: pageSize,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data } = await res.json();
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getCategories() {
  const query = `
  
    query categories {
      categories {
        nodes {
          name
          link
          slug
          seo {
            fullHead
          }
        }
      }
    }
  
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    }
  );

  const { data } = await res.json();
  const categories = data.categories.nodes.map((edge: { node: any }) => edge);
  return categories as Category[];
}

export async function getPost(uri: string) {
  const query = `
    query GetPostByUri($uri: ID!) {
      post(id: $uri, idType: URI) {
        author {
            node {
              avatar {
                url
              }
              description
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          seo {
            breadcrumbs {
              text
              url
            }
            fullHead
          }
          tags {
            nodes {
              name
              slug
            }
          }
          title
          slug
          content
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          
      }
    }
        `;

  const variables = {
    uri,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.post) {
    return responseBody.data.post as Post;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

export async function getProjects(pageSize: number) {
  const query = `
  query getProjects($first: Int) {
    pages(where: {parent: "cG9zdDoxNTgz"}, first: $first) {
      nodes {
        title
        content
        slug
        date
        author {
          node {
            avatar {
              url
            }
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          fullHead
          breadcrumbs {
            text
            url
          }
        }
      }
    }
  }
    `;

    const variables = {
      first: pageSize,
    };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const { data } = await res.json();
      return data.pages.nodes ;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
}

export async function getProject(uri: string) {
  const query = `
  query getPage($uri: ID!) {
    page(id: $uri, idType: URI) {
       author {
              node {
                avatar {
                  url
                }
                description
                name
              }
            }
           
            seo {
              breadcrumbs {
                text
                url
              }
              fullHead
            }
           
            title
            slug
            content
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
    }
  }
        `;

  const variables = {
    uri,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ query, variables }),
  });
  const responseBody = await res.json();
  if (responseBody && responseBody.data && responseBody.data.page) {
    return responseBody.data.page as Project;
  } else {
    throw new Error("Failed to fetch the post");
  }
}




export async function searchPost(search: string) {
  const query = `
  query SearchPosts($search: String!) {
    posts(where: {search: $search}) {
    nodes {
            title
            content
            slug
            date
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              breadcrumbs {
                text
                url
              }
            }
          }
    }
  }
        `;

  const variables = {
    search,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.posts) {
    return responseBody.data.posts.nodes as Post[];
  } else {
    throw new Error("Failed to fetch the post");
  }
}

export async function getPostsByCategory(slug: string, pageSize: number) {
  const query = `
  query GetPostsByCategory($id: ID!, $first: Int) {
    category(id: $id, idType: SLUG) {
      name
      slug
      posts(first: $first) {
        nodes {
          title
          content
          slug
          date
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              avatar {
                url
              }
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          seo {
            breadcrumbs {
              text
              url
            }
          }
           tags {
        nodes {
          name
          slug
        }
      }
        }
      }
    }
  }
  `;

  const variables = {
    id: slug,
    first: pageSize,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseBody = await res.json();

    if (responseBody && responseBody.data && responseBody.data.category) {
      return responseBody.data.category as GetPostsByCategory;
    } else {
      throw new Error("Failed to fetch posts by category");
    }
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}

export const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
     posts(first: $first, after: $after) {
       pageInfo {
         hasNextPage
         endCursor
       }
       edges {
         node {
             title
             content
             slug
             date
             categories {
               nodes {
                 name
                 slug
               }
             }
             author {
               node {
                 avatar {
                   url
                 }
                 name
               }
             }
             featuredImage {
               node {
                 sourceUrl
                 altText
               }
             }
             seo {
               breadcrumbs {
                 text
                 url
               }
             }
         }
       }
     }
   }
  `;

export async function getHomePage() {
  const query = `
  query homePage {
    seo {
        schema {
          inLanguage
          siteName
          siteUrl
        }
        meta {
          homepage {
            description
            title
          }
        }
      }
  }
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await res.json();

  return data;
}

