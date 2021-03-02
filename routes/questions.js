import express from 'express';

import { getQuestions, getQuestion, createQuestion, updateQuestion, likeQuestion, deleteQuestion } from '../controllers/questions.js';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', createQuestion);
router.get('/:id', getQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);
router.patch('/:id/likePost', likeQuestion);

export default router;