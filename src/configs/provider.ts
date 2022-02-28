/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

export default {
  name: 'aws',
  runtime: 'nodejs14.x',
  region: 'us-east-1',
  stage: '${opt:stage, "dev"}',
  apiGateway: {
    minimumCompressionSize: 1024,
    shouldStartNameWithService: true,
  },
  environment: {
    TABLE_PREFIX: '${self:service}-${self:provider.stage}-',
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    LOCAL_DEVELOPMENT: '${env:LOCAL_DEVELOPMENT, "false"}',
    REGION: '${self:provider.region}',
  },
  iam: {
    role: {
      statements: [{
        Effect: 'Allow',
        Action: [
          'dynamodb:ListTables',
          'dynamodb:DescribeTable',
          'dynamodb:Scan',
          'dynamodb:Query',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TABLE_PREFIX}*',
      }],
    },
  },
} as AWS['provider'];
