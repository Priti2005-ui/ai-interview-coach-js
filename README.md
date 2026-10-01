# 🤖 AI Interview Coach

AI Interview Coach is a web-based interview practice application that helps candidates prepare for technical interviews by generating interview questions and evaluating their answers.

The application provides an interview-style experience where users can enter a job role, receive an interview question, submit their answer, and get an AI-based evaluation with a score, strengths, weaknesses, and improvement suggestions.

## 🚀 Features

* Generate interview questions based on the selected job role
* Submit interview answers
* Evaluate answers using AI
* Get a score out of 10
* View answer strengths
* Identify weaknesses
* Receive practical improvement suggestions
* Generate the next interview question
* Mock AI mode for development and testing
* REST API built with Express.js
* Environment variable support for API keys

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### AI

* Google Gemini API
* `@google/genai`

## 📁 Project Structure

```text
ai-interview-coach-js/
│
├── backend/
│   ├── server.js
│   └── services/
│       └── geminiService.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Priti2005-ui/ai-interview-coach-js.git
```

### 2. Navigate to the project

```bash
cd ai-interview-coach-js
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
PORT=5000
USE_MOCK_AI=true
```

> Keep your API key private. Never upload the `.env` file to GitHub.

## ▶️ Run the Application

Start the backend server:

```bash
node backend/server.js
```

The backend will run on:

```text
http://localhost:5000
```

Then open the frontend:

```text
frontend/index.html
```

in your browser.

## 🔌 API Endpoints

### Generate Interview Question

```text
POST /api/interview/question
```

Request:

```json
{
  "jobRole": "MERN Stack Developer"
}
```

Response:

```json
{
  "success": true,
  "jobRole": "MERN Stack Developer",
  "question": "Interview question..."
}
```

### Evaluate Interview Answer

```text
POST /api/interview/evaluate
```

Request:

```json
{
  "jobRole": "MERN Stack Developer",
  "question": "Interview question...",
  "answer": "Candidate answer..."
}
```

Response contains:

* Score
* Strengths
* Weaknesses
* Suggestions

## 🤖 AI / Mock Mode

The application supports two modes.

### Mock AI Mode

For development and testing:

```env
USE_MOCK_AI=true
```

This mode does not require Gemini API requests.

### Gemini AI Mode

To use the Gemini API:

```env
USE_MOCK_AI=false
```

and provide a valid Gemini API key:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

## 🎯 Use Case

This project is designed for students, freshers, and developers who want to practice technical interviews and improve their answers through structured feedback.

## 🔮 Future Improvements

* User authentication
* Interview history
* Multiple interview categories
* Difficulty levels
* Dynamic question generation
* Voice-based interview practice
* Resume-based interview questions
* Interview performance dashboard
* Deployment with a production backend and frontend

## 👩‍💻 Author

**Priti Raut**

Full Stack Developer | MERN Stack

GitHub: https://github.com/Priti2005-ui
