/**
 * Generates an infographic using Pollinations.ai (Free, No Key).
 * 
 * @param {string} prompt - The text prompt for the image.
 * @returns {Promise<string>} - A promise that resolves to the image URL.
 */
export const generateInfographic = async (prompt) => {
    // Pollinations.ai simple URL format
    // The service generates images on-the-fly
    const encodedPrompt = encodeURIComponent(prompt);

    // Use simple URL format - the browser will handle loading
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    console.log('🎨 Generating image with Pollinations.ai');
    console.log('📝 Prompt:', prompt);
    console.log('🔗 URL:', imageUrl);

    // Return URL directly - let the browser <img> tag handle loading
    // Pollinations.ai generates images on-demand, so it may take a few seconds
    return imageUrl;
};
