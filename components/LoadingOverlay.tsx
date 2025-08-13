"use client";

import type React from "react";

interface LoadingOverlayProps {
    color?: string;
}

export default function LoadingOverlay({
    color = "#1d073a",
}: LoadingOverlayProps) {
  // Use a style tag to inject the custom color as a CSS variable
  // This allows the border color to be dynamic based on the prop
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <style jsx>{`
                .spinner-border {
                border-top-color: var(--spinner-color);
                border-right-color: var(--spinner-color);
                border-bottom-color: var(--spinner-color);
                border-left-color: transparent;
                }
            `}</style>
            <div
                className="spinner-border h-80 w-80 animate-spin rounded-full border-10"
                role="status"
                aria-label="Loading"
                style={{ "--spinner-color": color } as React.CSSProperties}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}