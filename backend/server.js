import express from "express";
import cors from "cors";
import chatStream from "./routes/chatStream.js";
import { limiter } from "./middleware/rateLimit.js";
import { moderate } from "./middleware/moderation.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(moderate);

app.use("/api/chat", chatStream);

app.get("/", (_, res) => res.send("ABS AI backend running"));

app.listen(3000);
