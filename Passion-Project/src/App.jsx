import { useState } from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import CommunityPage from './pages/CommunityPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  // State lifting - managing active tab at the top level
  const [activeTab, setActiveTab] = useState('learn');

  // Handle tab changes (passed as prop to Header)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <LanguageProvider>
      <ProgressProvider>
        <div className="app">
          {/* Passing props: onTabChange and activeTab to Header */}
          <Header onTabChange={handleTabChange} activeTab={activeTab} />
          
          <div className="container">
            <LanguageSelector />
            
            {/* Conditional rendering based on lifted state */}
            {activeTab === 'learn' && <LearnPage />}
            {activeTab === 'practice' && <PracticePage />}
            {activeTab === 'community' && <CommunityPage />}
            {activeTab === 'progress' && <ProgressPage />}
          </div>
        </div>
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;

