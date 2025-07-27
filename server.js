const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { nanoid } = require("nanoid");
const db = require("./db");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.post("/api/shorten", (req, res) => {
    const { longUrl } = req.body;
    const shortCode = nanoid(6);
    const shortUrl = `http://localhost:3000/${shortCode}`;
    db.query("INSERT INTO urls (long_url, short_code) VALUES (?, ?)", [longUrl, shortCode], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ shortUrl });
    });
});
app.get("/:shortCode", (req, res) => {
    const { shortCode } = req.params;
    db.query("SELECT long_url FROM urls WHERE short_code = ?", [shortCode], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("URL not found");
        res.redirect(results[0].long_url);
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
