const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// Generate Interview Question
async function generateInterviewQuestion(jobRole) {

    // MOCK MODE
    // MOCK MODE
if (process.env.USE_MOCK_AI === "true") {

    const questions = [

        `What is your experience with ${jobRole}, and explain one project you have built using this technology?`,

        `What is the difference between frontend and backend development in a ${jobRole} application?`,

        `How would you design and implement a REST API for a ${jobRole} project?`,

        `How do you handle authentication and authorization in a ${jobRole} application?`,

        `What challenges have you faced while building a full-stack application, and how did you solve them?`

    ];

    const randomIndex =
        Math.floor(Math.random() * questions.length);

    return questions[randomIndex];
}


    // REAL GEMINI
    const prompt = `
You are an expert technical interviewer.

Generate one interview question for a candidate applying for:

${jobRole}

Give only the interview question.
`;

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    return interaction.output_text;
}



// Evaluate Interview Answer
async function evaluateInterviewAnswer(
    jobRole,
    question,
    answer
) {

    // MOCK MODE
    if (process.env.USE_MOCK_AI === "true") {

        const answerLength = answer.length;

        let score = 5;

        if (answerLength > 100) {
            score = 7;
        }

        if (answerLength > 250) {
            score = 8;
        }


        return {

            score: score,

            strengths: [
                "You provided a relevant answer.",
                "You demonstrated understanding of the topic.",
                "You explained your technical approach clearly."
            ],

            weaknesses: [
                "The answer could include more technical details.",
                "A practical project example would make the answer stronger."
            ],

            suggestions:
                "Structure your answer clearly and include a real project example. Explain the technical decisions you made and why you chose that approach."
        };
    }


    // REAL GEMINI
    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Job Role:
${jobRole}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate ONLY the candidate answer.

Return ONLY valid JSON.

Use exactly this format:

{
    "score": 0,
    "strengths": [
        "strength 1",
        "strength 2"
    ],
    "weaknesses": [
        "weakness 1",
        "weakness 2"
    ],
    "suggestions": "practical improvement suggestions"
}

Rules:

- score must be between 0 and 10
- Give 2 to 3 strengths
- Give 2 to 3 weaknesses
- Give practical suggestions
`;

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    const text = interaction.output_text;

    const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedText);
}



module.exports = {
    generateInterviewQuestion,
    evaluateInterviewAnswer
};