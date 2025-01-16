# Kelick API

CPF Contribution Calculator built with Hono and Open API with fully document type-safe JSON API.

## Included

- Structured logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- Documented / type-safe routes with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Interactive API documentation with [scalar](https://scalar.com/#api-docs) / [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- Convenience methods / helpers to reduce boilerplate with [stoker](https://www.npmjs.com/package/stoker)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Single source of truth database schemas with [drizzle](https://orm.drizzle.team/docs/overview) and [drizzle-zod](https://orm.drizzle.team/docs/zod)
- Testing with [vitest](https://vitest.dev/)
- Sensible editor, formatting and linting settings with [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Setup

1. Clone repository - `$ git clone https://github.com/klef-dev/kelick`
2. Move to the directory - `$ cd kelick`
3. Install dependencies `$ pnpm install`.
4. Run `$ cp .env.example .env` then open the `.env` file and populate it with necessary values. This will help you to run the application successfully.
5. Create postgres db / push schema `pnpm drizzle-kit push`

### Running the server locally (Dev Mode)

Start up the server

```bash
pnpm dev
# or
yarn dev
# or
bun run dev
# or
npm run dev
```

Application should start running on http://localhost:9999 by default.

### To build for production

First off you need to build the application using `$ pnpm build`. This will build it to the dist directory

And then run `$ pnpm start` to start the application in production mode.

Happy hacking 👨🏽‍💻.
