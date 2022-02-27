import { ShortUrlModel } from '@libs/models/shorturl';
import { DateTime } from 'luxon';
import { customAlphabet } from 'nanoid';

export interface RegisterShortUrlParams {
  fullUrl: string;
  expiryPeriod?: number;
}

const base64characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
export const generateId = customAlphabet(base64characters, 6);

const generateUniqueId = async () => {
  const generatedId = generateId();
  const result = await ShortUrlModel.get(generatedId);
  if (result) {
    return generateUniqueId();
  }
  return generatedId;
};

export const registerShortUrlService = async (params) => {
  const { fullUrl, expiryPeriod } = params;
  if (!fullUrl) {
    throw new Error('Full URL is required.');
  }
  const expireAt = DateTime.now().plus({ minute: expiryPeriod || 5 }).toJSDate();
  const uniqueId = await generateUniqueId();

  const result = await ShortUrlModel.create({
    id: uniqueId,
    fullUrl,
    expireAt,
  });
  return result;
};
