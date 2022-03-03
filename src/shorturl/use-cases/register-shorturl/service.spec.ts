import { ShortUrl } from '@shorturl/shorturl.entity';
import { ShortUrlRepository } from '@shorturl/shorturl.repository';
import Chance from 'chance';
// // import { DateTime } from 'luxon';
// import * as dynamoose from 'dynamoose';
import { ShorUrlService, RegisterShortUrlParams } from './service';

const chance = new Chance();
const mockRegisterParams: RegisterShortUrlParams = {
  fullUrl: chance.url(),
  expiryPeriod: chance.integer(),
};

jest.mock('@shorturl/shorturl.repository');

describe('register short url', () => {
  const repo = new ShortUrlRepository(null);
  const service = new ShorUrlService(repo);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('register short url with result return.', async () => {
    const mockResult = ShortUrl.create(mockRegisterParams.fullUrl);
    jest.spyOn(repo, 'create').mockResolvedValue(mockResult);
    const result = await service.register(mockRegisterParams);

    expect(result).toStrictEqual(mockResult);
    expect(repo.create).toBeCalledTimes(1);
  });

  it('register short url even when id is existed.', async () => {
    const mockResult = ShortUrl.create(mockRegisterParams.fullUrl);
    jest.spyOn(repo, 'exists').mockResolvedValue(true);
    jest.spyOn(repo, 'create').mockResolvedValue(mockResult);
    const result = await service.register(mockRegisterParams);

    expect(result).toStrictEqual(mockResult);
    expect(repo.create).toBeCalledTimes(1);
  });

  it('return error when fullUrl is not provided', async () => {
    await expect(service.register({ fullUrl: null }))
      .rejects
      .toThrow('Full URL is required.');
  });

  it('return error when the fullUrl is not a URL', async () => {
    const mockParams = {
      ...mockRegisterParams,
      fullUrl: chance.string(),
    };
    await expect(service.register(mockParams))
      .rejects
      .toThrow('Not a Valid HTTP URL.');
  });
});
