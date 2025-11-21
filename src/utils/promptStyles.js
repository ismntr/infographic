export const enhancePrompt = (userTopic, style = 'A') => {
    if (style === 'A') {
        return `Create a high-quality educational infographic about ${userTopic}. Use a clean vector art style with a professional educational infographic, flowchart style, technical diagram, clean layout, blue and white color palette, rounded rectangles, arrows connecting steps, vector art style, high resolution, plain background. Ensure text is legible (or simulated layout).`;
    } else {
        return `Create a high-quality educational infographic about ${userTopic}. Use a casual illustrative infographic, mind map structure, branching connections, warm beige paper texture background, hand-drawn style icons, playful fonts, earth tones (orange, green, brown), distinct sections, explanatory text bubbles. Ensure text is legible (or simulated layout).`;
    }
};
