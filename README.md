# Interactive Q&A LLM App

A modern, full-stack web application that provides interactive Q&A functionality using Large Language Models. Features a sleek chat interface with real-time responses, markdown rendering, and structured prompt engineering for consistent, high-quality answers.

## 🚀 Features

- **Interactive Chat Interface**: Modern, responsive chat UI with typing indicators and message history
- **Real-time LLM Integration**: Powered by Google Gemini API for intelligent responses
- **Markdown Support**: Rich text rendering with syntax highlighting and formatting
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Structured Responses**: Consistent answer formatting using prompt engineering
- **Cross-platform**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.8+**: Core backend language
- **Google Gemini API**: LLM provider for intelligent responses
- **httpx**: Async HTTP client for API calls
- **Pydantic**: Data validation and serialization
- **python-dotenv**: Environment variable management

### Frontend
- **Next.js**: React framework with server-side rendering
- **React**: Component-based UI library
- **Tailwind CSS**: Utility-first CSS framework
- **react-markdown**: Markdown rendering with GitHub Flavored Markdown
- **remark-gfm**: GitHub Flavored Markdown plugin

## 📁 Project Structure

```
interactive-qa-llm-app/
├── backend/                    # FastAPI backend application
│   ├── app/
│   │   ├── services/
│   │   │   └── llm_client.py  # LLM integration and API calls
│   │   ├── utils/
│   │   │   └── prompt.py      # Prompt engineering and templates
│   │   ├── main.py            # FastAPI app initialization and CORS
│   │   ├── routers.py         # API route definitions
│   │   └── schemas.py         # Pydantic models for request/response
│   ├── .env                   # Environment variables (create from .env.example)
│   └── requirements.txt       # Python dependencies
├── frontend/                   # Next.js frontend application
│   ├── components/
│   │   └── QABox.js          # Main chat interface component
│   ├── pages/
│   │   └── index.js          # Home page with chat interface
│   ├── styles/
│   │   └── globals.css       # Global styles and Tailwind imports
│   ├── package.json          # Node.js dependencies and scripts
│   └── next.config.js        # Next.js configuration
├── .env.example               # Environment variables template
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

### Key Files Explained

- **`backend/app/main.py`**: FastAPI application entry point with CORS middleware
- **`backend/app/routers.py`**: Defines the `/api/ask` endpoint for Q&A functionality
- **`backend/app/services/llm_client.py`**: Handles communication with Google Gemini API
- **`backend/app/utils/prompt.py`**: Contains prompt templates for structured responses
- **`frontend/components/QABox.js`**: React component with chat interface and state management
- **`frontend/pages/index.js`**: Next.js page that renders the chat interface

## 🚀 Quick Start Guide

### Prerequisites

- **Python 3.8+** (check with `python3 --version`)
- **Node.js 16+** (check with `node --version`)
- **npm or yarn** (check with `npm --version`)
- **Git** (for cloning the repository)
- **Google Gemini API key** (free from Google AI Studio)

### Step 1: Clone and Navigate

```bash
# Clone the repository
git clone https://github.com/MauriceOmbewa/interactive-qa-llm-app.git
cd interactive-qa-llm-app
```

### Step 2: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key" or "Create API key"
4. Copy the generated API key (starts with `AIza...`)

### Step 3: Set Up Environment Variables

```bash
# Create environment file for backend
cp .env.example backend/.env

# Edit the backend/.env file and replace 'your_api_key_here' with your actual API key
# The file should look like:
# LLM_PROVIDER=gemini
# GEMINI_API_KEY=AIzaSyBC76PJDeo3K1Se4_LyeqVn6AQNllkDxxQ...
# BACKEND_PORT=8000
# FRONTEND_ORIGIN=http://localhost:3000
```

### Step 4: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

✅ Backend should now be running at http://localhost:8000

### Step 5: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should now be running at http://localhost:3000

### Step 6: Test the Application

1. **Open your browser** and go to http://localhost:3000
2. **Type a question** in the chat interface (e.g., "What is artificial intelligence?")
3. **Press Enter** or click "Send Message"
4. **Watch the AI respond** with a structured, markdown-formatted answer

### Available URLs

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Interactive Swagger UI)
- **API Health Check**: http://localhost:8000/api/ask (POST endpoint)

### Quick Scripts

Create these helper scripts for easier development:

**`start-backend.sh`**:
```bash
#!/bin/bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**`start-frontend.sh`**:
```bash
#!/bin/bash
cd frontend
npm run dev
```

## ⚙️ Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `backend/.env` and configure:

```env
# LLM Configuration
LLM_PROVIDER=gemini                    # Currently supports 'gemini'
GEMINI_API_KEY=your_api_key_here       # Your Google Gemini API key
GOOGLE_API_KEY=your_api_key_here       # Alternative key name (same value)

# Server Configuration
BACKEND_PORT=8000                      # Backend server port
FRONTEND_ORIGIN=http://localhost:3000  # Frontend URL for CORS
```

### Getting Your API Key

1. **Visit Google AI Studio**: https://aistudio.google.com/
2. **Sign in** with your Google account
3. **Create API Key**: Look for "Get API key" button
4. **Copy the key**: It should start with `AIza` and be about 39 characters long
5. **Paste into .env**: Replace `your_api_key_here` with your actual key

⚠️ **Security Note**: Never commit your `.env` file to version control. The `.gitignore` file already excludes it.

## 📡 API Reference

### POST /api/ask

The main endpoint for asking questions to the AI assistant.

**Request:**
```bash
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is machine learning?"}'
```

**Request Body:**
```json
{
  "question": "What is machine learning?"
}
```

**Response:**
```json
{
  "question": "What is machine learning?",
  "answer": "# Summary\n\nMachine learning is a subset of artificial intelligence...",
  "raw": {
    "candidates": [...],
    "usageMetadata": {...}
  }
}
```

**Response Fields:**
- `question`: The original question asked
- `answer`: Formatted markdown response from the AI
- `raw`: Complete response object from the Gemini API

**Error Responses:**
```json
{
  "detail": "API key not found. Please set GEMINI_API_KEY in your .env file"
}
```

## 🎯 Prompt Engineering

The system uses carefully crafted prompts to ensure consistent, high-quality responses. The prompt template is defined in `backend/app/utils/prompt.py`:

```python
def build_prompt(question: str) -> str:
    return f"""You are an expert assistant specializing in providing information on international travel documentation requirements, including passports, visas, and other necessary paperwork for visiting various countries. I cannot assist with questions unrelated to travel documents.

When given a travel-related question, respond in Markdown with headings in this exact order:
1. Summary (1-2 sentences)
2. Required Documents (bulleted list)
3. Passport Requirements (bulleted list)
4. Additional Documents (bulleted list)
5. Travel Advisories / Notes (short)

Keep answers practical and concise. If you are unsure, say so and give resources.

User question: {question}"""
```

**Prompt Features:**
- **Structured Output**: Ensures consistent response formatting
- **Domain Expertise**: Focuses on travel documentation
- **Markdown Formatting**: Enables rich text rendering in the frontend
- **Error Handling**: Gracefully handles off-topic questions

## ✨ Features

### Frontend Features
- ✅ **Modern Chat Interface**: Clean, intuitive chat UI with message bubbles
- ✅ **Real-time Responses**: Instant communication with typing indicators
- ✅ **Markdown Rendering**: Rich text formatting with syntax highlighting
- ✅ **Responsive Design**: Works perfectly on desktop and mobile
- ✅ **Message History**: Persistent conversation within session
- ✅ **Loading States**: Visual feedback during API calls
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

### Backend Features
- ✅ **FastAPI Framework**: High-performance, modern API
- ✅ **Async Processing**: Non-blocking request handling
- ✅ **CORS Support**: Cross-origin requests enabled
- ✅ **Input Validation**: Pydantic models for data validation
- ✅ **Error Handling**: Comprehensive error catching and reporting
- ✅ **API Documentation**: Auto-generated Swagger/OpenAPI docs
- ✅ **Environment Configuration**: Secure credential management

### AI Features
- ✅ **Google Gemini Integration**: Latest LLM technology
- ✅ **Structured Prompts**: Consistent response formatting
- ✅ **Token Optimization**: Efficient API usage (700 token limit)
- ✅ **Provider Abstraction**: Easy to switch LLM providers

## 🧪 Testing

### Manual Testing

**Test the backend API directly:**
```bash
# Basic question
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What documents do I need to travel from Kenya to Ireland?"}'

# Test error handling
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":""}'
```

**Test the frontend:**
1. Open http://localhost:3000
2. Try these sample questions:
   - "What documents do I need to travel from Kenya to Ireland?"
   - "What are the passport requirements for US citizens visiting Japan?"
   - "Tell me about visa requirements for Germany"

### Health Checks

**Backend Health:**
- Visit http://localhost:8000/docs for API documentation
- Check server logs for any errors

**Frontend Health:**
- Check browser console for JavaScript errors
- Verify API calls in Network tab

### Common Issues

**"API key not found" error:**
- Ensure `.env` file exists in `backend/` directory
- Verify `GEMINI_API_KEY` is set correctly
- Restart the backend server after changing `.env`

**CORS errors:**
- Ensure backend is running on port 8000
- Check `FRONTEND_ORIGIN` in `.env` matches frontend URL

**Connection refused:**
- Verify both backend (8000) and frontend (3000) are running
- Check firewall settings

## ⚠️ Important Notes

### API Limits
- **Gemini API Rate Limits**: Free tier has request limits (15 requests per minute)
- **Token Limits**: Responses limited to 700 tokens for optimal performance
- **Timeout**: API requests timeout after 30 seconds

### Security
- **API Keys**: Never commit `.env` files to version control
- **CORS**: Configured for localhost development only
- **Input Validation**: All inputs are validated before processing

### Architecture
- **Adapter Pattern**: `llm_client.py` makes it easy to switch LLM providers
- **Async Design**: Backend uses async/await for better performance
- **Component Architecture**: Frontend uses reusable React components

### Development Tips
- **Hot Reload**: Both frontend and backend support hot reloading
- **Debugging**: Check browser console and terminal logs for errors
- **API Testing**: Use the Swagger UI at http://localhost:8000/docs

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set build settings:
     - Framework: Next.js
     - Root Directory: `frontend`
     - Build Command: `npm run build`

3. **Update API URL**: Change the API URL in `frontend/components/QABox.js` from `localhost:8000` to your backend URL

### Backend Deployment (Render/Railway)

1. **Render Deployment**:
   - Connect your GitHub repository
   - Set build settings:
     - Environment: Python
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
     - Root Directory: `backend`

2. **Environment Variables**:
   ```
   LLM_PROVIDER=gemini
   GEMINI_API_KEY=your_production_api_key
   FRONTEND_ORIGIN=https://your-frontend-url.vercel.app
   ```

3. **Railway Deployment**:
   - Install Railway CLI: `npm install -g @railway/cli`
   - Login: `railway login`
   - Deploy: `railway up`

### Production Checklist

- [ ] Update CORS origins for production URLs
- [ ] Set production environment variables
- [ ] Test API endpoints with production URLs
- [ ] Monitor API usage and rate limits
- [ ] Set up error monitoring (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Common Issues](#common-issues) section
2. Review the server logs for error messages
3. Ensure your API key is valid and has sufficient quota
4. Open an issue on GitHub with detailed error information

---

**Happy coding! 🎉**