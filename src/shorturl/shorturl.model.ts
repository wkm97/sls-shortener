import { isValidHttpUrl } from '@libs/utils';
import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { DateTime } from 'luxon';

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

export class ShortUrlDoc extends Document {
  id: string;

  fullUrl: string;

  expireAt: Date;

  createdAt: Date;
}

export const ShortUrlModel = dynamoose.model<ShortUrlDoc>('shorturl', schema, {
  prefix: process.env.TABLE_PREFIX,
});
