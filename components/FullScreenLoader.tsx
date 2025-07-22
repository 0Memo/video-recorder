"use client";

import { useLoading } from "./LoadingProvider";

export default function FullScreenLoader() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
        <div
            className="h-24 w-24 animate-spin rounded-full border-8 border-gray-200 border-t-8 border-t-[#1d073a]" // Spinner styling
        ></div>
        </div>
    );
}