# DILAGOK

Handmade cord couture. Next.js atelier storefront.

- Locales: `en` `ar` `fr` `de` (`/en`, `/ar`, …)
- Signature hero: `/en?play=1` auto-scrolls the knotting scene for social capture
- Stripe checkout when `STRIPE_SECRET_KEY` is set
- Ayrshare publish: `/en/admin/publish` with `ADMIN_SECRET` + `AYRSHARE_API_KEY`

```bash
npm install
cp env.example .env.local
npm run dev
```
