import GhostContentAPI, { PostOrPage, GhostAPI, GhostError, BrowseFunction, PostsOrPages  } from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://bloc.digitalpress.blog',
  key: 'e19d4fb56b38773762231676a8',
  version: "v5.0"
});


// Navigation
export async function getNavigation() {
    return await api.settings.browse()
      .catch((error: Error) => {
        console.log(error)
    });
}

// Posts (Home page )
export async function getPosts() {
    return await api.posts
      .browse({
        include: ["tags", "authors"],
        limit: 10
      })
      .catch((error: GhostError) => {
        throw error
      });
  }

// Read (Reading page)
export async function getSinglePost(postSlug: string) {
    return await api.posts
      .read({
        slug: postSlug
      }, { include: ["tags", "authors"] })
      .catch((error: Error) => {
        console.log(error)
      });
  }

  // Function to get posts by category (tag)
export async function getPostsByTag(tagSlug: string) {
    return await api.posts
      .browse({
        filter: `tag:${tagSlug}`,
        include: ["tags", "authors"],
        limit: "all"
      })
      .catch((error: GhostError) => {
        throw error
      });
  }

  //function to get single tag
  export async function getSingleTag(tagSlug: string) {

    return await api.tags.read({ slug: tagSlug })
      .catch((error: Error) => {
        console.log(error)
      });
  }

// function to get all tags
export async function getAllTags() {
    return await api.tags
      .browse({
        include: "count.posts",
        limit: "all"
      })
      .catch((error: GhostError) => {
        throw error
      });
  }