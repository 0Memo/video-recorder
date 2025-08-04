"use client";

import { ElementType, HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/hooks/useTheme";

interface TextWithThemeProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    className?: string;
}

const TextWithTheme = ({
    as: Component = "span",
    className = "",
    children,
    ...props
}: TextWithThemeProps) => {
    const { theme, mounted } = useTheme();
    if (!mounted) {
        return (
        <Component
            className={cn("text-[#1d073a]", className)}
            {...props}
            suppressHydrationWarning
        >
            {children}
        </Component>
        );
    }

    return (
        <Component
            className={cn(
                theme === "dark" ? "text-white" : "text-[#1d073a]",
                className
            )}
            {...props}
            suppressHydrationWarning
        >
            {children}
        </Component>
    );
};

export default TextWithTheme;