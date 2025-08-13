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
            <div className="container">
                <div className="cauldronBody"></div>
                <div className="cauldronLid">
                    <div className="innerLid"></div>
                    <div className="outerLid"> </div>
                </div>
                <div className="ladle"></div>
                <div className="bubbles">
                    <div className="bubbleContainer">
                    <div className="bubbleBound" id="bubbleBound1">
                        <div className="bubble" id="bubble1">
                        <div className="opaqueBackground"></div>
                        </div>
                    </div>
                    <div className="bubbleBound" id="bubbleBound2">
                        <div className="bubble" id="bubble2">
                        <div className="opaqueBackground"></div>
                        </div>
                    </div>
                    <div className="bubbleBound" id="bubbleBound3">
                        <div className="bubble" id="bubble3">
                        <div className="opaqueBackground"></div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="cauldronLegs">
                    <div className="leg" id="leg1"></div>
                    <div className="leg" id="leg2"></div>
                </div>
            </div>
        </div>
    );
}