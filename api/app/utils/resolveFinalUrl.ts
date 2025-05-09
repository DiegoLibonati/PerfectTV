import axios from "axios";

export const resolveFinalUrl = async (initialUrl: string): Promise<string> => {
  try {
    const response = await axios.get(initialUrl, {
      maxRedirects: 5,
      timeout: 5000,
    });
    return response.request.res.responseUrl;
  } catch (error) {
    console.error("Redirección fallida:", error);
    throw error;
  }
};
