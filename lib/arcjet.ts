import arcjet, {
    detectBot,
    fixedWindow,
    shield,
    request,
    validateEmail,
    slidingWindow,
    ArcjetDecision,
    createMiddleware,
} from "@arcjet/next";
import { getEnv } from './utils'

export {
    detectBot,
    fixedWindow,
    shield,
    request,
    slidingWindow,
    validateEmail,
    createMiddleware,
    ArcjetDecision,
};

const ARCJET_API_KEY = getEnv('ARCJET_API_KEY');
if (!ARCJET_API_KEY) {
    throw new Error("ARCJET_API_KEY is not set");
}

const aj = arcjet({
    key: ARCJET_API_KEY,
    rules: [],
})

export default aj;