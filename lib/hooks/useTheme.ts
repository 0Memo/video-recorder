"use client";

import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const root = document.documentElement;
        const saved = localStorage.getItem("theme");

        if (
            saved === "dark" ||
            (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            root.classList.add("dark");
            setTheme("dark");
        } else {
            root.classList.remove("dark");
            setTheme("light");
        }

        // Listen for theme changes from other components
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "theme") {
                const newTheme = e.newValue as "light" | "dark";
                if (newTheme === "dark") {
                    root.classList.add("dark");
                    setTheme("dark");
                } else {
                    root.classList.remove("dark");
                    setTheme("light");
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
            // Trigger storage event for other components
            window.dispatchEvent(new StorageEvent("storage", {
                key: "theme",
                newValue: "dark"
            }));
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
            // Trigger storage event for other components
            window.dispatchEvent(new StorageEvent("storage", {
                key: "theme",
                newValue: "light"
            }));
        }
    };

    return { theme, toggleTheme, mounted };
}