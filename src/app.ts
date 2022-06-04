import 'dotenv/config';
import express, { Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';

const app = express();

const servers = JSON.parse(`[${process.env.SERVERS}]`);

let current = 0;

const handler = async (request: Request, response: Response) => {
  const { method, url, headers, body } = request;

  const server = servers[current];

  if (current === servers.length - 1) current = 0;
  else current++;

  try {
    const result = await axios({
      url: `${server}${url}`,
      method,
      headers: headers as AxiosRequestHeaders,
      data: body,
    });

    return response.status(result.status).send(result.data);
  } catch (error) {
    let status = 500;
    let { message } = error;

    if (error.response) {
      status = error.response.status;
      message = error.response.data;
    }

    return response.status(status).send(message);
  }
};

app.use((request: Request, response: Response) => {
  handler(request, response);
});

export { app };
