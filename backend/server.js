require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    generateInterviewQuestion,
    evaluateInterviewAnswer
} = require("./services/geminiService");


const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {

    res.send("AI Interview Coach API is running");

});


// ===============================
// Generate Interview Question
// ===============================

app.post("/api/interview/question", async (req, res) => {

    try {

        const { jobRole } = req.body;

        if (!jobRole) {

            return res.status(400).json({
                success: false,
                message: "Job role is required"
            });

        }

        const question =
            await generateInterviewQuestion(jobRole);

        res.json({

            success: true,

            jobRole,

            question

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to generate interview question"

        });

    }

});


// ===============================
// Evaluate Interview Answer
// ===============================

app.post("/api/interview/evaluate", async (req, res) => {

    try {

        const {
            jobRole,
            question,
            answer
        } = req.body;
        
        console.log("QUESTION:", question);
        console.log("ANSWER:", answer);

        if (!jobRole || !question || !answer) {

            return res.status(400).json({

                success: false,

                message:
                    "Job role, question and answer are required"

            });

        }


        const result =
            await evaluateInterviewAnswer(
                jobRole,
                question,
                answer
            );


        res.json({

            success: true,

            evaluation: result

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to evaluate answer"

        });

    }

});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});