import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import AppError from "./utils/AppError";
import _default from "./config/config";
import router from "./routes/developer.routes";
import cors from "cors";
import fs from 'fs'
const { PrismaClient } = require("@prisma/client");
import swaggerUI from 'swagger-ui-express'
const swaggerData = fs.readFileSync('swagger.json', 'utf-8');
const swaggerResult = JSON.parse(swaggerData)
dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();

async function bootstrap() {
  // TEMPLATE ENGINE
  app.set("view engine", "pug");
  app.set("views", `${__dirname}/views`);

  // MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded());
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerResult))

  // 2. Cors
  app.use(
    cors({
      origin:process.env.ORIGIN || [_default.origin],
      methods: "GET,HEAD,PUT,PATCH,POST",
      credentials: false,
      preflightContinue: false,
    })
  );

  // ROUTES
  app.use("/api/v1", router);

  // UNHANDLED ROUTES
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  const port = process.env.PORT || _default.port;
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
