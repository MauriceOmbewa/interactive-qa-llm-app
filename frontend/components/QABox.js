import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function QABox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitQuestion(e) {
    e.preventDefault();
    if (!question.trim()) { setError("Please type a question"); return; }
    setLoading(true); setError(""); setAnswer("");
    try {
      const res = await fetch("http://localhost:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submitQuestion} className="max-w-2xl mx-auto p-4">
      <textarea 
        value={question} 
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask anything..." 
        className="w-full p-3 border rounded" 
        rows={4}
        disabled={loading}
      />
      <button 
        disabled={loading} 
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {answer && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      )}
    </form>
  );
}