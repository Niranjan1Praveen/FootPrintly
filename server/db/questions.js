const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./FootPrintlyNew.db", (err) => {
    if (err) {
        console.error("Error opening database:", err);
    } else {
        console.log("Connected to FootPrintlyNew.db");

        db.run(
            `CREATE TABLE IF NOT EXISTS ScoresTable (
                Q1 FLOAT,
                Q2 FLOAT,
                Q3 FLOAT,
                Q4 FLOAT,
                Q5 FLOAT,
                Score FLOAT,
                TotalScore FLOAT DEFAULT 0,
                SustainabilityLevel TEXT,
                SCS FLOAT,
                CDS FLOAT,
                SSD FLOAT,
                TTR FLOAT
            )`
        );
    }
});

app.get("/api/questions", (req, res) => {
    const query = `SELECT QuestionID, QS, Option1, Option2, Option3, Option4, 
                          op1score, op2score, op3score, op4score, 
                          (op1score + op2score + op3score + op4score) AS totalScore 
                   FROM QuestionsDatabase WHERE theme = 'Onboarding Questions'` ;

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
