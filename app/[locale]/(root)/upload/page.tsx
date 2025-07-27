import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import UploadClient from "./upload-client";

interface PageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

const UploadPage = async ({ params }: PageProps) => {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return <UploadClient dictionary={dictionary} />;
};

export default UploadPage;