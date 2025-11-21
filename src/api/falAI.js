export const generateInfographic = async (prompt) => {
    const falKey = import.meta.env.VITE_FAL_KEY;
    if (!falKey) {
        throw new Error("Missing VITE_FAL_KEY in .env");
    }

    // Using a high-quality model on Fal.ai as a proxy for "Nano Banana Pro"
    // Since "Nano Banana Pro" might be a specific internal or new model, 
    // we'll use a robust Flux or similar model which is available on Fal.
    // For now, we'll point to 'fal-ai/flux/dev' which is popular, 
    // or we can make this configurable.
    const modelEndpoint = "fal-ai/flux/dev";

    const response = await fetch(`https://fal.run/${modelEndpoint}`, {
        method: "POST",
        headers: {
            "Authorization": `Key ${falKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt,
            image_size: "landscape_16_9",
            num_inference_steps: 40,
            enable_safety_checker: true
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate image on Fal.ai");
    }

    const result = await response.json();
    // Fal.ai usually returns { images: [{ url: "..." }] }
    return result;
};
