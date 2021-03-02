import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
	{
		category: String,
		air_date: String,
		question: String,
		value: String,
		answer: String,
		round: String,
		show_number: String
	},
	{
		collection: 'import'
	}
);

var PostQuestions = mongoose.model('PostQuestions', postSchema);

export default PostQuestions;
