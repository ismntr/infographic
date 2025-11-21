import React, { useState, useEffect } from 'react';
import { signInWithPopup, auth, provider } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { enhancePrompt } from '../utils/promptStyles';
import { generateInfographic } from '../api/pollinationsAI';

const InfographicGenerator = () => {
    const [user, setUser] = useState(null);
    const [topic, setTopic] = useState('');
    const [style, setStyle] = useState('A');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to login. Please try again.");
        }
    };

    const handleLogout = () => {
        signOut(auth);
        setUser(null);
        setImageUrl(null);
        setTopic('');
    };

    const handleGenerate = async () => {
        if (!topic) return;
        if (!user) {
            setError("Please login first.");
            return;
        }

        setLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const enhancedPrompt = enhancePrompt(topic, style);

            // Generate using Pollinations.ai
            const url = await generateInfographic(enhancedPrompt);
            setImageUrl(url);

        } catch (err) {
            console.error(err);
            setError("Failed to generate image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
            {/* Header */}
            <header className="w-full max-w-4xl flex justify-between items-center py-6 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">InfographicAI</h1>
                {user && (
                    <div className="flex items-center gap-4">
                        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-gray-300" />
                        <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">Logout</button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="w-full max-w-2xl flex flex-col items-center gap-6">
                {!user ? (
                    <div className="text-center mt-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Stunning Infographics with AI</h2>
                        <p className="text-gray-600 mb-8">Login with your Google account to start generating professional infographics in seconds.</p>
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Login with Google
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">What infographic should I create today?</label>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., How LLMs work, Turkish Greetings..."
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Style</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStyle('A')}
                                        className={`p-4 rounded-lg border text-left transition-all ${style === 'A' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="font-medium text-gray-900">Technical Blueprint</div>
                                        <div className="text-xs text-gray-500 mt-1">Clean, vector art, professional, blue & white.</div>
                                    </button>
                                    <button
                                        onClick={() => setStyle('B')}
                                        className={`p-4 rounded-lg border text-left transition-all ${style === 'B' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="font-medium text-gray-900">Warm Mind Map</div>
                                        <div className="text-xs text-gray-500 mt-1">Hand-drawn, playful, earth tones, illustrative.</div>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading || !topic}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </span>
                                ) : "Generate Infographic"}
                            </button>
                        </div>

                        {error && (
                            <div className="w-full bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        {imageUrl && (
                            <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Result</h3>
                                <div className="relative group">
                                    <img
                                        src={imageUrl}
                                        alt="Generated Infographic"
                                        className="w-full rounded-lg shadow-sm"
                                    />
                                    <a
                                        href={imageUrl}
                                        download={`infographic-${topic.replace(/\s+/g, '-').toLowerCase()}.png`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default InfographicGenerator;
