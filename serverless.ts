/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';
import resources from '@configs/resources';
import provider from '@configs/provider';
import hello from '@modules/hello/function';
import redirect from '@modules/redirect/function';
import registerShortUrl from '@modules/register-shorturl/function';

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
    // dynamodb: {
    //   stages: ['dev'],
    // start: {
    //   docker: true,
    //   dockerImage: 'amazon/dynamodb-local',
    //   port: 8000,
    //   inMemory: true,
    //   migrate: true,
    //   seed: true,
    //   convertEmptyValues: true,
    // },
    // },
  },
};

module.exports = serverlessConfiguration;
