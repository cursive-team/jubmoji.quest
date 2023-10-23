# jubmoji.quest

Website v2 for use at Zuconnect &amp; Devconnect

## Development

#### Yarn

Install yarn: `corepack enable`.

Run `yarn install` in root directory.

#### Postgres & Prisma

1.  Install and run Postgres locally.
2.  Set the DATABASE_PRISMA_URL and DATABASE_URL_NON_POOLING env variables to be a URL pointing to your local database.
3.  Run `npx prisma migrate dev --name [name]` to create a dev migration.
4.  Run `npx prisma generate` to regenerate the prisma client.

#### Localhost

Run both of these from root:

1. `cd packages/jubmoji-api && yarn run build`
2. `cd apps/jubmoji-quest && yarn dev`
