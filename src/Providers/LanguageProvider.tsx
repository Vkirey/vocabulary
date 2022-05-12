import * as React from 'react'
import { LANGUAGES } from '../constants'
import { LSHelper } from '../Helpers/LocalStorageHelper'
import { LanguageContextType } from '../Types/LanguageTypes'

export const LanguageContext: React.Context<LanguageContextType | null> = React.createContext<LanguageContextType | null>(null)

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [language, setLanguage] = React.useState(LANGUAGES.ENG_TO_GER)

    const changeLanguage = React.useCallback((l: LANGUAGES) => {
        setLanguage(l)
        LSHelper.remove('lg')
        LSHelper.add('lg', l)
    }, [setLanguage])

    // Here we trying to read previously selected language from local storage, if there is no data or we're failed for some reason (corrupted data etc.) we clear it
    // And on every next change of language we update local storage accordingly
    React.useEffect(() => {
        try {
            const lgStored: LANGUAGES = LSHelper.get('lg') as LANGUAGES
            setLanguage(lgStored)
        } catch(e) {
            console.error('Failed to get stored language from local storage. Data may be corrupted, clearing it')
            LSHelper.remove('lg')
        }
    }, [])
    
    return <LanguageContext.Provider
        value={{
            language,
            changeLanguage
        }}
    >{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
    const languageContext = React.useContext(LanguageContext);
    if (!languageContext) {
      throw new Error(
        'useLanguage() hook requires a <LanguageProvider> higher in the tree',
      );
    }

    return languageContext
}