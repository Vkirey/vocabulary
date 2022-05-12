import { LANGUAGES } from "../constants";

/**
 * Context type for languages provider
 */
export type LanguageContextType = {
    language: LANGUAGES,
    changeLanguage: (l: LANGUAGES) => void
}