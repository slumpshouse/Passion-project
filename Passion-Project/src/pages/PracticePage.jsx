import Quiz from '../components/Quiz';
import AITutor from '../components/AITutor';

const PracticePage = () => {
  return (
    <div className="practice-page">
      <Quiz />
      <div style={{ marginTop: '2rem' }}>
        <AITutor />
      </div>
    </div>
  );
};

export default PracticePage;
