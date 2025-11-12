import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';

const MusicPlayer = () => {
  const { selectedLanguage } = useLanguage();
  const { updateProgress } = useProgress();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate API call to fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockSongs = [
        {
          id: 1,
          title: `Popular ${selectedLanguage} Song 1`,
          artist: 'Famous Artist',
          duration: '3:45',
          lyrics: `These are the lyrics in ${selectedLanguage}...\nLine 1\nLine 2\nLine 3`,
        },
        {
          id: 2,
          title: `${selectedLanguage} Classic`,
          artist: 'Traditional',
          duration: '4:20',
          lyrics: `Traditional lyrics...\nVerse 1\nChorus\nVerse 2`,
        },
        {
          id: 3,
          title: `Modern ${selectedLanguage} Hit`,
          artist: 'New Artist',
          duration: '3:15',
          lyrics: `Modern song lyrics...\nIntro\nVerse\nChorus`,
        },
      ];
      
      setSongs(mockSongs);
      setLoading(false);
    };

    fetchSongs();
  }, [selectedLanguage]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentSong) {
      // Mark song as listened after playing
      setTimeout(() => {
        updateProgress('songsListened', 10);
      }, 2000);
    }
  };

  const selectSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(false);
  };

  if (loading) {
    return <div className="loading">Loading music... 🎵</div>;
  }

  return (
    <div className="music-player">
      <h2>🎵 Listen & Learn</h2>
      
      {currentSong ? (
        <div className="player-container">
          <div className="now-playing">
            <div className="album-art">🎸</div>
            <div className="song-info">
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
              <span className="duration">{currentSong.duration}</span>
            </div>
          </div>
          
          <div className="player-controls">
            <button className="control-btn">⏮️</button>
            <button className="play-btn" onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn">⏭️</button>
          </div>
          
          <button 
            className="lyrics-toggle"
            onClick={() => setShowLyrics(!showLyrics)}
          >
            {showLyrics ? '📜 Hide Lyrics' : '📜 Show Lyrics'}
          </button>
          
          {showLyrics && (
            <div className="lyrics-container">
              <h4>Lyrics</h4>
              <pre className="lyrics">{currentSong.lyrics}</pre>
            </div>
          )}
        </div>
      ) : (
        <p className="select-song">Select a song to start listening</p>
      )}

      <div className="song-list">
        <h3>Playlist</h3>
        {songs.map(song => (
          <div
            key={song.id}
            className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
            onClick={() => selectSong(song)}
          >
            <span className="song-icon">🎵</span>
            <div className="song-details">
              <h4>{song.title}</h4>
              <p>{song.artist} • {song.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
