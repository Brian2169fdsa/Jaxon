# Combs Land Management

Production-ready marketing website for Combs Land Management, built with Next.js for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Vercel setup

Import this GitHub repository into Vercel. The framework preset will be detected automatically.

To enable quote emails, create a Resend account, verify a sending domain, and add the variables from `.env.example` to the Vercel project:

- `RESEND_API_KEY`
- `QUOTE_TO_EMAIL`
- `QUOTE_FROM_EMAIL`

To enable the site-aware Claude assistant, add:

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL` (use a current Claude model ID available to your Anthropic account)

## Before launch

Update the placeholder phone number, email address, domain metadata, review link, and any sample testimonials in `lib/site-data.ts` and the relevant page files.
