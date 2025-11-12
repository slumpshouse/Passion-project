import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';

const Quiz = () => {
  const { selectedLanguage, userLevel } = useLanguage();
  const { updateProgress } = useProgress();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  // Generate questions based on the selected language and level
  useEffect(() => {
    const generateQuestions = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create questions based on common phrases learned in videos/music
      const questionBank = {
        beginner: [
          {
            id: 1,
            question: `How do you say "Hello" in ${selectedLanguage}?`,
            correctAnswer: getGreeting(selectedLanguage),
            acceptableAnswers: getGreetingVariants(selectedLanguage),
            explanation: `This is one of the first greetings you learn in ${selectedLanguage}. Practice saying it out loud!`,
            category: 'Greetings',
            type: 'typing',
          },
          {
            id: 2,
            question: `Which of these means "Thank you" in ${selectedLanguage}?`,
            options: getThanksOptions(selectedLanguage),
            correctAnswer: 0,
            explanation: `Expressing gratitude is essential in any language. Use this phrase daily!`,
            category: 'Common Phrases',
            type: 'multiple-choice',
          },
          {
            id: 3,
            question: `Type the word for "Goodbye" in ${selectedLanguage}:`,
            correctAnswer: getGoodbye(selectedLanguage),
            acceptableAnswers: getGoodbyeVariants(selectedLanguage),
            explanation: `Practice this phrase when ending conversations in ${selectedLanguage}.`,
            category: 'Greetings',
            type: 'typing',
          },
          {
            id: 4,
            question: `What is "Water" in ${selectedLanguage}?`,
            options: getWaterOptions(selectedLanguage),
            correctAnswer: 0,
            explanation: `Essential vocabulary from the basics video lesson. Review it again!`,
            category: 'Basic Vocabulary',
            type: 'multiple-choice',
          },
          {
            id: 5,
            question: `Type how you would ask "How are you?" in ${selectedLanguage}:`,
            correctAnswer: getHowAreYou(selectedLanguage),
            acceptableAnswers: getHowAreYouVariants(selectedLanguage),
            explanation: `You heard this in the daily conversations video. Listen to it again to improve pronunciation!`,
            category: 'Greetings',
            type: 'typing',
          },
          {
            id: 6,
            question: `Select "Yes" in ${selectedLanguage}:`,
            options: getYesOptions(selectedLanguage),
            correctAnswer: 0,
            explanation: `Repetition helps! Say "yes" 10 times in ${selectedLanguage} right now.`,
            category: 'Basic Vocabulary',
            type: 'multiple-choice',
          },
          {
            id: 7,
            question: `Write "No" in ${selectedLanguage}:`,
            correctAnswer: getNo(selectedLanguage),
            acceptableAnswers: getNoVariants(selectedLanguage),
            explanation: `This was in the first lesson. Keep practicing simple words like this!`,
            category: 'Basic Vocabulary',
            type: 'typing',
          },
          {
            id: 8,
            question: `From the music lesson, which word means "Love" in ${selectedLanguage}?`,
            options: getLoveOptions(selectedLanguage),
            correctAnswer: 0,
            explanation: `This word appeared in the song lyrics. Listen to the song again!`,
            category: 'From Music',
            type: 'multiple-choice',
          },
        ],
        intermediate: [
          {
            id: 1,
            question: `Based on the grammar video, how do you form the past tense in ${selectedLanguage}?`,
            options: ['Add -ed suffix', 'Change verb ending', 'Use auxiliary verb', 'It varies by verb'],
            correctAnswer: 3,
            explanation: `Review the grammar essentials video to understand verb conjugation patterns.`,
            category: 'Grammar',
            type: 'multiple-choice',
          },
          {
            id: 2,
            question: `Type the phrase for "I would like..." in ${selectedLanguage}:`,
            correctAnswer: getWouldLike(selectedLanguage),
            acceptableAnswers: getWouldLikeVariants(selectedLanguage),
            explanation: `This phrase was used multiple times in the restaurant conversation. Practice it!`,
            category: 'Phrases',
            type: 'typing',
          },
          {
            id: 3,
            question: `Which is the polite way to say "Please" in ${selectedLanguage}?`,
            options: getPleaseOptions(selectedLanguage),
            correctAnswer: 0,
            explanation: `Politeness is key! Use this in every request you make.`,
            category: 'Politeness',
            type: 'multiple-choice',
          },
          {
            id: 4,
            question: `Write "Excuse me" in ${selectedLanguage}:`,
            correctAnswer: getExcuseMe(selectedLanguage),
            acceptableAnswers: getExcuseMeVariants(selectedLanguage),
            explanation: `This phrase is useful in many situations. Practice it often!`,
            category: 'Politeness',
            type: 'typing',
          },
        ],
        advanced: [
          {
            id: 1,
            question: `From the cultural video: What's the appropriate way to decline an invitation in ${selectedLanguage}?`,
            options: ['Direct refusal', 'Apologetic refusal with reason', 'Silent decline', 'Ignore the invitation'],
            correctAnswer: 1,
            explanation: `Cultural context matters. Review the cultural etiquette section!`,
            category: 'Culture',
            type: 'multiple-choice',
          },
          {
            id: 2,
            question: `Advanced grammar: How do you express conditional statements in ${selectedLanguage}?`,
            correctAnswer: getConditional(selectedLanguage),
            acceptableAnswers: getConditionalVariants(selectedLanguage),
            explanation: `This was covered in the advanced grammar lesson. Practice with examples!`,
            category: 'Advanced Grammar',
            type: 'typing',
          },
        ],
      };

      const levelQuestions = questionBank[userLevel] || questionBank.beginner;
      setQuestions(levelQuestions);
    };

    generateQuestions();
  }, [selectedLanguage, userLevel]);

  // Helper functions to get correct answers based on language
  function getGreeting(lang) {
    const greetings = {
      spanish: 'Hola',
      french: 'Bonjour',
      german: 'Guten Tag',
      japanese: 'こんにちは',
      korean: '안녕하세요',
      chinese: '你好',
      italian: 'Ciao',
      portuguese: 'Olá',
      russian: 'Привет',
      arabic: 'مرحبا',
      hindi: 'नमस्ते',
      dutch: 'Hallo',
      swedish: 'Hej',
      polish: 'Cześć',
      turkish: 'Merhaba',
      greek: 'Γεια σας',
      hebrew: 'שלום',
      thai: 'สวัสดี',
      vietnamese: 'Xin chào',
      indonesian: 'Halo',
    };
    return greetings[lang] || 'Hello';
  }

  function getGreetingVariants(lang) {
    const variants = {
      spanish: ['hola', 'Hola'],
      french: ['bonjour', 'Bonjour'],
      german: ['guten tag', 'Guten Tag', 'guten Tag'],
      japanese: ['こんにちは', 'konnichiwa', 'Konnichiwa'],
      korean: ['안녕하세요', 'annyeonghaseyo', '안녕'],
      chinese: ['你好', 'ni hao', '您好'],
      italian: ['ciao', 'Ciao'],
      portuguese: ['olá', 'Olá', 'ola', 'Ola'],
      russian: ['привет', 'Привет', 'privet'],
      arabic: ['مرحبا', 'marhaba'],
    };
    return variants[lang] || ['hello', 'Hello'];
  }

  function getThanks(lang) {
    const thanks = {
      spanish: 'Gracias',
      french: 'Merci',
      german: 'Danke',
      japanese: 'ありがとう',
      korean: '감사합니다',
      chinese: '谢谢',
      italian: 'Grazie',
      portuguese: 'Obrigado',
      russian: 'Спасибо',
      arabic: 'شكرا',
    };
    return thanks[lang] || 'Thank you';
  }

  function getThanksVariants(lang) {
    const variants = {
      spanish: ['gracias', 'Gracias'],
      french: ['merci', 'Merci'],
      german: ['danke', 'Danke'],
      japanese: ['ありがとう', 'arigato', 'arigatou'],
      korean: ['감사합니다', 'gamsahamnida', '고맙습니다'],
      chinese: ['谢谢', 'xie xie', 'xiexie'],
    };
    return variants[lang] || ['thank you', 'Thank you'];
  }

  function getGoodbye(lang) {
    const goodbye = {
      spanish: 'Adiós',
      french: 'Au revoir',
      german: 'Auf Wiedersehen',
      italian: 'Ciao',
      japanese: 'さようなら',
      korean: '안녕히 가세요',
      chinese: '再见',
      portuguese: 'Tchau',
    };
    return goodbye[lang] || 'Goodbye';
  }

  function getGoodbyeVariants(lang) {
    const variants = {
      spanish: ['adiós', 'Adiós', 'adios', 'Adios'],
      french: ['au revoir', 'Au revoir'],
      german: ['auf wiedersehen', 'Auf Wiedersehen', 'tschüss', 'Tschüss'],
      italian: ['ciao', 'Ciao', 'arrivederci'],
      japanese: ['さようなら', 'sayonara'],
      korean: ['안녕히 가세요', 'annyeonghi gaseyo', '안녕'],
    };
    return variants[lang] || ['goodbye', 'Goodbye', 'bye'];
  }

  function getWater(lang) {
    const water = {
      spanish: 'Agua',
      french: 'Eau',
      german: 'Wasser',
      italian: 'Acqua',
      portuguese: 'Água',
      japanese: '水',
      korean: '물',
      chinese: '水',
    };
    return water[lang] || 'Water';
  }

  function getWaterVariants(lang) {
    const variants = {
      spanish: ['agua', 'Agua'],
      french: ['eau', 'Eau'],
      german: ['wasser', 'Wasser'],
      italian: ['acqua', 'Acqua'],
      portuguese: ['água', 'Água', 'agua'],
      japanese: ['水', 'mizu'],
      korean: ['물', 'mul'],
      chinese: ['水', 'shui'],
    };
    return variants[lang] || ['water', 'Water'];
  }

  function getHowAreYou(lang) {
    const howAreYou = {
      spanish: '¿Cómo estás?',
      french: 'Comment allez-vous?',
      german: 'Wie geht\'s?',
      italian: 'Come stai?',
      japanese: '元気ですか?',
      korean: '어떻게 지내세요?',
      chinese: '你好吗?',
    };
    return howAreYou[lang] || 'How are you?';
  }

  function getHowAreYouVariants(lang) {
    const variants = {
      spanish: ['¿Cómo estás?', '¿Como estás?', 'Como estas', '¿Qué tal?', 'Que tal'],
      french: ['Comment allez-vous?', 'Comment allez vous?', 'Ça va?', 'Ca va?'],
      german: ['Wie geht\'s?', 'Wie gehts?', 'Wie geht es dir?'],
      italian: ['Come stai?', 'Come sta?'],
    };
    return variants[lang] || ['How are you?', 'how are you'];
  }

  function getYes(lang) {
    const yes = {
      spanish: 'Sí',
      french: 'Oui',
      german: 'Ja',
      italian: 'Sì',
      portuguese: 'Sim',
      japanese: 'はい',
      korean: '네',
      chinese: '是',
    };
    return yes[lang] || 'Yes';
  }

  function getYesVariants(lang) {
    const variants = {
      spanish: ['sí', 'Sí', 'si', 'Si'],
      french: ['oui', 'Oui'],
      german: ['ja', 'Ja'],
      italian: ['sì', 'Sì', 'si', 'Si'],
      portuguese: ['sim', 'Sim'],
      japanese: ['はい', 'hai'],
      korean: ['네', 'ne', '예'],
    };
    return variants[lang] || ['yes', 'Yes'];
  }

  function getNo(lang) {
    const no = {
      spanish: 'No',
      french: 'Non',
      german: 'Nein',
      italian: 'No',
      portuguese: 'Não',
      japanese: 'いいえ',
      korean: '아니요',
      chinese: '不',
    };
    return no[lang] || 'No';
  }

  function getNoVariants(lang) {
    const variants = {
      spanish: ['no', 'No'],
      french: ['non', 'Non'],
      german: ['nein', 'Nein'],
      italian: ['no', 'No'],
      portuguese: ['não', 'Não', 'nao', 'Nao'],
      japanese: ['いいえ', 'iie'],
      korean: ['아니요', 'aniyo', '아니'],
    };
    return variants[lang] || ['no', 'No'];
  }

  function getLove(lang) {
    const love = {
      spanish: 'Amor',
      french: 'Amour',
      german: 'Liebe',
      italian: 'Amore',
      portuguese: 'Amor',
      japanese: '愛',
      korean: '사랑',
      chinese: '爱',
    };
    return love[lang] || 'Love';
  }

  function getLoveVariants(lang) {
    const variants = {
      spanish: ['amor', 'Amor'],
      french: ['amour', 'Amour'],
      german: ['liebe', 'Liebe'],
      italian: ['amore', 'Amore'],
      portuguese: ['amor', 'Amor'],
      japanese: ['愛', 'ai'],
      korean: ['사랑', 'sarang'],
      chinese: ['爱', 'ai', '愛'],
    };
    return variants[lang] || ['love', 'Love'];
  }

  function getWouldLike(lang) {
    const wouldLike = {
      spanish: 'Me gustaría',
      french: 'Je voudrais',
      german: 'Ich möchte',
      italian: 'Vorrei',
    };
    return wouldLike[lang] || 'I would like';
  }

  function getWouldLikeVariants(lang) {
    const variants = {
      spanish: ['me gustaría', 'Me gustaría', 'me gustaria', 'Me gustaria'],
      french: ['je voudrais', 'Je voudrais'],
      german: ['ich möchte', 'Ich möchte', 'ich mochte'],
      italian: ['vorrei', 'Vorrei'],
    };
    return variants[lang] || ['I would like', 'i would like'];
  }

  function getPlease(lang) {
    const please = {
      spanish: 'Por favor',
      french: 'S\'il vous plaît',
      german: 'Bitte',
      italian: 'Per favore',
      portuguese: 'Por favor',
    };
    return please[lang] || 'Please';
  }

  function getPleaseVariants(lang) {
    const variants = {
      spanish: ['por favor', 'Por favor'],
      french: ['s\'il vous plaît', 'S\'il vous plaît', 'sil vous plait'],
      german: ['bitte', 'Bitte'],
      italian: ['per favore', 'Per favore'],
      portuguese: ['por favor', 'Por favor'],
    };
    return variants[lang] || ['please', 'Please'];
  }

  function getConditional(lang) {
    const conditional = {
      spanish: 'Si + subjuntivo',
      french: 'Si + conditionnel',
      german: 'Wenn + Konjunktiv',
    };
    return conditional[lang] || 'If + conditional';
  }

  function getConditionalVariants(lang) {
    const variants = {
      spanish: ['Si + subjuntivo', 'si + subjuntivo', 'Si subjuntivo'],
      french: ['Si + conditionnel', 'si + conditionnel'],
      german: ['Wenn + Konjunktiv', 'wenn + konjunktiv'],
    };
    return variants[lang] || ['If + conditional', 'if + conditional'];
  }

  function getExcuseMe(lang) {
    const excuseMe = {
      spanish: 'Perdón',
      french: 'Excusez-moi',
      german: 'Entschuldigung',
      italian: 'Scusi',
      portuguese: 'Com licença',
    };
    return excuseMe[lang] || 'Excuse me';
  }

  function getExcuseMeVariants(lang) {
    const variants = {
      spanish: ['perdón', 'Perdón', 'disculpe', 'Disculpe'],
      french: ['excusez-moi', 'Excusez-moi', 'pardon', 'Pardon'],
      german: ['entschuldigung', 'Entschuldigung'],
      italian: ['scusi', 'Scusi', 'scusa'],
      portuguese: ['com licença', 'Com licença', 'com licenca'],
    };
    return variants[lang] || ['excuse me', 'Excuse me'];
  }

  // Multiple choice option generators
  function getThanksOptions(lang) {
    const options = {
      spanish: ['Gracias', 'Por favor', 'De nada', 'Perdón'],
      french: ['Merci', 'S\'il vous plaît', 'De rien', 'Pardon'],
      german: ['Danke', 'Bitte', 'Gern geschehen', 'Entschuldigung'],
      italian: ['Grazie', 'Per favore', 'Prego', 'Scusi'],
      japanese: ['ありがとう', 'すみません', 'どういたしまして', 'こんにちは'],
    };
    return options[lang] || ['Thank you', 'Please', 'You\'re welcome', 'Sorry'];
  }

  function getWaterOptions(lang) {
    const options = {
      spanish: ['Agua', 'Leche', 'Café', 'Jugo'],
      french: ['Eau', 'Lait', 'Café', 'Jus'],
      german: ['Wasser', 'Milch', 'Kaffee', 'Saft'],
      italian: ['Acqua', 'Latte', 'Caffè', 'Succo'],
      japanese: ['水', '牛乳', 'コーヒー', 'ジュース'],
    };
    return options[lang] || ['Water', 'Milk', 'Coffee', 'Juice'];
  }

  function getYesOptions(lang) {
    const options = {
      spanish: ['Sí', 'No', 'Tal vez', 'Nunca'],
      french: ['Oui', 'Non', 'Peut-être', 'Jamais'],
      german: ['Ja', 'Nein', 'Vielleicht', 'Niemals'],
      italian: ['Sì', 'No', 'Forse', 'Mai'],
      japanese: ['はい', 'いいえ', 'たぶん', '決して'],
    };
    return options[lang] || ['Yes', 'No', 'Maybe', 'Never'];
  }

  function getLoveOptions(lang) {
    const options = {
      spanish: ['Amor', 'Amistad', 'Felicidad', 'Familia'],
      french: ['Amour', 'Amitié', 'Bonheur', 'Famille'],
      german: ['Liebe', 'Freundschaft', 'Glück', 'Familie'],
      italian: ['Amore', 'Amicizia', 'Felicità', 'Famiglia'],
      japanese: ['愛', '友情', '幸せ', '家族'],
    };
    return options[lang] || ['Love', 'Friendship', 'Happiness', 'Family'];
  }

  function getPleaseOptions(lang) {
    const options = {
      spanish: ['Por favor', 'Gracias', 'De nada', 'Perdón'],
      french: ['S\'il vous plaît', 'Merci', 'De rien', 'Pardon'],
      german: ['Bitte', 'Danke', 'Gern geschehen', 'Entschuldigung'],
      italian: ['Per favore', 'Grazie', 'Prego', 'Scusi'],
    };
    return options[lang] || ['Please', 'Thank you', 'You\'re welcome', 'Sorry'];
  }

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTotalQuestions(questions.length);
    setShowResult(false);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setShowFeedback(false);
    setReviewMode(false);
    setIncorrectQuestions([]);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleTypedAnswerChange = (e) => {
    setTypedAnswer(e.target.value);
  };

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/[¿?¡!]/g, '');
  };

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    
    if (question.type === 'typing') {
      const normalized = normalizeAnswer(typedAnswer);
      const correctNormalized = normalizeAnswer(question.correctAnswer);
      const acceptableNormalized = question.acceptableAnswers.map(a => normalizeAnswer(a));
      
      return normalized === correctNormalized || acceptableNormalized.includes(normalized);
    } else {
      return selectedAnswer === question.correctAnswer;
    }
  };

  const handleSubmitAnswer = () => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    } else {
      // Track incorrect questions for review
      setIncorrectQuestions([...incorrectQuestions, questions[currentQuestion]]);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setShowFeedback(false);
    } else {
      if (incorrectQuestions.length > 0 && !reviewMode) {
        // Enter review mode for incorrect questions
        setReviewMode(true);
        setQuestions(incorrectQuestions);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setTypedAnswer('');
        setShowFeedback(false);
        setIncorrectQuestions([]);
      } else {
        setShowResult(true);
        // Update progress - use totalQuestions for accurate calculation
        const passed = score >= totalQuestions * 0.7;
        if (passed) {
          updateProgress('quizzesPassed', 25);
        }
      }
    }
  };

  if (!quizStarted) {
    return (
      <div className="quiz-start">
        <h2>✏️ Practice What You Learned</h2>
        <div className="quiz-info">
          <p>📝 {questions.length} questions about your recent lessons</p>
          <p>🔄 Repetition-based learning</p>
          <p>📚 Wrong answers will be reviewed again</p>
          <p>🎯 Pass: 70%</p>
        </div>
        <button className="start-quiz-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="quiz-result">
        <h2>{passed ? '🎉 Great Job!' : '📚 Keep Practicing!'}</h2>
        {reviewMode && <p className="review-note">You just reviewed your incorrect answers!</p>}
        <div className="result-stats">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}/{totalQuestions}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Percentage</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>
        {!passed && (
          <p className="encouragement">
            Remember: Repetition is key! Try the quiz again to reinforce what you've learned.
          </p>
        )}
        <button className="retry-btn" onClick={startQuiz}>
          Practice Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      {reviewMode && (
        <div className="review-banner">
          🔄 Review Mode: Practice the questions you got wrong
        </div>
      )}
      
      <div className="quiz-progress">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        {question.category && <span className="category-badge">{question.category}</span>}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="question-card">
        <h3>{question.question}</h3>
        
        {question.type === 'typing' ? (
          <div className="typing-answer">
            <input
              type="text"
              className={`answer-input ${showFeedback ? (isCorrect ? 'correct-input' : 'incorrect-input') : ''}`}
              value={typedAnswer}
              onChange={handleTypedAnswerChange}
              placeholder={`Type your answer in ${selectedLanguage}...`}
              disabled={showFeedback}
              autoFocus
            />
            {showFeedback && (
              <div className="correct-answer-display">
                <p className="correct-label">Correct answer:</p>
                <p className="correct-answer">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedAnswer === index ? 'selected' : ''} ${
                  showFeedback
                    ? index === question.correctAnswer
                      ? 'correct'
                      : selectedAnswer === index
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showFeedback && index === question.correctAnswer && <span className="checkmark">✓</span>}
                {showFeedback && selectedAnswer === index && index !== question.correctAnswer && <span className="xmark">✗</span>}
              </button>
            ))}
          </div>
        )}

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
            <p className="feedback-title">
              {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
            </p>
            <p className="feedback-text">{question.explanation}</p>
          </div>
        )}

        {!showFeedback ? (
          <button
            className="next-btn"
            onClick={handleSubmitAnswer}
            disabled={question.type === 'typing' ? !typedAnswer.trim() : selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className={`next-btn ${isCorrect ? 'next-btn-correct' : ''}`} onClick={handleNext}>
            {currentQuestion + 1 === questions.length ? (reviewMode ? 'Finish Review' : 'Review Mistakes') : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
