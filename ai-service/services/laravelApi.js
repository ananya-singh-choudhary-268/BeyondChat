import axios from "axios";

const LARAVEL_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchLatestArticle() {
  try {
    const response = await axios.get(`${LARAVEL_BASE_URL}/articles-latest`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest article");
    throw error;
  }
}

export async function publishUpdatedArticle(payload) {
  try {
    const response = await axios.post(`${LARAVEL_BASE_URL}/articles`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to publish updated article");
    throw error;
  }
}
