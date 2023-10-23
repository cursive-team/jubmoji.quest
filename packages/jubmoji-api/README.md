# jubmoji-api

## Scripts

There are a few scripts involved with setting up cards. To run them, run `npx ts-node` from `packages/jubmoji-api`.

`uploadToJubmojiDB` - Sets up 200 cards with example names, descriptions, and owners. Please clear the `Card` table before running this.

`uploadToVercel` - Uploads images for 200 cards to Vercel Blob. 