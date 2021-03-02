import express from 'express';
import mongoose from 'mongoose';

import PostQuestions from '../models/postQuestions.js';

const router = express.Router();

export const getQuestions = async (req, res) => {
	try {
		const postQuestions = await PostQuestions.find().limit(30);

		res.status(200).json(postQuestions);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getQuestion = async (req, res) => {
	const { id } = req.params;

	try {
		const question = await PostQuestions.findById(id);

		res.status(200).json(question);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createQuestion = async (req, res) => {
	const { category, air_date, question, value, answer, round, show_number } = req.body;

	const newPostQuestion = new PostQuestions({ category, air_date, question, value, answer, round, show_number });

	try {
		await newPostQuestion.save();

		res.status(201).json(newPostQuestion);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateQuestion = async (req, res) => {
	const { id } = req.params;
	const { category, air_date, question, value, answer, round, show_number } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	const updatedQuestion = { category, air_date, question, value, answer, round, show_number, _id: id };

	await PostQuestions.findByIdAndUpdate(id, updatedQuestion, { new: true });

	res.json(updatedQuestion);
};

export const deleteQuestion = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	await PostQuestions.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully.' });
};

export const likeQuestion = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	const question = await PostQuestions.findById(id);

	const updatedQuestion = await PostQuestions.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

	res.json(updatedQuestion);
};

export default router;
