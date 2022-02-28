/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

export default {
  Resources: {
    ShortUrlTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${self:provider.environment.TABLE_PREFIX}shorturl',
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  },
} as AWS['resources'];
