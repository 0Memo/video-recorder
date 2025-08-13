import { ICONS } from "../constants"
import Image from "next/image"
import type { Dictionary } from "../lib/i18n/dictionaries";
import { useTheme } from "../lib/hooks/useTheme";
import { cn } from "../lib/utils";

interface FileDictionaryProps extends FileInputProps {
    dictionary: Dictionary;
}

const FileInput = ({ id, label, accept, file, previewUrl, inputRef, onChange, onReset, type, dictionary }: FileDictionaryProps) => {
    const { theme, mounted } = useTheme();

    return (
        <section className="flex flex-col gap-2 relative">
            <label
                htmlFor={ id }
                className={cn("text-[#1d073a] text-base font-medium peer-focus:z-10 absolute text-[15px] leading-[150%] peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-3 z-10 origin-[0] disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                theme === "dark"
                    ? "text-white bg-[#000000f8] border-[#1d073a]"
                    : "text-[#1d073a] bg-white border-white"
                )}
                suppressHydrationWarning={!mounted}
            >
                { label }
            </label>
            <input
                type="file"
                id={ id }
                accept={ accept }
                ref={ inputRef}
                hidden
                onChange={ onChange }
            />
            {!previewUrl ? (
                <figure
                    onClick={ () => inputRef.current?.click() }
                    className={cn("border-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] text-gray-100 py-1.5 px-3.5 flex justify-center items-center w-full h-40 gap-2.5 cursor-pointer",
                        theme === "dark"
                            ? "border-[#C3B1E1]"
                            : "border-[#1d073a]"
                    )}
                >
                    <Image
                        src={ ICONS.upload }
                        alt="upload"
                        width={24}
                        height={24}
                        style={{
                            marginTop: "-12px",
                            filter:
                                theme === "dark"
                                ? "invert(100%)"
                                : "brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%) hue-rotate(229deg) brightness(92%) contrast(101%)",
                        }}
                    />
                    <p
                        className={cn("text-base font-medium",
                        theme === "dark"
                            ? "text-white"
                            : "text-[#1d073a]"
                        )}
                        suppressHydrationWarning={!mounted}
                    >
                        { dictionary.upload.text } { id }
                    </p>
                </figure>
            ) : (
                <div
                    className="relative w-full h-64 rounded-18 overflow-hidden"
                >
                    { type === "video"
                        ? <video src={ previewUrl} controls className="w-full h-full object-contain" />
                        : <Image src={ previewUrl } alt="image" fill />
                    }
                    <button
                        type="button"
                        onClick={ onReset }
                        className="absolute top-2 right-2 bg-gray-20 text-white p-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-90 hover:opacity-100 cursor-pointer"
                    >
                        <Image
                            src={ ICONS.close }
                            alt="close"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                    </button>
                    <p
                        className="absolute bottom-0 left-0 right-0 bg-dark-100 text-white px-3 py-1 text-sm truncate"
                    >
                        { file?.name }
                    </p>
                </div>
            )}
        </section>
    )
}

export default FileInput