import { getJson } from "serpapi";

export async function searchRelatedArticles(query) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google",
        q: query,
        api_key: process.env.SERPAPI_KEY,
        num: 5,
      },
      (json) => {
        if (!json.organic_results) {
          resolve([]);
          return;
        }

        const links = json.organic_results
          .map((r) => r.link)
          .filter((link) => link && !link.includes("beyondchats.com"))
          .slice(0, 2);

        resolve(links);
      }
    );
  });
}
