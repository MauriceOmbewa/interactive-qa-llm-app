import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function QABox() {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const hasConversations = conversations.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  async function submitQuestion(e) {
    e.preventDefault();
    if (!question.trim()) { setError("Please type a question"); return; }
    
    const userMessage = { type: "user", content: question, timestamp: Date.now() };
    setConversations(prev => [...prev, userMessage]);
    setLoading(true); setError(""); 
    const currentQuestion = question;
    setQuestion("");
    
    try {
      const res = await fetch("http://localhost:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      
      const aiMessage = { type: "ai", content: data.answer, timestamp: Date.now() };
      setConversations(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = { type: "error", content: err.message, timestamp: Date.now() };
      setConversations(prev => [...prev, errorMessage]);
    } finally { setLoading(false); }
  }

  const clearChat = () => {
    setConversations([]);
    setError("");
  };

  // Empty state - centered input
  if (!hasConversations && !loading) {
    return (
      <div className="h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="bg-black border-b border-gray-800 px-6 py-4">
          <h1 className="text-xl font-semibold" style={{color: '#d7ec32'}}>AI Assistant</h1>
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-2xl font-medium mb-3 text-white">Welcome to AI Assistant</h2>
              <p className="text-gray-400 text-lg">Ask me anything and I'll help you with detailed, structured responses.</p>
            </div>

            {/* Input Form */}
            {error && (
              <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={submitQuestion} className="space-y-4">
              <div className="relative">
                <textarea 
                  value={question} 
                  onChange={(e)=>setQuestion(e.target.value)}
                  placeholder="Type your question here..." 
                  className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:border-transparent resize-none text-white placeholder-gray-400" 
                  style={{focusRingColor: '#d7ec32'}}
                  rows={4}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submitQuestion(e);
                    }
                  }}
                />
              </div>
              <div className="flex justify-center">
                <button 
                  type="submit"
                  disabled={loading || !question.trim()} 
                  className="px-8 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#d7ec32',
                    color: 'black'
                  }}
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-center text-xs text-gray-500 mt-3">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    );
  }

  // Chat state - messages with bottom input
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold" style={{color: '#d7ec32'}}>AI Assistant</h1>
        <button 
          onClick={clearChat}
          className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {conversations.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-2xl px-5 py-4 ${
              msg.type === 'user' 
                ? 'ml-12' 
                : msg.type === 'error'
                ? 'bg-red-900 text-red-200 mr-12 border border-red-700'
                : 'bg-gray-900 text-white mr-12 border border-gray-700'
            }`} style={{
              backgroundColor: msg.type === 'user' ? '#d7ec32' : undefined,
              color: msg.type === 'user' ? 'black' : undefined
            }}>
              {msg.type === 'user' ? (
                <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 text-white mr-12 border border-gray-700 rounded-2xl px-5 py-4 max-w-3xl">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#d7ec32'}}></div>
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#d7ec32', animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{backgroundColor: '#d7ec32', animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-gray-400 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black border-t border-gray-800 px-6 py-4">
        {error && (
          <div className="mb-3 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={submitQuestion} className="flex space-x-3">
          <div className="flex-1">
            <textarea 
              value={question} 
              onChange={(e)=>setQuestion(e.target.value)}
              placeholder="Type your question here..." 
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:border-transparent resize-none text-white placeholder-gray-400" 
              style={{focusRingColor: '#d7ec32'}}
              rows={2}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitQuestion(e);
                }
              }}
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !question.trim()} 
            className="px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#d7ec32',
              color: 'black'
            }}
          >
            <span>{loading ? "Sending..." : "Send"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}