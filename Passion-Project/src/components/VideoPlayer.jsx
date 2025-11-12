import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';

const VideoPlayer = () => {
  const { selectedLanguage, userLevel } = useLanguage();
  const { updateProgress } = useProgress();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Simulate API call to fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockVideos = [
        {
          id: 1,
          title: `${selectedLanguage} for ${userLevel}s - Lesson 1`,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          duration: '10:30',
          level: userLevel,
        },
        {
          id: 2,
          title: `Daily Conversations in ${selectedLanguage}`,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          duration: '15:20',
          level: userLevel,
        },
        {
          id: 3,
          title: `${selectedLanguage} Grammar Essentials`,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          duration: '12:45',
          level: userLevel,
        },
      ];
      
      setVideos(mockVideos);
      setCurrentVideo(mockVideos[0]);
      setLoading(false);
    };

    fetchVideos();
  }, [selectedLanguage, userLevel]);

  const handleVideoComplete = () => {
    updateProgress('videosWatched', 15);
  };

  if (loading) {
    return <div className="loading">Loading videos... 🎬</div>;
  }

  return (
    <div className="video-player">
      <h2>📺 Watch & Learn</h2>
      
      {currentVideo && (
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src={currentVideo.url}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-controls">
            <h3>{currentVideo.title}</h3>
            <div className="controls-row">
              <button 
                className="subtitle-toggle"
                onClick={() => setShowSubtitles(!showSubtitles)}
              >
                {showSubtitles ? '📝 Subtitles: ON' : '📝 Subtitles: OFF'}
              </button>
              <button 
                className="complete-btn"
                onClick={handleVideoComplete}
              >
                ✅ Mark as Watched
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="video-list">
        <h3>More Videos</h3>
        <div className="video-grid">
          {videos.map(video => (
            <div
              key={video.id}
              className={`video-card ${currentVideo?.id === video.id ? 'active' : ''}`}
              onClick={() => setCurrentVideo(video)}
            >
              <div className="video-thumbnail">🎥</div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <span className="duration">{video.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
