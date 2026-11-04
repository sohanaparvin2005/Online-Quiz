
const express = require("express");
const path = require("path");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Database connection test
app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT DATABASE() AS database_name"
        );

        res.json({
            success: true,
            message: "Database Connected Successfully!",
            database: rows[0].database_name
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

