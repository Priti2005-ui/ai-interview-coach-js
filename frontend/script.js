const jobRoleInput = document.getElementById("jobRole");
const generateBtn = document.getElementById("generateBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const question = document.getElementById("question");

const answerSection = document.getElementById("answerSection");
const answerInput = document.getElementById("answer");
const evaluateBtn = document.getElementById("evaluateBtn");

const evaluation = document.getElementById("evaluation");

const score = document.getElementById("score");
const strengths = document.getElementById("strengths");
const weaknesses = document.getElementById("weaknesses");
const suggestions = document.getElementById("suggestions");

const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const questionCounter = document.getElementById("questionCounter");

// ================================
// Check HTML Elements
// ================================

console.log("jobRoleInput:", jobRoleInput);
console.log("generateBtn:", generateBtn);
console.log("loading:", loading);
console.log("result:", result);
console.log("question:", question);
console.log("answerSection:", answerSection);
console.log("answerInput:", answerInput);
console.log("evaluateBtn:", evaluateBtn);
console.log("evaluation:", evaluation);
console.log("nextQuestionBtn:", nextQuestionBtn);


// ================================
// Generate Interview Question
// ================================

generateBtn.addEventListener("click", async () => {

    const jobRole = jobRoleInput.value.trim();

    if (!jobRole) {
        alert("Please enter a job role");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    loading.classList.remove("hidden");

    result.classList.add("hidden");
    answerSection.classList.add("hidden");
    evaluation.classList.add("hidden");

    try {

        const response = await fetch(
            "http://localhost:5000/api/interview/question",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    jobRole: jobRole
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to generate question"
            );

        }

        question.textContent = data.question;

        result.classList.remove("hidden");

        answerSection.classList.remove("hidden");

        answerInput.value = "";

    } catch (error) {

        console.error(
            "Generate Question Error:",
            error
        );

        alert(error.message);

    } finally {

        loading.classList.add("hidden");

        generateBtn.disabled = false;

        generateBtn.textContent =
            "Generate Question";

    }

});


// ================================
// Evaluate Interview Answer
// ================================

evaluateBtn.addEventListener("click", async () => {

    const jobRole =
        jobRoleInput.value.trim();

    const interviewQuestion =
        question.textContent;

    const answer =
        answerInput.value.trim();


    if (!answer) {

        alert(
            "Please write your answer first"
        );

        return;
    }


    evaluateBtn.disabled = true;

    evaluateBtn.textContent =
        "Evaluating...";


    try {

        const response = await fetch(
            "http://localhost:5000/api/interview/evaluate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    jobRole: jobRole,

                    question:
                        interviewQuestion,

                    answer: answer

                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Evaluation failed"
            );

        }


        // ================================
        // Score
        // ================================

        score.textContent =
            data.evaluation.score;


        // ================================
        // Strengths
        // ================================

        strengths.innerHTML = "";

        data.evaluation.strengths.forEach(
            (item) => {

                const li =
                    document.createElement("li");

                li.textContent = item;

                strengths.appendChild(li);

            }
        );


        // ================================
        // Weaknesses
        // ================================

        weaknesses.innerHTML = "";

        data.evaluation.weaknesses.forEach(
            (item) => {

                const li =
                    document.createElement("li");

                li.textContent = item;

                weaknesses.appendChild(li);

            }
        );


        // ================================
        // Suggestions
        // ================================

        suggestions.textContent =
            data.evaluation.suggestions;


        // Show evaluation
        evaluation.classList.remove(
            "hidden"
        );


        // Scroll to evaluation
        evaluation.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(
            "Evaluation Error:",
            error
        );

        alert(error.message);

    } finally {

        evaluateBtn.disabled = false;

        evaluateBtn.textContent =
            "Evaluate My Answer";

    }

});


// ================================
// Next Question
// ================================

nextQuestionBtn.addEventListener(
    "click",
    async () => {

        const jobRole =
            jobRoleInput.value.trim();


        if (!jobRole) {

            alert(
                "Please enter a job role"
            );

            return;
        }


        nextQuestionBtn.disabled =
            true;

        nextQuestionBtn.textContent =
            "Generating...";


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/interview/question",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            jobRole: jobRole
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to generate question"
                );

            }


            // Update question
            question.textContent =
                data.question;


            // Clear previous answer
            answerInput.value = "";


            // Hide old evaluation
            evaluation.classList.add(
                "hidden"
            );


            // Show answer section
            answerSection.classList.remove(
                "hidden"
            );


            // Show question
            result.classList.remove(
                "hidden"
            );


            // Scroll to question
            result.scrollIntoView({
                behavior: "smooth"
            });


        } catch (error) {

            console.error(
                "Next Question Error:",
                error
            );

            alert(error.message);

        } finally {

            nextQuestionBtn.disabled =
                false;

            nextQuestionBtn.textContent =
                "Next Question";

        }

    }
);