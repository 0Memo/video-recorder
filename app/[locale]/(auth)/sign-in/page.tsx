import { getDictionary } from "../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../lib/i18n/config";
import SignInClient from "./sign-in-client";

interface PageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

const SignInPage = async ({ params }: PageProps) => {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return <SignInClient dictionary={dictionary} />;
};

export default SignInPage;