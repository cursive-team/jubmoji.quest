# jubmoji.quest

Website v2 for use at Zuconnect &amp; Devconnect

## Development

#### Yarn

Install yarn: `corepack enable`.

Run `yarn install` in root directory.

#### Postgres

To run the app locally, you must have Postgres running and set the DATABASE_URL env variable to be a URL pointing to your local database.

#### Localhost

Run both of these from root:

1. `cd packages/jubmoji-api && yarn run build`
2. `cd apps/jubmoji-quest && yarn dev`
