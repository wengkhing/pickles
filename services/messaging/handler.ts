import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import register from './controller/sendEmail';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { inject } from './inject/controller';
import { allowedOrigin } from './config/app.config';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: allowedOrigin,
  })
);
app.use(cookieParser());
app.use(express.json());

app.post('/email', inject(register));

const handler = serverless(app);

exports.main = async (event: APIGatewayEvent, context: Context) => {
  const result = await handler(event, context);
  return result;
};
