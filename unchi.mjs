import express from 'express';
import iconv from 'iconv-lite';
import fetch from 'node-fetch';

const app = express();

app.get('/fetch-and-convert', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL is required as a query parameter.');
  }

  try {
    // 外部の URL からデータを取得
    const response = await fetch(url);

    // レスポンスのバッファを取得
    const buffer = await response.buffer();

    // Shift-JIS から UTF-8 に変換
    const utf8Text = iconv.decode(buffer, 'Shift_JIS');

    // 変換したテキストをレスポンスとして返送
    res.send(utf8Text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or converting data.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
