import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ShortUrlModel } from '@shorturl/shorturl.model';
import { ShortUrlRepository } from '@shorturl/shorturl.repository';
import schema from './request';
import { ShorUrlService } from './service';

const registerShortUrlHandler:
ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const repo = new ShortUrlRepository(ShortUrlModel);
  const service = new ShorUrlService(repo);
  const result = await service.register(event.body);
  return formatJSONResponse({
    result,
  });
};

export const main = middyfy(registerShortUrlHandler);
