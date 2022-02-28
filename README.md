## Dynamodb Local
```bash
docker-compose up -d dynamodb
docker-compose down # Close all services
```

## Local Setup
```bash
yarn run local
```

## Staging Setup
```bash
yarn run deploy:staging
```

## Models
1. shorturl
    - id
    - fullUrl
    - createdAt
    - expireAt