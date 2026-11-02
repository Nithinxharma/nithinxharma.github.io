# JoystickJunction — Full-stack starter

Premium PS5 console and game rental + permanent game sales platform, designed for Jaipur.

## Included
- Premium dark storefront and navigation
- Catalogue starter page
- Rental enquiry form with 1 / 2 / 5 / 30 day options
- Current known base pricing: PS5 ₹700/day; extra controller ₹200/day
- Admin dashboard shell
- Supabase schema for products, inventory, bookings, booking items, leads, profiles and analytics events
- Server-side availability endpoint
- Booking creation endpoint with COD and Razorpay order creation paths
- Razorpay webhook signature verification
- Environment variable template and deployment notes

## Important implementation status
This is a **working project scaffold, not a production-ready live store**. Do not accept customer payments or claim a booking is confirmed until the remaining production work is completed:
1. Add Supabase project credentials and run `supabase/schema.sql`.
2. Implement Supabase Auth, admin role verification and protected admin routes.
3. Add robust inventory locking/transactional booking creation to prevent double booking.
4. Add the Razorpay Checkout client-side confirmation flow, verify payment signatures server-side, and test webhook retries/idempotency.
5. Add lead creation and analytics event endpoints, dashboards and reporting queries.
6. Add product CRUD, images/storage, game-specific pricing, sale cart, order fulfilment and stock adjustments.
7. Add delivery fees, security deposit, late return, cancellation, damage/loss and ID-verification policies.
8. Confirm exact game library, included games, sale prices, service PIN codes and delivery time windows.
9. Add rate limiting, CAPTCHA/anti-spam, privacy policy, terms, backups and monitoring.
10. Test mobile checkout and all payment states in Razorpay test mode before going live.

The current booking page is a front-end form preview. The API endpoints are starter implementations and must be hardened before launch. Admin page is not yet authenticated. The public site should not expose `/admin` until auth and authorization are implemented.

## Local setup
- Node.js 20+
- `npm install`
- Copy `.env.example` to `.env.local` and fill credentials
- `npm run dev`

## Deployment
Deploy this project separately from the existing personal portfolio. For a subpath deployment such as `/playslot/`, configure Next.js `basePath` and `assetPrefix` before building. Recommended: use a dedicated subdomain or domain for production to simplify routing and checkout redirects.

## Payments
Razorpay keys are server-side. Never put `RAZORPAY_KEY_SECRET`, `SUPABASE_SERVICE_ROLE_KEY` or webhook secrets in browser code or public repositories. COD bookings remain pending until manually confirmed.

## Brand assets
The included visual identity is an initial text-and-icon implementation based on the minimal JoystickJunction direction. Replace the icon with the approved standalone logo artwork and export SVG/PNG variants for header, favicon and social sharing.
