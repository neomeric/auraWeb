# Brevo Form Integration — Setup Guide

## How It Works
Website form → Cloudflare Worker (holds API key securely) → Brevo API (creates contact + sends notification email)

## Steps

### 1. Create a Free Cloudflare Account
Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up (free).

### 2. Create a Worker
1. Go to **Workers & Pages** → **Create** → **Create Worker**
2. Name it `aurafusen-form`
3. Click **Deploy** (deploys the hello-world template)
4. Click **Edit Code**
5. Replace all code with the contents of `brevo-proxy.js`
6. Click **Deploy**

### 3. Add Your Brevo API Key as a Secret
1. Go to your worker → **Settings** → **Variables and Secrets**
2. Click **Add** under **Environment Variables**
3. Name: `BREVO_API_KEY`
4. Value: your Brevo API key
5. Click **Encrypt** to make it a secret
6. Click **Deploy**

### 4. Set Your CORS Origin
In `brevo-proxy.js`, update the `Access-Control-Allow-Origin` header:
- For production: `'https://www.aurafusen.com'` (already set)
- For local testing: change to `'*'` temporarily

### 5. Update the Website
In `auraWeb/js/main.js`, replace the `WORKER_URL` constant:
```js
const WORKER_URL = 'https://aurafusen-form.YOUR-SUBDOMAIN.workers.dev';
```
Your subdomain is shown in the Cloudflare dashboard under **Workers & Pages** → **Overview**.

### 6. Set Up Your Brevo Contact List
1. Log into [app.brevo.com](https://app.brevo.com)
2. Go to **Contacts** → **Lists** → **Add a list**
3. Name it "AuraFusen Pilot Applications"
4. Note the **list ID** (shown in the URL or list details)
5. Update `listIds: [2]` in `brevo-proxy.js` to your list ID

### 7. Create Contact Attributes in Brevo
1. Go to **Contacts** → **Settings** → **Contact Attributes**
2. Ensure these attributes exist (create if not):
   - `FIRSTNAME` (Text)
   - `LASTNAME` (Text)
   - `COMPANY` (Text)
   - `TEAM_SIZE` (Text)

### 8. Verify Sender Email
For the notification email to work:
1. Go to **Senders, Domains & Dedicated IPs** → **Senders**
2. Add `sales@neomeric.com` as a sender
3. Verify it via the confirmation email

## Testing
1. Open `index.html` locally
2. Click "Join the Pilot"
3. Fill in the form and submit
4. Check your Brevo **Contacts** list — the new contact should appear
5. Check `sales@neomeric.com` for the notification email

## Free Tier Limits
- **Cloudflare Workers**: 100,000 requests/day (more than enough)
- **Brevo Free**: 300 emails/day, unlimited contacts
