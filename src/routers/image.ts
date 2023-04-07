import express from 'express';

const router = express.Router();

router.post('/resolution', (req, res) => {
  console.log({ req });
  res.send('Improving your images resolution');
});

export default router;
