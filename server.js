const express = require('express');
const path = require('path');

const app = express();

// public 폴더를 정적 파일 제공용으로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 모든 요청에 대해 index.html 반환 (SPA 지원용)
// 단순히 "/"만 처리하고 싶다면 아래 if문 대신 app.get('/', ...) 사용해도 됨
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Render에서 지정하는 포트로 바인딩 (중요)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
