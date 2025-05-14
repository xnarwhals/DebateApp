// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message, systemPrompt } = req.body;
    console.log('Received message:', message);

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        stream: false
      })
    });

    const data = await response.json();
    const reply = data.message.content;

    res.json({ reply });

    } catch (error) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({ reply: `Error: ${error.message}` });
    }
  });

app.listen(3001, () => {
  console.log('✅ Local AI backend running on http://localhost:3001');
});