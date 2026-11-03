# Reframers

Website for Reframers creative thinking workshops in Melbourne.

## Hosting

Editable HTML, CSS, JavaScript, illustrations and PDFs are in `public/`.
Cloudflare Workers serves this folder using `wrangler.jsonc`. No build step is required.
Deploy command: `npx wrangler deploy`.
Connect the `main` branch in Cloudflare Workers Builds for automatic deployments.

## Current limitations

Registration, book waitlist and school enquiry forms are demonstration forms. They do not save or send information. MailerLite and confirmation emails must be connected before accepting registrations.
The privacy policy remains a draft. Preview search-indexing restrictions are retained until launch readiness is confirmed.

Imported from the approved Sites source commit `4b72d978b20f585f47cfaa58edec699bd4ae4e30`.
Reframers children’s creative thinking workshops website
