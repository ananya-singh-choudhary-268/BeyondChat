import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticleContent(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    // Remove obvious noise
    $("script, style, nav, footer, header, aside").remove();

    let text = "";

    if ($("article").length) {
      text = $("article").text();
    } else if ($("main").length) {
      text = $("main").text();
    } else {
      text = $("body").text();
    }

    // Normalize whitespace
    text = text.replace(/\s+/g, " ").trim();

    return text;
  } catch (error) {
    console.error(`Failed to scrape ${url}`);
    return "";
  }
}
