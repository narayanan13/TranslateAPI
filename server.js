import express, { json } from "express";
import { get } from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 1417;

app.use(cors());
app.use(json()); // Middleware to parse JSON requests

// Translation API Endpoint
app.get("/translate", async (req, res) => {
    try {
        const { source, target, text } = req.query;

        // Validate input
        if (!source || !target || !text) {
            return res.status(400).json({ error: "Missing required query parameters: source, target, text" });
        }

        // Construct the API URL dynamically
        const url = `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`;

        // Make the API request
        const response = await get(url);

        // Send back the API response
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching translation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
