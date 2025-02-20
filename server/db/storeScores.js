const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3005;

const db = new sqlite3.Database("./FootPrintlyNew.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection error:", err);
    else console.log("Connected to FootPrintlyNew.db");
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/storeScore", (req, res) => {
    const { QuestionID, SelectedOption, SelectedScore, TotalScore } = req.body;
    
    if (!QuestionID || !SelectedOption || SelectedScore === undefined || TotalScore === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `INSERT INTO ScoreTable (QuestionID, SelectedOption, SelectedScore, TotalScore) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [QuestionID, SelectedOption, SelectedScore, TotalScore], function(err) {
        if (err) {
            console.error("Error inserting score:", err);
            res.status(500).json({ error: "Database insertion failed" });
        } else {
            res.status(200).json({ message: "Score saved successfully!", id: this.lastID });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
