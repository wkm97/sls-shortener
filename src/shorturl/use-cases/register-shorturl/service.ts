import { ShortUrl } from '@shorturl/shorturl.entity';
import { ShortUrlRepository } from '@shorturl/shorturl.repository';

export interface RegisterShortUrlParams {
  fullUrl: string;
  expiryPeriod?: number;
}

export class ShorUrlService {
  private repo: ShortUrlRepository;

  constructor(repo: ShortUrlRepository) {
    this.repo = repo;
  }

  async register(params: RegisterShortUrlParams) {
    const { fullUrl, expiryPeriod } = params;
    if (!fullUrl) {
      throw new Error('Full URL is required.');
    }

    const shortUrl = ShortUrl.create(fullUrl);
    const isExist = this.repo.exists(shortUrl.id);
    if (isExist) {
      shortUrl.resetId();
    }
    shortUrl.setExpiryPeriod(expiryPeriod);
    const result = this.repo.create(shortUrl);
    return result;
  }
}
