import express from 'express';
import multer from 'multer';
const router = express.Router();

router.post('/generate', multer().none(), (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  res.send('Improving your images resolutions');
});

export default router;
