"use client";

import { useState, useCallback } from "react";
import FileInput from "../../../components/FileInput";
import FormField from "../../../components/FormField";

const UploadPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    });
    const [error, setError] = useState<string | null>(null);
    console.log('setError', setError)

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

    return (
        <main className="wrapper-md upload-page">
        <h1 className="text-shadow-lg text-[#1d073a]">Upload a video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
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
            <FileInput />
            <FileInput />
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
        </form>
        </main>
    );
};

export default UploadPage;