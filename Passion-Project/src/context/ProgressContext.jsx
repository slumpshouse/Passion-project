import { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('languageProgress');
    return saved ? JSON.parse(saved) : {
      videosWatched: 0,
      songsListened: 0,
      quizzesPassed: 0,
      totalPoints: 0,
      streak: 0,
    };
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('languageProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (type, points = 10) => {
    setProgress(prev => ({
      ...prev,
      [type]: prev[type] + 1,
      totalPoints: prev.totalPoints + points,
    }));
  };

  const value = {
    progress,
    updateProgress,
    setProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
