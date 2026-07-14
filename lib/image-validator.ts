export async function validateImageUrl(url: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      // Local uploads start with /uploads/...
      if (url.startsWith("/uploads/")) {
        return { isValid: true };
      }
      return { isValid: false, error: "Invalid URL format" };
    }

    console.info(`[VALIDATION_START] Checking URL: ${url}`);
    
    // Perform a HEAD request to check if the image exists and is valid
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    
    // Some servers block HEAD requests, fallback to GET if needed
    if (response.status === 405 || response.status === 403) {
      console.info(`[VALIDATION_RETRY] HEAD failed with ${response.status}. Retrying with GET...`);
      const getResponse = await fetch(url, { method: 'GET', cache: 'no-store' });
      if (!getResponse.ok) {
         return { isValid: false, error: `Image URL returned status ${getResponse.status}` };
      }
      const contentType = getResponse.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        return { isValid: false, error: `Invalid content-type: ${contentType}` };
      }
      return { isValid: true };
    }

    if (!response.ok) {
      return { isValid: false, error: `Image URL returned status ${response.status}` };
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return { isValid: false, error: `Invalid content-type: ${contentType}` };
    }

    console.info(`[VALIDATION_SUCCESS] Image is valid (${contentType})`);
    return { isValid: true };
  } catch (error: any) {
    console.error(`[VALIDATION_FAILED] Network error validating URL:`, error.message);
    return { isValid: false, error: `Network error validating URL: ${error.message}` };
  }
}
