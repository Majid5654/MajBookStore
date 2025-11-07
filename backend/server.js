import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path";
import { PrismaClient } from "./lib/generated/prisma/index.js";

dotenv.config({ path: path.resolve("../.env") }); // save port from .env to process.env

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
const prisma = new PrismaClient();

console.log(PORT);

app.use(express.json()); //for json like image etc
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "https://majbookstore.up.railway.app",
    ],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false, // matikan CSP sementara
  })
);
app.use(morgan("dev")); //for log requests

//this is arcjet

if (process.env.NODE_ENV === "production") {
  app.use(async (req, res, next) => {
    try {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://majbookstore.up.railway.app",
      ];
      const origin = req.headers.origin;

      if (allowedOrigins.includes(origin)) {
        return next();
      }

      const decision = await aj.protect(req, {
        requested: 1,
      });

      if (decision.isDenied) {
        if (decision.reason.isRateLimit()) {
          res
            .status(429)
            .json({ success: false, message: "Rate limit exceeded" });
        } else if (decision.reason.isBot()) {
          return res
            .status(403)
            .json({ success: false, message: "Bot detected" });
        } else {
          res.status(403).json({ success: false, message: "Unauthorized" });
        }
        return;
      }
      next();
    } catch (error) {}
  });
}

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
