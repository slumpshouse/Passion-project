import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';

const ProgressTracker = () => {
  const { progress } = useProgress();
  const { selectedLanguage } = useLanguage();

  const stats = [
    { label: 'Videos Watched', value: progress.videosWatched, icon: '📺', color: '#ff6b6b' },
    { label: 'Songs Listened', value: progress.songsListened, icon: '🎵', color: '#4ecdc4' },
    { label: 'Quizzes Passed', value: progress.quizzesPassed, icon: '✅', color: '#95e1d3' },
    { label: 'Total Points', value: progress.totalPoints, icon: '⭐', color: '#ffd93d' },
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', unlocked: progress.videosWatched > 0 },
    { name: 'Music Lover', description: 'Listen to 5 songs', unlocked: progress.songsListened >= 5 },
    { name: 'Quiz Master', description: 'Pass 3 quizzes', unlocked: progress.quizzesPassed >= 3 },
    { name: 'Dedicated Learner', description: 'Earn 100 points', unlocked: progress.totalPoints >= 100 },
  ];

  return (
    <div className="progress-tracker">
      <h2>📊 Your Progress</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <span className="stat-icon">{stat.icon}</span>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="achievements-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <span className="achievement-icon">
                {achievement.unlocked ? '🏆' : '🔒'}
              </span>
              <div className="achievement-info">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-streak">
        <h3>🔥 Learning Streak</h3>
        <div className="streak-display">
          <span className="streak-number">{progress.streak}</span>
          <span className="streak-label">days in a row</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
