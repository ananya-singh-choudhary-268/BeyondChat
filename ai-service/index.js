import "dotenv/config";
import {
  fetchLatestArticle,
  publishUpdatedArticle,
} from "./services/laravelApi.js";
import { searchRelatedArticles } from "./services/search.js";
import { scrapeArticleContent } from "./services/scraper.js";
import { improveArticle } from "./services/llm.js";

async function run() {
  const article = await fetchLatestArticle();
  if (!article) {
    console.log("No article found");
    return;
  }

  console.log("Original article:", article.title);

  const links = await searchRelatedArticles(article.title);

  const references = [];
  for (const link of links) {
    const content = await scrapeArticleContent(link);
    if (content) {
      references.push({ url: link, content });
    }
  }

  const improvedHtml = await improveArticle({
    originalTitle: article.title,
    originalContent: article.content,
    references,
  });

  console.log("Article improved via LLM");

  await publishUpdatedArticle({
    title: article.title,
    content: improvedHtml,
    source: "ai_updated",
    original_article_id: article.id,
  });

  console.log("Updated article published successfully");
}

run();
