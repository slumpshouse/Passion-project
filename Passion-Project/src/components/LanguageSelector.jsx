import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage, languages, userLevel, setUserLevel } = useLanguage();

  return (
    <div className="language-selector">
      <h2>Choose Your Language</h2>
      <div className="language-grid">
        {languages.map(lang => (
          <button
            key={lang.code}
            className={`language-card ${selectedLanguage === lang.code ? 'selected' : ''}`}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            <span className="language-flag">{lang.flag}</span>
            <span className="language-name">{lang.name}</span>
          </button>
        ))}
      </div>
      
      <div className="level-selector">
        <h3>Your Level</h3>
        <div className="level-buttons">
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <button
              key={level}
              className={`level-btn ${userLevel === level ? 'selected' : ''}`}
              onClick={() => setUserLevel(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
