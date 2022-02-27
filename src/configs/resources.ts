/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

export default {
  Resources: {
    ShortUrlTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${self:service}-${self:provider.stage}-shorturl',
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          // { AttributeName: 'fullUrl', AttributeType: 'S' },
          // { AttributeName: 'createdAt', AttributeType: 'N' },
          // { AttributeName: 'expiryPeriod', AttributeType: 'N' },
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
