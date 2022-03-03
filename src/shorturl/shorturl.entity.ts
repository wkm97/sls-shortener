import { isValidHttpUrl } from '@libs/utils';
import { DateTime } from 'luxon';
import { customAlphabet } from 'nanoid';
import { ShortUrlDoc } from './shorturl.model';

interface ShortUrlProp {
  id: string;
  fullUrl: string;
  expireAt: Date;
  createdAt: Date
}

export class ShortUrl implements ShortUrlProp {
  id: string;

  fullUrl: string;

  expireAt: Date;

  createdAt: Date;

  private constructor(params: ShortUrlProp) {
    this.id = params.id;
    this.fullUrl = params.fullUrl;
    this.createdAt = params.createdAt;
    this.expireAt = params.expireAt;
  }

  static create(fullUrl: string) {
    if (!isValidHttpUrl(fullUrl)) {
      throw new Error('Not a Valid HTTP URL.');
    }
    const params = {
      id: ShortUrl.generateUniqueId(),
      fullUrl,
      createdAt: DateTime.now().toJSDate(),
      expireAt: DateTime.now().plus({ minute: 5 }).toJSDate(),
    };
    return new ShortUrl(params);
  }

  setExpiryPeriod(minutes?: number) {
    if (minutes) {
      this.expireAt = DateTime.fromJSDate(this.createdAt).plus({ minute: minutes }).toJSDate();
    }
  }

  private static generateUniqueId() {
    const base64characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    return customAlphabet(base64characters, 6)();
  }

  resetId() {
    this.id = ShortUrl.generateUniqueId();
  }

  /* istanbul ignore next */
  static fromDoc(doc: ShortUrlDoc) {
    return new ShortUrl({ ...doc });
  }
}
