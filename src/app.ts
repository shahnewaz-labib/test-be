import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes";

const PORT = process.env.PORT || 3000;
export const app = express();

app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV !== "test") {
	mongoose
		.connect(process.env.MONGODB_URI as string)
		.then(() => console.log("Connected to MongoDB"))
		.catch((err) => console.error("Error connecting to MongoDB:", err.message));

	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

export default app;
