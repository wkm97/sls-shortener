import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// https://www.serverless.com/blog/node-rest-api-with-serverless-lambda-and-dynamodb
const hello: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const message = 'Hello everyone';
  return formatJSONResponse({
    results: message,
    event,
  });
};

export const main = middyfy(hello);
