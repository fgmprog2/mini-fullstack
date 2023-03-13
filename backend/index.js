import express from "express";
import router from "./routes/router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use((req, res) => {
    res.status(404).json("Halaman tidak ditemukan");
})

app.listen(5000, () => console.log("Server berjalan di port 5000"));