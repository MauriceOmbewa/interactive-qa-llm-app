import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function QABox() {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

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

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
        {conversations.length > 0 && (
          <button 
            onClick={clearChat}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {conversations.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-xl font-medium mb-2">Welcome to AI Assistant</h2>
            <p>Ask me anything and I'll help you with detailed, structured responses.</p>
          </div>
        )}
        
        {conversations.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-lg px-4 py-3 ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white ml-12' 
                : msg.type === 'error'
                ? 'bg-red-100 text-red-800 mr-12 border border-red-200'
                : 'bg-white text-gray-800 mr-12 shadow-sm border'
            }`}>
              {msg.type === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 mr-12 shadow-sm border rounded-lg px-4 py-3 max-w-3xl">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-gray-500 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t px-6 py-4">
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={submitQuestion} className="flex space-x-3">
          <div className="flex-1">
            <textarea 
              value={question} 
              onChange={(e)=>setQuestion(e.target.value)}
              placeholder="Type your question here..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
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
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>{loading ? "Sending..." : "Send"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}