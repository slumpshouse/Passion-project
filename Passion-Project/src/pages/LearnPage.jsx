import VideoPlayer from '../components/VideoPlayer';
import MusicPlayer from '../components/MusicPlayer';

const LearnPage = () => {
  return (
    <div className="learn-page">
      <VideoPlayer />
      <div style={{ marginTop: '2rem' }}>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default LearnPage;
