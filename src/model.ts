import { Schema } from "mongoose";

export const userSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	role: {
		type: String,
	},
});
