const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5501; // You can choose any available port

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public')); // Serve your static HTML file

// Replace 'Your_OpenAI_API_Key' with your actual OpenAI API key
const OPENAI_API_KEY = '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';

app.post('/generate-response', async (req, res) => {
    const { postContent, businessDescription } = req.body;

    // Define the payload to send to OpenAI
    const payload = {
        model: "asst_Hvubf1OsC3PVl6gnz9skJNPT",
        prompt: `Social Media Post Content: ${postContent}\nBusiness Description: ${businessDescription}`,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    };

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Send back the response from ChatGPT to the frontend
        res.json({ response: data.choices[0].text.trim() });
    } catch (error)  {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message }); // Ensures JSON format
    };
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
