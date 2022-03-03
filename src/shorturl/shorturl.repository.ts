/* istanbul ignore file */
import { ShortUrl } from './shorturl.entity';
import type { ShortUrlModel } from './shorturl.model';

export class ShortUrlRepository {
  private model:typeof ShortUrlModel;

  constructor(model: typeof ShortUrlModel) {
    this.model = model;
  }

  async getById(id: string) {
    const result = await this.model.get(id);
    if (!result) {
      throw new Error('Short Url not available');
    }
    return ShortUrl.fromDoc(result);
  }

  async create(record: ShortUrl) {
    const result = await this.model.create(record);
    const newItem = ShortUrl.fromDoc(result);
    return newItem;
  }

  async exists(id: string) {
    try {
      await this.getById(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
