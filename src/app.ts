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
    return response
      .status(error.response.status || 500)
      .send(error.response.data || error.message);
  }
};

app.use((request: Request, response: Response) => {
  handler(request, response);
});

export { app };
