# Scam SMS Checker — Spec

The spec is the source of truth. Agree on the **what** here before writing code.
The **how** (framework, files, model choice) lives in the README and the code.

---

## 1. Goal

Pakistani families, especially older parents, receive SMS and WhatsApp messages that
are scams written in Urdu, Roman Urdu, or English. They cannot easily tell a scam from
a real message, and a wrong click can cost them money. This app gives one ordinary
person a fast, plain-language second opinion: paste the message, get a clear verdict
and the reason, in the language they read.

## 2. Design principles

1. **Urdu first** — the verdict and red flags are always understandable to someone who
   reads Roman Urdu, regardless of the toggle setting.
2. **WhatsApp native** — the warning feature hands off to WhatsApp, where the family
   already is, instead of inventing a new sharing channel.
3. **One screen** — one job, one screen: paste, check, read the answer. No extra pages,
   no accounts, no dashboards.

## 3. User scenarios

- When a user pastes a suspicious SMS and taps **Check**, they get one of three
  verdicts — **SCAM**, **PROBABLY SCAM**, or **LOOKS SAFE** — in a large coloured card,
  with the red flags listed in Roman Urdu and English.
- When a user taps **Warn the family group**, WhatsApp opens with a ready-to-send
  warning message that includes the verdict and the red flags.
- When a user taps **Listen**, the phone reads the answer aloud (Urdu if the phone has
  an Urdu voice, otherwise the best available voice).
- When a user taps the **اردو / English** toggle, the interface labels switch language,
  and the answer is shown in the chosen language first (the other language remains
  available).
- When a user pastes an empty or whitespace-only message and taps Check, they are told
  to paste a message first; no request is sent.

## 4. Functional requirements

1. The app has a single screen with: a large text box for pasting a message, a **Check**
   button, a language toggle, and an area for the result.
2. On Check, the pasted text is sent to a server endpoint. The server sends the text to
   an AI model together with the model instructions in section 5, and returns a
   structured verdict.
3. The verdict is exactly one of: `SCAM`, `PROBABLY SCAM`, `LOOKS SAFE`.
4. Each verdict is shown in a large card whose colour is: red for SCAM, orange for
   PROBABLY SCAM, green for LOOKS SAFE.
5. The result includes a list of red flags (zero or more), each written in simple Roman
   Urdu **and** English.
6. The result includes one clear recommended action, in Roman Urdu and English.
7. The result includes a short plain-language explanation, in Roman Urdu and English.
8. The result always states, in plain language, that no message can be guaranteed safe
   with full certainty.
9. A **Warn the family group** button opens a WhatsApp share link (`wa.me`) prefilled
   with a short warning that contains the verdict and the red flags. It never sends
   anything by itself; the user must press send inside WhatsApp.
10. A **Listen** button reads the current answer aloud using the browser's built-in
    text-to-speech. It prefers an Urdu voice when one is installed.
11. A language toggle switches the interface between Urdu and English labels.
12. The API key for the AI model is read only on the server and is never sent to or
    readable by the browser.
13. The app never stores pasted messages: not in a database, not in logs, not in local
    storage or cookies.
14. There is no login, no account, and no personal data collection.
15. If the server has no API key configured, or the model call fails, the app shows a
    clear, friendly error and does not crash.
16. The server can be pointed at different AI providers by configuration alone, without
    changing application code. Exactly one provider is active at a time.

## 5. Instructions given to the AI model

- Look for common Pakistani scam patterns: fake BISP payment messages; prize and
  lottery messages (e.g. "aap ka inaam nikla hai"); fake bank or mobile-wallet alerts
  asking for a code or PIN; fake parcel and courier messages; and urgent requests to
  call a number or send money.
- Use this fact: BISP says its real messages only come from **8171**. A BISP message
  from any other number is fake.
- Never say a message is safe with full certainty. If unsure, say so.
- Always end with one clear action: do not share any code or PIN, do not call the
  number, check on the official website.
- The model must return its answer in a fixed, machine-readable shape so the app can
  colour the card and build the WhatsApp text reliably.

## 6. Edge cases and rules

- **Empty / whitespace input:** blocked on the client with a friendly message; no request.
- **Very long input:** accepted but capped at a reasonable length (e.g. 2000 characters);
  the server truncates and proceeds rather than failing.
- **Mixed languages in one message:** handled; the model reads Urdu, Roman Urdu, and English.
- **Message that looks like a forwarded genuine bank alert:** verdict may be
  `PROBABLY SCAM` or `LOOKS SAFE` but must still carry the certainty disclaimer.
- **Model returns malformed output:** the server falls back to a safe result that says it
  could not be sure and gives the default action; the user is never shown a broken screen.
- **Missing or expired API key:** friendly error explaining the service is not configured.
- **Model timeout:** friendly error asking the user to try again.
- **Offline / network error:** friendly error asking the user to try again.
- **Emoji, links, and phone numbers in the message:** passed through to the model as-is.

## 7. Out of scope

- This app does **not** block, delete, or auto-reply to messages.
- It does **not** read the phone's inbox automatically; the user must paste the text.
- It does **not** store a history of checks.
- It does **not** provide legal, financial, or official advice.
- It does **not** support languages other than Urdu, Roman Urdu, and English.
- It does **not** verify a message against any official BISP/NADRA/bank database.
- It does **not** have accounts, teams, or admin panels.
- It does **not** guarantee that a `LOOKS SAFE` verdict means the message is truly safe.

## 8. Acceptance criteria

- [ ] Paste a BISP-style prize message → verdict is `SCAM` or `PROBABLY SCAM`, red or
      orange card, with red flags in Roman Urdu and English.
- [ ] A BISP message claiming to come from a number other than 8171 is flagged, and the
      8171 fact is referenced in the reason.
- [ ] Paste an ordinary non-scam message → verdict is `LOOKS SAFE`, green card, and the
      certainty disclaimer is still shown.
- [ ] The card colour matches the verdict for all three verdicts.
- [ ] **Warn the family group** opens WhatsApp with the verdict and red flags prefilled.
- [ ] **Listen** reads the answer aloud; Urdu is used when an Urdu voice exists.
- [ ] The language toggle switches all interface labels between Urdu and English.
- [ ] Empty input shows a friendly prompt and sends no request.
- [ ] The API key never appears in the browser bundle or network requests from the client.
- [ ] No message text is written to storage or logs.
- [ ] With no API key configured, the app shows a friendly error and stays usable.
- [ ] Changing a single configuration value switches the active AI provider with no code
      change.
- [ ] The app is usable on a narrow phone screen with large, readable text.
- [ ] Lint, type-check, and production build all pass.
