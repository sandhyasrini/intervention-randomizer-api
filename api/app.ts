import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
export const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript Server');
});

export default app;