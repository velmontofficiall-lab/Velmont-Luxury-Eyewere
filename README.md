# VELMONT — Custom-coded storefront

A responsive, static e-commerce starter website for Velmont. It includes:
- Responsive home page and collection sections
- Product catalogue with category filters and search
- Add-to-bag, quantity controls and local browser cart persistence
- WhatsApp order handoff (requires your number)
- Instagram links (verify your handle)
- No backend, paid hosting, database or payment gateway required for this starter version

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For best testing, run a local static server from this folder:
   `python -m http.server 8000`
4. Visit `http://localhost:8000`.

## Before publishing — required edits
Open `script.js` and update:
- `whatsappNumber`: your WhatsApp number with country code, digits only (India example format: 91 followed by 10 digits).
- `instagramUrl`: confirm the correct Velmont Instagram profile.
- `products`: replace all sample product names, descriptions, images, categories and prices with your real catalogue.

The current product photos are externally hosted Unsplash sample images. Replace them with your own product photos for a real store. Prices are illustrative placeholders, not quotes.

## Publish free
A simple option is GitHub Pages:
1. Create/sign in to a GitHub account.
2. Create a public repository, e.g. `velmont-store`.
3. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
4. Open repository Settings → Pages.
5. Under Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, then Save.
6. GitHub will provide a public `github.io` URL after deployment.

You can also use Netlify Drop by uploading the extracted site folder at https://app.netlify.com/drop.

## Important launch checklist
- Confirm you have the right to sell every item and use every product image/brand asset.
- Do not make unverified claims about authenticity, materials, warranty, UV protection or product performance.
- Add accurate shipping, return/refund, privacy and terms policies.
- Test the WhatsApp order flow on a phone.
- This starter site does not collect card payments, calculate shipping, reserve stock, send order confirmations, or provide an admin dashboard. Confirm every order manually.
- Check applicable Indian tax, consumer and e-commerce requirements before launch.

## Catalogue note
This starter build includes Sunglasses, Watches, Shoes and Gadgets. Add only products you are legally permitted to sell and can accurately describe.
