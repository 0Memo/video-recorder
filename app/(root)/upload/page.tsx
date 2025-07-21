"use client";

import { useState, useCallback, FormEvent, useEffect } from "react";
import FileInput from "../../../components/FileInput";
import FormField from "../../../components/FormField";
import { useFileInput } from "../../../lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../constants";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "../../../lib/actions/video";
import { useRouter } from "next/navigation";

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            'Content-Type': file.type,
            AccessKey: accessKey,
        },
        body: file,
    }).then((response) => {
        if (!response.ok) throw new Error('Upload failed')
    })
}

const UploadPage = () => {
    const router = useRouter()
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const [ videoDuration, setVideoDuration ] = useState(0) 

    const [ formData, setFormData ] = useState({
        title: "",
        description: "",
        visibility: "public",
    });

    const video = useFileInput(MAX_VIDEO_SIZE);
    useEffect(() => {
        if (video.duration !== null || 0) {
            setVideoDuration(video.duration);
        }
    }, [video.duration]);
    
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    const [error, setError] = useState<string | null>('');

    // These useCallback definitions are correct and crucial for stable onChange props
    const handleInputChange = useCallback(
        (field: keyof typeof formData) => (value: string) => {
        setFormData((prevState) => ({ ...prevState, [field]: value }));
        },
        [] // Empty dependency array ensures this function is created once
    );

    const handleSelectChange = useCallback(
        (field: keyof typeof formData) => (value: string) => {
        setFormData((prevState) => ({ ...prevState, [field]: value }));
        },
        [] // Empty dependency array ensures this function is created once
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            if (!video.file || !thumbnail.file) {
                setError('Please upload video and thumbnail')
                return
            }

            if (!formData.title || !formData.description) {
                setError('Please fill in all the details')
                return
            }

            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey
            } = await getVideoUploadUrl()

            if(!videoUploadUrl || !videoAccessKey) throw new Error('failed to get video credentials')

            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey)

            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl,
            } = await getThumbnailUploadUrl(videoId);

            if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey) throw new Error("failed to get thumbnail credentials");

            await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration
            })
            
        router.push(`/video/${videoId}`)
        } catch (error) {
            console.log('Error submitting form: ', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main
            className="wrapper-md upload-page"
        >
            <h1
                className="text-shadow-lg text-[#1d073a]"
            >
                Upload a video
            </h1>
            {error && <div className="error-field">{error}</div>}
            <form
                className="rounded-20 shadow-10 gap-6 w-full
                flex flex-col px-5 py-7.5"
                onSubmit={ handleSubmit }
            >
                <FormField
                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange("title")}
                    placeholder="Enter a clear and concise video title"
                />
                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange("description")}
                    placeholder="Describe what this video is about"
                    as="textarea"
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={ video.file }
                    previewUrl={ video.previewUrl }
                    inputRef={ video.inputRef }
                    onChange={ video.handleFileChange }
                    onReset={ video.resetFile }
                    type="video"
                />

                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={ thumbnail.file }
                    previewUrl={ thumbnail.previewUrl }
                    inputRef={ thumbnail.inputRef }
                    onChange={ thumbnail.handleFileChange }
                    onReset={ thumbnail.resetFile }
                    type="image"
                />

                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    onChange={handleSelectChange("visibility")}
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                    as="select"
                />

                <button
                    type="submit"
                    disabled={ isSubmitting }
                    className="rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                    bg-[#1d073a] text-white px-4 py-3 cursor-pointer text-base
                    font-semibold hover:bg-[#C3B1E1] transition-colors"
                >
                    { isSubmitting ? 'Uploading ...' : 'Upload video' }
                </button>
            </form>
        </main>
    );
};

export default UploadPage;