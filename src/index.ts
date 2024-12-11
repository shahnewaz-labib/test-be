import mongoose from "mongoose";
import "dotenv/config";
import app from "./app";

mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err.message));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

