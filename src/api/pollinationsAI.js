/**
 * Generates an infographic using Pollinations.ai (Free, No Key).
 * 
 * @param {string} prompt - The text prompt for the image.
 * @returns {Promise<string>} - A promise that resolves to the image URL.
 */
export const generateInfographic = async (prompt) => {
    // Pollinations.ai URL format: https://pollinations.ai/p/{prompt}?width={w}&height={h}&seed={random}
    // We encode the prompt to ensure it's URL-safe.
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 1000000);
    const width = 1024;
    const height = 1024;
    const model = 'flux'; // 'flux' is a high-quality model often available on Pollinations

    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // Return the URL directly. The <img> tag will handle loading.
    return imageUrl;
};
