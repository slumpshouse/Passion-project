import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';

const Header = ({ onTabChange, activeTab }) => {
  const { selectedLanguage, languages } = useLanguage();
  const { progress } = useProgress();

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <h1 className="logo">🌍 </h1>
          <div className="language-badge">
            <span className="flag">{currentLanguage?.flag}</span>
            <span className="language-name">{currentLanguage?.name}</span>
          </div>
        </div>
        <div className="streak-display">
          <span className="streak-icon">🔥</span>
          <span className="streak-text">{progress.streak} day streak</span>
        </div>
      </div>
      <nav className="nav-tabs">
        <button 
          className={activeTab === 'learn' ? 'active' : ''} 
          onClick={() => onTabChange('learn')}
        >
          📚 Learn
        </button>
        <button 
          className={activeTab === 'practice' ? 'active' : ''} 
          onClick={() => onTabChange('practice')}
        >
          ✏️ Practice
        </button>
        <button 
          className={activeTab === 'community' ? 'active' : ''} 
          onClick={() => onTabChange('community')}
        >
          💬 Community
        </button>
        <button 
          className={activeTab === 'progress' ? 'active' : ''} 
          onClick={() => onTabChange('progress')}
        >
          📊 Progress
        </button>
      </nav>
    </header>
  );
};

export default Header;
