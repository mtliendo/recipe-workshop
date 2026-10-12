# Sunday Box

Maya’s family recipe box. Cloning the repo is the start. This checkpoint is the setup: Auth0, Neon, Vercel Blob, and the AI Gateway, checked on the web.

## What is working

The box starts empty. **Sign up** and **Sign in** in the header go through Auth0, and **Sign out** ends the session. Each recipe is stored with that person’s Auth0 id, and the box only returns their cards.

These stay behind login:

- Write a card, and revise or remove one
- Save a picture to Vercel Blob, or **Photograph it** with the AI Gateway
- The kitchen chat
- Settings

Google Calendar in Settings is still only a mark on the page.

## Set it up

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The names in `.env.example` are the ones the app reads. Auth0’s Next.js SDK also reads `.env.local`, and that file wins over `.env` when both exist. Keep real values out of git.

### Auth0

Create a Regular Web Application for Next.js.

- Base URL: `http://localhost:3000`
- Allowed callback: `http://localhost:3000/auth/callback`
- Allowed logout URL: `http://localhost:3000`

Put `APP_BASE_URL`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `AUTH0_SECRET` in `.env.local`. Generate the secret with `openssl rand -hex 32`.

When the app is deployed, add that origin’s `/auth/callback` and logout URL as well, and include the origin in `APP_BASE_URL`.

### Neon

Create a project and copy the pooled connection string into `DATABASE_URL`. Apply `db/schema.sql` with the direct (non-pooler) string. That file creates the recipe table with a required `owner` column and removes the old shared starter cards.

### Vercel

Create a project, a public Blob store, and an AI Gateway API key.

- `BLOB_READ_WRITE_TOKEN` comes from the Blob store
- `AI_GATEWAY_API_KEY` is for local runs. A Vercel deployment can use its OIDC token instead
- `AI_GATEWAY_MODEL` and `AI_GATEWAY_IMAGE_MODEL` are the chat and photograph models. The values in `.env.example` are current ids from [the model list](https://ai-gateway.vercel.sh/v1/models)

Set the same variables on the Vercel project before you deploy.

## Check

With the dev server running, or on the deployed URL:

1. Signed out, the homepage asks you to sign in. The brisket, cornbread, and cobbler cards are gone.
2. Sign up or sign in. The box is empty until you write a card.
3. Write a card. It shows on the homepage for this sign-in.
4. Sign out. The card leaves the page. Sign in again and it is back.
5. Open the kitchen and send a note. It should answer.
6. On a card, use **Photograph it**, or choose a picture. The plate should keep that photo.
