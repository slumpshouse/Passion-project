import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const [userLevel, setUserLevel] = useState('beginner');

  const languages = [
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'french', name: 'French', flag: '🇫🇷' },
    { code: 'german', name: 'German', flag: '🇩🇪' },
    { code: 'japanese', name: 'Japanese', flag: '🇯🇵' },
    { code: 'korean', name: 'Korean', flag: '🇰🇷' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳' },
    { code: 'italian', name: 'Italian', flag: '🇮🇹' },
    { code: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'russian', name: 'Russian', flag: '🇷🇺' },
    { code: 'arabic', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'dutch', name: 'Dutch', flag: '🇳🇱' },
    { code: 'swedish', name: 'Swedish', flag: '🇸🇪' },
    { code: 'polish', name: 'Polish', flag: '🇵🇱' },
    { code: 'turkish', name: 'Turkish', flag: '🇹🇷' },
    { code: 'greek', name: 'Greek', flag: '🇬🇷' },
    { code: 'hebrew', name: 'Hebrew', flag: '🇮🇱' },
    { code: 'thai', name: 'Thai', flag: '🇹🇭' },
    { code: 'vietnamese', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'indonesian', name: 'Indonesian', flag: '🇮🇩' },
  ];

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    userLevel,
    setUserLevel,
    languages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
