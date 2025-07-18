"use client";

import type React from "react";

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/react";
import { memo, useCallback } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

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

// New interface for props passed to InputToRenderComponent
interface InputToRenderProps {
    id: string;
    type: "input" | "textarea" | "select"; // This corresponds to the 'as' prop from FormField
    value: string;
    onChange: (value: string) => void; // This is the direct onChange for Listbox, or the one passed to handleTextChange
    placeholder?: string;
    options?: OptionType[];
    sharedStyles: React.CSSProperties;
    sharedClasses: string;
    handleTextChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

// CRITICAL FIX: Move InputToRenderComponent outside FormFieldComponent
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
                className={`${sharedClasses} w-full text-left bg-white pr-10`}
            >
                {options?.find((opt) => opt.value === value)?.label || "Select"}
                <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                <ChevronUpDownIcon
                    className="w-5 h-5 text-[#1d073a]"
                    aria-hidden="true"
                />
                </span>
            </ListboxButton>
            <ListboxOptions
                className="absolute mt-1 w-full max-h-60 overflow-auto z-10 bg-white
                shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                text-[#1d073a] text-base font-semibold
                rounded-[255px_15px_225px_15px/15px_225px_15px_255px]"
            >
                {options?.map((option) => (
                <ListboxOption
                    key={option.value}
                    value={option.value}
                    className={({ focus }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-xl ${
                        focus ? "bg-[#1d073a] text-white" : "text-[#1d073a]"
                    }`
                    }
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
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
        "border border-[#1d073a] focus:outline-[#C3B1E1] placeholder:text-gray-100 placeholder:font-medium text-base font-semibold text-[#1d073a] py-2.5 px-4";

    const handleTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
        },
        [onChange]
    );

    return (
        <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-[#1d073a] text-base font-medium">
            {label}
        </label>
        <InputToRenderComponent
            id={id}
            type={as} // Pass 'as' as 'type' to InputToRenderComponent
            value={value}
            onChange={onChange} // Pass the original onChange for select, and for handleTextChange
            placeholder={placeholder}
            options={options}
            sharedStyles={sharedStyles}
            sharedClasses={sharedClasses}
            handleTextChange={handleTextChange}
        />
        </div>
    );
});

export default FormField;