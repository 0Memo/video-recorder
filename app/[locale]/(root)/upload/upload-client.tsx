"use client";
import {
  useState,
  useCallback,
  type FormEvent,
  useEffect,
  type ChangeEvent,
} from "react";
import FileInput from "../../../../components/FileInput";
import FormField from "../../../../components/FormField";
import { useFileInput } from "../../../../lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "../../../../constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "../../../../lib/actions/video";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import type { Dictionary } from "../../../../lib/i18n/dictionaries";
import { usePathname } from "next/navigation";
import {
    getLocaleFromPathname,
    addLocaleToPathname,
} from "../../../../lib/i18n/utils";

interface PageProps {
    dictionary: Dictionary;
}

const uploadFileToBunny = (
    file: File,
    uploadUrl: string,
    accessKey: string
): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
        "Content-Type": file.type,
        AccessKey: accessKey,
        },
        body: file,
    }).then((response) => {
        if (!response.ok) throw new Error("Upload failed");
    });
};

const UploadClient = ({ dictionary }: PageProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);

    const [formData, setFormData] = useState({
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

    useEffect(() => {
        const checkForRecordedVideo = async () => {
        try {
            const stored = sessionStorage.getItem("recordedVideo");
            if (!stored) return;
            const { url, name, type, duration } = JSON.parse(stored);
            const blob = await fetch(url).then((res) => res.blob());
            const file = new File([blob], name, { type, lastModified: Date.now() });
            if (video.inputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            video.inputRef.current.files = dataTransfer.files;

            const event = new Event("change", { bubbles: true });
            video.inputRef.current.dispatchEvent(event);
            video.handleFileChange({
                target: { files: dataTransfer.files },
            } as ChangeEvent<HTMLInputElement>);
            }
            if (duration) setVideoDuration(duration);
            sessionStorage.removeItem("recordedVideo");
            URL.revokeObjectURL(url);
        } catch (e) {
            console.log(e, "Error loading recorded video");
        }
        };
        checkForRecordedVideo();
    }, [video]);

    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);
    const [error, setError] = useState<string | null>("");

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
        e.preventDefault();
        setIsSubmitting(true);
        try {
        if (!video.file || !thumbnail.file) {
            setError("Please upload video and thumbnail");
            return;
        }
        if (!formData.title || !formData.description) {
            setError("Please fill in all the details");
            return;
        }

        const {
            videoId,
            uploadUrl: videoUploadUrl,
            accessKey: videoAccessKey,
        } = await getVideoUploadUrl();
        if (!videoUploadUrl || !videoAccessKey)
            throw new Error("failed to get video credentials");

        await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

        const {
            uploadUrl: thumbnailUploadUrl,
            accessKey: thumbnailAccessKey,
            cdnUrl: thumbnailCdnUrl,
        } = await getThumbnailUploadUrl(videoId);

        if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
            throw new Error("failed to get thumbnail credentials");

        await uploadFileToBunny(
            thumbnail.file,
            thumbnailUploadUrl,
            thumbnailAccessKey
        );

        await saveVideoDetails({
            videoId,
            thumbnailUrl: thumbnailCdnUrl,
            ...formData,
            duration: videoDuration,
        });

        setIsLoading(true);
        const homeUrl = addLocaleToPathname("/", currentLocale);
        router.push(homeUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        } catch (error) {
        console.log("Error submitting form: ", error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <>
        <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7.5 pt-12.5 pb-20">
            <h1 className="text-shadow-lg text-[#1d073a] text-3xl font-bold">
            {dictionary.upload.upload}
            </h1>
            {error && (
            <div className="border border-red-500 bg-red-100 text-red-700 p-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]">
                {error}
            </div>
            )}
            <form
            className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
            onSubmit={handleSubmit}
            >
            <FormField
                id="title"
                label={dictionary.upload.title}
                value={formData.title}
                onChange={handleInputChange("title")}
                placeholder={dictionary.upload.titlePlaceholder}
            />
            <FormField
                id="description"
                label={dictionary.upload.description}
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder={dictionary.upload.descriptionPlacherholder}
                as="textarea"
            />

            <FileInput
                id={dictionary.upload.videoMin}
                label={dictionary.upload.video}
                accept="video/*"
                file={video.file}
                previewUrl={video.previewUrl}
                inputRef={video.inputRef}
                onChange={video.handleFileChange}
                onReset={video.resetFile}
                type="video"
                dictionary={ dictionary }
            />

            <FileInput
                id={dictionary.upload.thumbnailMin}
                label={dictionary.upload.thumbnail}
                accept="image/*"
                file={thumbnail.file}
                previewUrl={thumbnail.previewUrl}
                inputRef={thumbnail.inputRef}
                onChange={thumbnail.handleFileChange}
                onReset={thumbnail.resetFile}
                type="image"
                dictionary={ dictionary }
            />

            <FormField
                id="visibility"
                label={dictionary.upload.visibility}
                value={formData.visibility}
                onChange={handleSelectChange("visibility")}
                options={[
                { value: "public", label: dictionary.upload.public },
                { value: "private", label: dictionary.upload.private },
                ]}
                as="select"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[255px_15px_225px_15px/15px_225px_15px_255px] bg-[#1d073a] text-white px-4 py-3 cursor-pointer text-base font-semibold hover:bg-[#C3B1E1] transition-colors border-b-4 border-b-[#C3B1E1]"
            >
                {isSubmitting ? dictionary.upload.uploading : dictionary.upload.uploadVideo}
            </button>
            </form>
        </main>
        {isLoading && <LoadingOverlay color="#1d073a" />}
        </>
    );
};

export default UploadClient;