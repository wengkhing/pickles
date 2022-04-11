import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sendEmail from './controller/sendEmail';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { inject } from './inject/controller';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.post('/email', inject(sendEmail));

const handler = serverless(app);

exports.main = async (event: APIGatewayEvent, context: Context) => {
  const result = await handler(event, context);
  return result;
};
