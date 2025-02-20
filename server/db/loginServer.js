const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const db = new sqlite3.Database("FootPrintlyNew.db");

app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM LoginDatabase WHERE (UserName = ? OR EmailID = ?) AND Password = ?",
        [username, username, password],
        (err, user) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!user) return res.status(401).json({ error: "Invalid credentials" });

            res.json({ message: "Login successful", authToken: user.OathID });
        }
    );
});

app.listen(3002, () => console.log("Server running on http://localhost:3002"));
