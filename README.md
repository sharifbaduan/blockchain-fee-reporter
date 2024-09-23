# Blockchain Fee Reporter Service
App to report BTC and BNB transactions fees every 10 seconds.

## Tech Stack
![NodeJS](https://img.shields.io/badge/nodejs-black?style=for-the-badge&logo=node.js)
![PNPM](https://img.shields.io/badge/pnpm-black?style=for-the-badge&logo=pnpm)
![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript)
![NestJS](https://img.shields.io/badge/nestjs-black?style=for-the-badge&logo=nestjs)
![Docker](https://img.shields.io/badge/docker-black?style=for-the-badge&logo=docker)
![Redis](https://img.shields.io/badge/redis-black?style=for-the-badge&logo=redis)

> Note: there is a cache layer implemented to avoid reporting the fee if it's value hasn't changed. Memory cache it's used when running the app with pnpm, and Redis when running it with Docker.

## 💻 Install and run (pnpm)

```sh
$ npm install -g pnpm
$ pnpm install
$ pnpm start
```

## 🐳 Install and run (Docker)

```sh
$ docker-compose up --build
```
