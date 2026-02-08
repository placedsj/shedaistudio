

import React, { useState, useCallback, useRef } from 'react';
import { generateImage, editImage, generateVideo, fileToBase64, getMimeTypeFromBase64 } from '../services/geminiService';
import { ImageSizeType, VideoAspectRatio } from '../types';

interface AIFeatureGalleryProps {
    onBack: () => void;
}

const AIFeatureGallery: React.FC<AIFeatureGalleryProps> = ({ onBack }) => {
    // State for Image Generation
    const [imageGenPrompt, setImageGenPrompt] = useState('');
    const [imageSize, setImageSize] = useState<ImageSizeType>('1K');
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [imageGenError, setImageGenError] = useState<string | null>(null);

    // State for Image Editing
    const [imageToEditFile, setImageToEditFile] = useState<File | null>(null);
    const [imageToEditBase64, setImageToEditBase64] = useState<string | null>(null);
    const [imageEditPrompt, setImageEditPrompt] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [imageEditError, setImageEditError] = useState<string | null>(null);

    // State for Video Generation
    const [videoFromImageFile, setVideoFromImageFile] = useState<File | null>(null);
    const [videoFromImageBase64, setVideoFromImageBase64] = useState<string | null>(null);
    const [videoGenPrompt, setVideoGenPrompt] = useState('');
    const [videoAspectRatio, setVideoAspectRatio] = useState<VideoAspectRatio>('16:9');
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoGenError, setVideoGenError] = useState<string | null>(null);
    const [videoGenStatus, setVideoGenStatus] = useState<string>('Upload an image and prompt to generate a video.');

    // API Key Selection check for paid models
    const checkApiKey = useCallback(async (featureName: string): Promise<boolean> => {
        if (typeof window.aistudio === 'undefined' || typeof window.aistudio.hasSelectedApiKey === 'undefined') {
            console.warn('AI Studio API not available. Cannot check API key.');
            return true; // Assume true for development if not in AI Studio environment
        }
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            alert(`A paid API key is required for ${featureName}. Please select one.`);
            await window.aistudio.openSelectKey();
            // Assume selection was successful and proceed, let the API call fail if not.
            return true; 
        }
        return true;
    }, []);

    const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>, base64Setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setter(file);
            try {
                const base64 = await fileToBase64(file);
                base64Setter(base64);
            } catch (error) {
                console.error("Error converting file to base64:", error);
                base64Setter(null);
            }
        } else {
            setter(null);
            base64Setter(null);
        }
    };

    const handleImageGeneration = useCallback(async () => {
        if (!imageGenPrompt) {
            setImageGenError('Please enter a prompt for image generation.');
            return;
        }
        if (!(await checkApiKey('Image Generation'))) return;

        setIsGeneratingImage(true);
        setGeneratedImageUrl(null);
        setImageGenError(null);
        try {
            const url = await generateImage(imageGenPrompt, imageSize);
            setGeneratedImageUrl(url);
        } catch (e: any) {
            setImageGenError(`Failed to generate image: ${e.message || 'Unknown error'}`);
            console.error(e);
        } finally {
            setIsGeneratingImage(false);
        }
    }, [imageGenPrompt, imageSize, checkApiKey]);

    const handleImageEditing = useCallback(async () => {
        if (!imageToEditBase64 || !imageEditPrompt) {
            setImageEditError('Please upload an image and enter an editing prompt.');
            return;
        }
        
        setIsEditingImage(true);
        setEditedImageUrl(null);
        setImageEditError(null);
        try {
            const mimeType = getMimeTypeFromBase64(imageToEditBase64);
            const url = await editImage(imageToEditBase64, mimeType, imageEditPrompt);
            setEditedImageUrl(url);
        } catch (e: any) {
            setImageEditError(`Failed to edit image: ${e.message || 'Unknown error'}`);
            console.error(e);
        } finally {
            setIsEditingImage(false);
        }
    }, [imageToEditBase64, imageEditPrompt]);

    const handleVideoGeneration = useCallback(async () => {
        if (!videoFromImageBase64 && !videoGenPrompt) {
            setVideoGenError('Please upload an image or enter a prompt to generate a video.');
            return;
        }
        if (!(await checkApiKey('Video Generation'))) return;

        setIsGeneratingVideo(true);
        setGeneratedVideoUrl(null);
        setVideoGenError(null);
        setVideoGenStatus('Initiating video generation...');
        try {
            const url = await generateVideo(videoFromImageBase64, videoGenPrompt, videoAspectRatio);
            setGeneratedVideoUrl(url);
            setVideoGenStatus('Video generated successfully!');
        } catch (e: any) {
            setVideoGenError(`Failed to generate video: ${e.message || 'Unknown error'}`);
            setVideoGenStatus('Video generation failed.');
            console.error(e);
        } finally {
            setIsGeneratingVideo(false);
        }
    }, [videoFromImageBase64, videoGenPrompt, videoAspectRatio, checkApiKey]);

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6 md:px-10 overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                <button onClick={onBack} className="bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-white/20 hover:bg-slate-700 text-xs font-bold mb-10">← BACK TO BUILDER</button>
                
                <h1 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                    AI <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Forge.</span>
                </h1>
                <p className="text-white/40 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed mb-20">
                    Unleash Gemini's creative power: generate images, edit existing photos, and animate your designs into video.
                </p>

                {/* Image Generation */}
                <section className="mb-20 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Image Generation <span className="text-sm font-medium text-purple-400">powered by Gemini 3 Pro Image</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Prompt</label>
                                <textarea
                                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:border-purple-500 outline-none resize-none"
                                    placeholder="A futuristic shed in a bioluminescent forest, highly detailed, cinematic lighting."
                                    value={imageGenPrompt}
                                    onChange={(e) => setImageGenPrompt(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Image Size</label>
                                <div className="flex gap-4">
                                    {['1K', '2K', '4K'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setImageSize(size as ImageSizeType)}
                                            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${imageSize === size ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleImageGeneration}
                                disabled={isGeneratingImage}
                                className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isGeneratingImage ? <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : 'GENERATE IMAGE'}
                            </button>
                            {imageGenError && <p className="text-red-400 text-sm">{imageGenError}</p>}
                        </div>
                        <div className="flex items-center justify-center bg-slate-900 rounded-3xl p-6 aspect-video">
                            {generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated" className="max-w-full max-h-full object-contain rounded-2xl border border-slate-700 shadow-md" />
                            ) : (
                                <span className="text-slate-500 text-sm">Generated image will appear here.</span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Image Editing */}
                <section className="mb-20 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Image Editing <span className="text-sm font-medium text-pink-400">powered by Gemini 2.5 Flash Image</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageFileChange(e, setImageToEditFile, setImageToEditBase64)}
                                    className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                                />
                                {imageToEditBase64 && (
                                    <div className="mt-4 w-32 h-32 overflow-hidden rounded-lg border border-slate-700">
                                        <img src={imageToEditBase64} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Edit Prompt</label>
                                <textarea
                                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:border-pink-500 outline-none resize-none"
                                    placeholder="Add a retro filter and make the sky purple. Remove the person in the background."
                                    value={imageEditPrompt}
                                    onChange={(e) => setImageEditPrompt(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                onClick={handleImageEditing}
                                disabled={isEditingImage || !imageToEditBase64}
                                className="w-full bg-pink-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-pink-500 transition-all shadow-lg shadow-pink-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isEditingImage ? <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : 'EDIT IMAGE'}
                            </button>
                            {imageEditError && <p className="text-red-400 text-sm">{imageEditError}</p>}
                        </div>
                        <div className="flex items-center justify-center bg-slate-900 rounded-3xl p-6 aspect-video">
                            {editedImageUrl ? (
                                <img src={editedImageUrl} alt="Edited" className="max-w-full max-h-full object-contain rounded-2xl border border-slate-700 shadow-md" />
                            ) : (
                                <span className="text-slate-500 text-sm">Edited image will appear here.</span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Video Generation */}
                <section className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Video Generation <span className="text-sm font-medium text-cyan-400">powered by Veo 3.1 Fast Generate Preview</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Upload Starting Image (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageFileChange(e, setVideoFromImageFile, setVideoFromImageBase64)}
                                    className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
                                />
                                {videoFromImageBase64 && (
                                    <div className="mt-4 w-32 h-32 overflow-hidden rounded-lg border border-slate-700">
                                        <img src={videoFromImageBase64} alt="Video Start Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Video Prompt (Optional)</label>
                                <textarea
                                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:border-cyan-500 outline-none resize-none"
                                    placeholder="A gentle camera pan across a lush garden, with a shed in the background."
                                    value={videoGenPrompt}
                                    onChange={(e) => setVideoGenPrompt(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-400">Aspect Ratio</label>
                                <div className="flex gap-4">
                                    {['16:9', '9:16'].map(ratio => (
                                        <button
                                            key={ratio}
                                            onClick={() => setVideoAspectRatio(ratio as VideoAspectRatio)}
                                            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${videoAspectRatio === ratio ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                                        >
                                            {ratio}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleVideoGeneration}
                                disabled={isGeneratingVideo || (!videoFromImageBase64 && !videoGenPrompt)}
                                className="w-full bg-cyan-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isGeneratingVideo ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                        {videoGenStatus}
                                    </>
                                ) : 'GENERATE VIDEO'}
                            </button>
                            {videoGenError && <p className="text-red-400 text-sm">{videoGenError}</p>}
                        </div>
                        <div className="flex items-center justify-center bg-slate-900 rounded-3xl p-6 aspect-video">
                            {generatedVideoUrl ? (
                                <video controls src={generatedVideoUrl} className="max-w-full max-h-full object-contain rounded-2xl border border-slate-700 shadow-md" />
                            ) : (
                                <span className="text-slate-500 text-sm">{videoGenStatus}</span>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AIFeatureGallery;