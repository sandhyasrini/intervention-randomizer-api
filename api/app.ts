import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();

const app: Express = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
    'exposedHeaders': ['sessionId'],
    'origin': [process.env.UI_URL || 'http://localhost:3000'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'credentials': false,
    'preflightContinue': false
  }));
export const port = process.env.PORT || 3001;

app.get("/", async (req: Request, res: Response) => {
  const posts = await prisma.Developer.findMany();
  res.json(posts);
});

export default app;
