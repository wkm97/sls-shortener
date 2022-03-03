/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';
import resources from '@configs/resources';
import provider from '@configs/provider';
import hello from '@shorturl/use-cases/hello/function';
import redirect from '@shorturl/use-cases/redirect/function';
import registerShortUrl from '@shorturl/use-cases/register-shorturl/function';

const serverlessConfiguration: AWS = {
  service: 'sls-shortener',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline'],
  provider,
  // import the function via paths
  functions: {
    hello,
    redirect,
    registerShortUrl,
  },
  resources,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        noStart: true,
      },
    },
  },
};

module.exports = serverlessConfiguration;
