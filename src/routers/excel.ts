import express from 'express';

const router = express.Router();

router.post('/validate', (req, res) => {
  res.send('Im supposed to validate excel files');
});

export default router;
