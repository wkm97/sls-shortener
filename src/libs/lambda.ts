import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import * as dynamoose from 'dynamoose';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HttpError } from 'http-errors';
import { isLocalDevelopment } from '@configs/is-local';

// Setup dynamodb configuration before constructing models.
if (isLocalDevelopment) {
  dynamoose.aws.sdk.config.update({
    region: process.env.REGION,
  });
  dynamoose.aws.ddb.local('http://localhost:8000');
}

const errorHandler = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<void> => {
    const error = request.error as HttpError;
    if (error.statusCode) {
      request.response = {
        body: JSON.stringify({ message: error.message, statusCode: error.statusCode }),
        statusCode: error.statusCode,
      };
    } else {
      request.response = {
        body: JSON.stringify({ message: error.message, statusCode: 500 }),
        statusCode: 500,
      };
    }
  };

  return {
    onError,
  };
};

export const middyfy = (handler) => middy(handler)
  .use(middyJsonBodyParser())
  .use(errorHandler());
