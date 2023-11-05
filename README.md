# jubmoji.quest

## Overview

Users of Jubmoji.quest tap NFC cards to collect signatures. By collecting these signatures, they complete quests. In order to complete a quest, a user must generate a client-side zero knowledge proof about the signatures they have collected. In particular, we allow users to complete quests which will send their proof to an external server for custom verification.

## What is a Jubmoji?

We have distributed 201 NFC Cards across Zuconnect/Devconnect. Each of these cards has a [BabyJubJub](https://eips.ethereum.org/EIPS/eip-2494) ECDSA private key stored in its trusted hardware, a list of all public keys can be found [here](https://github.com/jubmoji/jubmoji.quest/blob/main/packages/jubmoji-api/src/data/cardPubKeys.ts). When a user taps an NFC Card, [the card increments a nonce and signs](https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign_random) the pair `(nonce, randomSalt)` with its private key. This signature is the Jubmoji.

## What proofs can be made about Jubmojis?

As of today, there is one general purpose proof which encompasses all the statements a user can prove, [NUniqueJubmojisInCollection](https://github.com/jubmoji/jubmoji.quest/blob/5d163d80a6cf672fef3a27022abbf6d0244abfe4/packages/jubmoji-api/src/proofs.ts#L192). This proof represents the fact that "I own N Jubmojis which were given by unique cards in this list". There are many interesting things we can do with just this one statement:

- Prove a user has met every person at an event (give everyone a card, set collection = list of people's card public keys, N = # of people)
- Prove a user has joined any team in a game (have one card for each team, set collection = list of team card public keys, N = 1)
- Prove a user owns a Jubmoji from a specific card (set collection = a list consisting of one card, N = 1)

## Getting Started with jubmoji-api

Talk to Andrew or Vivek to get a quest set up for your project. In particular, we will give you a few NFC cards to hand out signatures with, and create the quest for you on jubmoji.quest. When users complete your quest, they will generate a proof client-side and be redirected to a url of your choice with the proof.

## Proof Verification

Proofs are sent to a url of your choice in the `proof` url param, i.e. https://url.com/jubmojis?proof=EXAMPLE_SERIALIZED_PROOF. There is an example verification script located [here](https://github.com/jubmoji/jubmoji.quest/blob/main/apps/jubmoji-quest/src/examples/exampleVerification.ts), to use it you must install [jubmoji-api](https://github.com/jubmoji/jubmoji.quest/tree/main/packages/jubmoji-api): `npm i jubmoji-api`. Optionally, for more general elliptic curve and BabyJubJub utilities, see [babyjubjub-ecdsa](https://github.com/jubmoji/babyjubjub-ecdsa/tree/main).

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

## Acknowledgements

We are grateful for all the work done by others that was needed for this to exist. A few special shoutouts:

- Barrywhitehat for suggesting our use of the Babyjubjub curve
- Cameron and Michal from [Arx](https://arx.org/) for helping us with NFC cards and their web API
- Marcus for implementing Babyjubjub signatures on NFC cards
- [IYK](https://www.iyk.app/) for providng us with an initial set of NFC cards (thank you Yi Sun for the introduction)
