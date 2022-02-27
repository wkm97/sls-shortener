import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { DateTime } from 'luxon';

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  fullUrl: {
    type: String,
    required: true,
    validate: isValidHttpUrl,
  },
  expireAt: {
    type: Date,
    default: () => DateTime.now().plus({ minute: 5 }).toJSDate(),
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toJSDate(),
  },
});

class ShortUrl extends Document {
  id: string;

  fullUrl: string;

  expireAt: Date;

  createdAt: Date;
}

export const ShortUrlModel = dynamoose.model<ShortUrl>('shorturl', schema, {
  prefix: process.env.TABLE_PREFIX,
});
