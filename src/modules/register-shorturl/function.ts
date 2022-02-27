import { handlerPath } from '@libs/handler-resolver';
import schema from './request';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/register-shorturl',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
