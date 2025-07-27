"use client";
import { useEffect } from "react";
import type { Dictionary } from "../lib/i18n/dictionaries";
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "../lib/i18n/utils";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    dictionary: Dictionary
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    dictionary
}: ConfirmModalProps) => {
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-xs">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg border border-[#1d073a]">
                    <h2 className="text-lg font-semibold text-[#1d073a] mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 mb-4">{message}</p>
                    <div className="flex justify-end gap-2">
                    <button
                        onClick={ onClose }
                        className="px-4 py-2 bg-gray-400 text-gray-800 hover:bg-gray-300 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-b-4 border-b-[#C3B1E1]"
                    >
                        { dictionary.delete.cancel }
                    </button>
                    <button
                        onClick={ onConfirm }
                        className="px-4 py-2 bg-[#1d073a] text-white hover:bg-[#C3B1E1] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-b-4 border-b-[#C3B1E1]"
                    >
                        { dictionary.delete.confirm }
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;