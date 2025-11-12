import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const AITutor = ({ userInput, onResponse }) => {
  const { selectedLanguage } = useLanguage();
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Initial greeting
  useEffect(() => {
    const greeting = {
      id: 1,
      role: 'ai',
      text: `Hello! I'm your ${selectedLanguage} tutor. I can help you with:\n• Grammar explanations\n• Pronunciation tips\n• Common phrases and idioms\n• Cultural insights\n\nWhat would you like to learn today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setConversation([greeting]);
  }, [selectedLanguage]);

  // Simulate AI API call
  const getAIResponse = async (userMessage) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock AI responses based on keywords
    let response = `That's a great question about ${selectedLanguage}! `;
    
    if (userMessage.toLowerCase().includes('how') || userMessage.toLowerCase().includes('say')) {
      response += `In ${selectedLanguage}, native speakers often use specific expressions. The formal way differs from casual conversation. Would you like me to explain both?`;
    } else if (userMessage.toLowerCase().includes('grammar')) {
      response += `${selectedLanguage} grammar has unique rules. Let me break it down for you with examples you can practice right away.`;
    } else if (userMessage.toLowerCase().includes('pronunciation')) {
      response += `Pronunciation in ${selectedLanguage} can be tricky! Focus on these sounds first, and practice with the audio lessons in the Music section.`;
    } else {
      response += `This is important for mastering ${selectedLanguage}. Many learners struggle with this at first, but with practice, you'll get it!`;
    }

    setLoading(false);
    return response;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: conversation.length + 1,
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation([...conversation, userMessage]);
    setInput('');

    const aiResponseText = await getAIResponse(input);
    
    const aiMessage = {
      id: conversation.length + 2,
      role: 'ai',
      text: aiResponseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation(prev => [...prev, aiMessage]);
  };

  const quickQuestions = [
    'How do I pronounce this correctly?',
    'What are common greetings?',
    'Explain past tense grammar',
    'Cultural etiquette tips',
  ];

  return (
    <div className="ai-tutor">
      <h2>🤖 AI Language Tutor</h2>
      <p className="tutor-subtitle">Ask me anything about {selectedLanguage}!</p>

      <div className="tutor-container">
        <div className="conversation">
          {conversation.map(message => (
            <div key={message.id} className={`tutor-message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'ai' ? '🤖' : '😊'}
              </div>
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="tutor-message ai">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble loading-bubble">
                <span className="typing-indicator">●●●</span>
              </div>
            </div>
          )}
        </div>

        <div className="quick-questions">
          <p>Quick questions:</p>
          <div className="question-chips">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="question-chip"
                onClick={() => setInput(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="tutor-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask your tutor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutor;
