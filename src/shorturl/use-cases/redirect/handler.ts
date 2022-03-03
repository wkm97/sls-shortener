import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ShortUrlModel } from '@shorturl/shorturl.model';
import { ShortUrlRepository } from '@shorturl/shorturl.repository';
import * as createHttpError from 'http-errors';

const redirect: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const { shortUrl } = event.pathParameters;

  const repo = new ShortUrlRepository(ShortUrlModel);
  const result = await repo.getById(shortUrl);
  if (result) {
    return {
      statusCode: 302,
      headers: {
        Location: result.fullUrl,
      },
      body: null,
    };
  }
  throw new createHttpError.NotFound('Record not found');
};

export const main = middyfy(redirect);
