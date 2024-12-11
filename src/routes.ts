import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { userSchema } from "./model";

const router = express.Router();
const User = mongoose.model("User", userSchema);

router.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hello World!");
});

router.post("/create", async (req: Request, res: Response) => {
	try {
		const newUser = new User(req.body);

		if (!newUser.email || newUser.email === "") {
			res.status(400).send({ errors: { email: "Email is required" } });
			return;
		}

		if (!newUser.name || newUser.name === "") {
			res.status(400).send({ errors: { name: "Name is required" } });
			return;
		}

		await newUser.save();
		res.status(201).send(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.get("/read", async (req: Request, res: Response) => {
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.put("/update/:id", async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

export default router;
