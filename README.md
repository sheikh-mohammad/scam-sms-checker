# Scam SMS Checker

A mobile-first web app for Pakistani families. Paste an SMS or WhatsApp message
(Urdu, Roman Urdu, or English) and get a clear answer: **SCAM**, **PROBABLY SCAM**,
or **LOOKS SAFE**, with the red flags listed in Roman Urdu and English.

> **The key fact:** BISP says its real messages only come from **8171**. Anything
> claiming to be BISP from another number is fake.

Built with Next.js (App Router) and deployed on Vercel. No login. Nothing stored.

The full **what** lives in [`spec.md`](./spec.md). This README is the **how**.

---

## Three design rules

1. **Urdu first** — the verdict is always understandable in Roman Urdu.
2. **WhatsApp native** — the warning button opens WhatsApp, where the family is.
3. **One screen** — paste, check, read. Nothing else.

---

## How it works (the whole picture)

```
Browser (one screen)                 Server (Vercel)                 AI model
┌────────────────────┐   POST text   ┌──────────────────┐   prompt   ┌─────────┐
│ paste box          │ ────────────▶ │  /api/check      │ ─────────▶ │ Gemini  │
│ Check button       │               │  (holds the key) │            │ Claude  │
│ verdict card       │ ◀──────────── │  validates JSON  │ ◀───────── │ or Groq │
└────────────────────┘   verdict     └──────────────────┘   JSON     └─────────┘
```

- The browser never sees the API key. Only the server reads it.
- The server sends the message to the active AI provider with the instructions
  from `spec.md` section 5, and expects a fixed JSON shape back.
- If the model is unsure or returns something broken, the app errs on the side of
  caution and never crashes. It never says a message is "safe, guaranteed".
- Nothing is written to a database, logs, cookies, or local storage.

## Project structure

| Path | What it is |
| --- | --- |
| `spec.md` | The source of truth (what the app must do). |
| `app/page.tsx` | The single screen. |
| `app/checker.tsx` | The interactive UI (paste box, verdict card, Warn, Listen). |
| `app/api/check/route.ts` | The one server route that calls the AI. |
| `lib/prompt.ts` | The instructions given to the AI. |
| `lib/analyze.ts` | Server-only: provider switch + JSON parsing + safe fallback. |
| `lib/types.ts` | Shared types. |
| `.env.example` | The settings you copy into your own env file. |

---

## Run it on your computer (beginner steps)

1. **Install Node.js** (version 20 or newer) from <https://nodejs.org>. To check:
   ```bash
   node --version
   ```
2. **Install the project's packages:**
   ```bash
   npm install
   ```
3. **Get a free Google Gemini API key** at <https://aistudio.google.com/apikey>.
   Click "Create API key" and copy it.
4. **Create your local settings file.** Copy the example and paste your key:
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and set:
   ```
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your-key-goes-here
   ```
   > `.env.local` is ignored by Git on purpose. Never commit real keys.
5. **Start the app:**
   ```bash
   npm run dev
   ```
6. Open <http://localhost:3000> on your phone or browser. Paste a message and tap
   **Check karein**.

---

## Switching the AI provider

You only change settings, never code. Set `AI_PROVIDER` to `gemini`, `anthropic`,
or `groq`, and provide that provider's key.

| Provider | `AI_PROVIDER` | Key variable | Model variable | Notes |
| --- | --- | --- | --- | --- |
| Google Gemini | `gemini` (default) | `GEMINI_API_KEY` | `GEMINI_MODEL` | Has a **free tier** |
| Anthropic Claude | `anthropic` | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL` | Paid per use |
| Groq | `groq` | `GROQ_API_KEY` | `GROQ_MODEL` | Has a **free tier**, very fast |

The model defaults are sensible (Gemini `gemini-flash-latest`, Claude
`claude-sonnet-4-5`, Groq `llama-3.3-70b-versatile`). You can override them with the
model variables if you want a different or newer model.

---

## Deploy to Vercel (beginner steps)

1. **Push your code to GitHub** (this repo already is).
2. Go to <https://vercel.com> and sign in with GitHub.
3. Click **Add New… → Project**, then **Import** this repository.
4. Vercel auto-detects Next.js. Before deploying, open **Environment Variables** and add:
   - `AI_PROVIDER` = `gemini`
   - `GEMINI_API_KEY` = *(paste your key)*
5. Click **Deploy**. In about a minute you get a live link you can share on WhatsApp.
6. To change the key or provider later: **Project → Settings → Environment
   Variables**, edit the value, then **Redeploy**.

> If you deploy **without** a key, the site still loads and shows a friendly
> "service is not ready yet" message instead of crashing.

---

## Privacy

- No login and no accounts.
- Messages are sent to the AI provider only to be checked, and are not saved by
  this app anywhere.
- The API key lives only on the server.

---

## Verify your work (same checks used while building)

```bash
npm run lint       # code quality
npx tsc --noEmit   # TypeScript type check
npm run build      # production build
```

Manual checks from `spec.md` section 8: paste a BISP/prize message (expect red or
orange), paste a normal message (expect green), tap **Warn the family group**
(WhatsApp opens), tap **Sunnain / Listen** (it reads aloud), and toggle the language.

`LOOKS SAFE` never means "guaranteed safe" — no message can be guaranteed safe.
