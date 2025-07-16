const express = require('express');
const fs = require('fs');
const ini = require('ini');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const config = ini.parse(fs.readFileSync('./public/common/conf.ini', 'utf-8'));
        const apiKey = config.gpt.api_key;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                //model: 'gpt-4',
                model: 'gpt-3.5-turbo',
                messages: req.body.messages,
            }),
        });

        const data = await response.json();
        console.log("GPT raw response:", data);
        res.json({ result: data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
