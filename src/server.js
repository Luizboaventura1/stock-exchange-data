import express from "express";
import stockRoutes from "./routes/stockRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import getAPIData from "./api/index.js";
import cors from "cors";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "https://stock-exchange-data.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", stockRoutes);

app.get("/api/v1", async (req, res) => {
  try {
    const data = await getAPIData();
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
