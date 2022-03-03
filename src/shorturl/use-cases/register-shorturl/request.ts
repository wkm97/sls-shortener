export default {
  type: 'object',
  properties: {
    fullUrl: { type: 'string' },
    expiryPeriod: { type: 'number' },
  },
  required: ['fullUrl'],
} as const;
