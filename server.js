const express = require('express');
const path = require('path');
const gptRouter = require('./public/common/gptRouter');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/gpt', gptRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));






/*
git add .
git commit -m "커밋 메시지"
git push origin main
*/