import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './request';
import { registerShortUrlService } from './service';

const registerShortUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const result = await registerShortUrlService(event.body);
  return formatJSONResponse({
    result,
  });
};

export const main = middyfy(registerShortUrl);
