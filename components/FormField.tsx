"use client";

import type React from "react";
import { Fragment } from "react";

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
} from "@headlessui/react";
import { memo, useCallback } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../lib/hooks/useTheme";
import { cn } from "../lib/utils"

interface OptionType {
    label: string;
    value: string;
}

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    as?: "input" | "textarea" | "select";
    options?: OptionType[];
}

interface InputToRenderProps {
    id: string;
    type: "input" | "textarea" | "select";
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    options?: OptionType[];
    sharedStyles: React.CSSProperties;
    sharedClasses: string;
    handleTextChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const InputToRenderComponent = memo(function InputToRender({
    id,
    type,
    value,
    onChange,
    placeholder,
    options,
    sharedStyles,
    sharedClasses,
    handleTextChange,
}: InputToRenderProps) {
    const { theme, mounted } = useTheme();

    if (type === "textarea") {
        return (
        <textarea
            style={sharedStyles}
            className={sharedClasses}
            id={id}
            name={id}
            value={value}
            onChange={handleTextChange}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
        />
        );
    } else if (type === "select") {
        return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative">
                <ListboxButton
                    style={sharedStyles}
                    className={cn(sharedClasses,
                        theme === "dark"
                            ? "text-white focus:border-white"
                            : "text-[#1d073a] focus:border-[#C3B1E1]"
                    )}
                    suppressHydrationWarning={!mounted}
                >
                    {options?.find((opt) => opt.value === value)?.label || "Select"}
                    <span
                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                        <ChevronUpDownIcon
                            className={cn("w-5 h-5 text-[#C3B1E1]",
                                theme === "dark"
                                    ? "text-white"
                                    : "text-[#1d073a]"
                            )}
                            suppressHydrationWarning={!mounted}
                            aria-hidden="true"
                        />
                    </span>
                </ListboxButton>
                <ListboxOptions
                    portal={ true }
                    anchor="bottom start"
                    className={cn(
                        "z-50 mt-1 w-[var(--button-width)] max-h-60 overflow-auto",
                        "bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                        "text-base font-semibold rounded-[255px_15px_225px_15px/15px_225px_15px_255px]",
                        "border border-gray-200",
                        theme === "dark" ? "bg-none" : "bg-white border-white"
                    )}
                    style={{
                    '--button-width': 'var(--button-width)',
                    } as React.CSSProperties}
                >
                    {options?.map((option) => (
                    <ListboxOption
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-xl text-[#1d073a] focus:bg-[#C3B1E1] hover:bg-[#C3B1E1]"
                        style={sharedStyles}
                    >
                        {({ selected }) => (
                        <>
                            <span
                            className={`block truncate ${
                                selected ? "font-bold" : "font-normal"
                            }`}
                            >
                            {option.label}
                            </span>
                            {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon
                                    className="w-5 h-5 text-[#1d073a]"
                                    aria-hidden="true"
                                />
                            </span>
                            )}
                        </>
                        )}
                    </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
        );
    } else {
        return (
        <input
            style={sharedStyles}
            className={sharedClasses}
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={handleTextChange}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
        />
        );
    }
});

const FormField = memo(function FormFieldComponent({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    as = "input",
    options = [],
}: FormFieldProps) {
    const sharedStyles = {
        borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
    };
    const sharedClasses =
        "border-2 placeholder:font-medium text-left font-semibold py-2.5 px-4 block w-full text-sm h-[50px] px-4 text-slate-900 rounded-[8px] appearance-none hover:border-[#C3B1E1] focus:border-[#C3B1E1] focus:outline-[#C3B1E1] focus:ring-0 invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]y";

    const handleTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
        },
        [onChange]
    );

    const { theme, mounted } = useTheme();

    return (
        <div
            className="flex flex-col gap-2 relative"
        >
            <label
                htmlFor={id}
                className={cn("text-base font-medium peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[15px] leading-[150%] peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                theme === "dark"
                    ? "text-white bg-[#000000f8] border-[#1d073a]"
                    : "text-[#1d073a] bg-white border-white"
                )}
                suppressHydrationWarning={!mounted}
            >
                {label}
            </label>
            <InputToRenderComponent
                id={id}
                type={as}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                options={options}
                sharedStyles={sharedStyles}
                sharedClasses={cn(sharedClasses,
                    theme === "dark"
                        ? "text-white placeholder:text-gray-050 border-[#C3B1E1]"
                        : "text-[#1d073a] placeholder:text-[#1d073a] border-[#1d073a]"
                )}
                handleTextChange={handleTextChange}
            />
        </div>
    );
});

export default FormField;