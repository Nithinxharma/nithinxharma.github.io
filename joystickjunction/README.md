# JoystickJunction — GitHub Pages-ready static website

This version is built for GitHub Pages: plain HTML, CSS and JavaScript. It does not require Node.js, a build step, or a backend.

## Included
- Premium responsive gaming storefront UI
- PS5 rental pricing: ₹700/day
- Extra controller: ₹200/day
- Duration selector: 1, 2, 5 and 30 days
- Sample game catalogue with category filters and search
- Add-to-setup drawer and live estimate calculator
- Booking enquiry modal with date, time slot, address and payment preference
- WhatsApp prefilled booking enquiry
- Stores local enquiry copies in the browser's localStorage
- FAQ, mobile navigation and responsive layout

## Configure WhatsApp
Open `app.js` and set:
`whatsappNumber: "91XXXXXXXXXX"`
Use country code + number, digits only. Example format: `919876543210`.

If left blank, WhatsApp opens a share/chat chooser with the prefilled message.

## Deploy under your existing GitHub Pages repository
Copy the contents of this folder into a subfolder named `joystickjunction` in your existing `Nithinxharma.github.io` repository. Then open:
`https://nithinxharma.github.io/joystickjunction/`

## Important limitations
This is a functional static lead-generation website, not a true backend booking/payment platform. It cannot reserve inventory, securely collect payments, confirm stock, or show an admin dashboard across devices. Online payment is a preference captured in the enquiry; no payment is charged. Add a backend (e.g. Supabase + server hosting + Razorpay) before accepting real online payments or claiming bookings are confirmed.

The game covers are CSS-designed placeholders and titles are illustrative. Replace them with owned/licensed product artwork and actual inventory. The supplied logo artwork is included as a visual reference; the header uses a custom minimal JJ monogram.
