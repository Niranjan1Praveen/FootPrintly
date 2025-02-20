const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./FootPrintlyNew.db", (err) => {
    if (err) {
        console.error("Error opening database:", err);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.run(
    `CREATE TABLE IF NOT EXISTS LoginDatabase (
        OathID TEXT PRIMARY KEY,
        UserName TEXT NOT NULL,
        Password TEXT NOT NULL,
        EmailID TEXT NOT NULL
    )`
);

app.post("/api/signup", (req, res) => {
    const { username, password, email, authToken } = req.body;

    if (!username || !password || !email || !authToken) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `INSERT INTO LoginDatabase (OathID, UserName, Password, EmailID) VALUES (?, ?, ?, ?)`;
    const params = [authToken, username, password, email];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User registered successfully", OathID: authToken });
    });
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
