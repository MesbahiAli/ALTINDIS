# ALTINDIS deployment

## Hosting and domain

Vercel is used only to show the client a preview. Leave `SITE_STAGE=preview` there; previews are marked noindex and blocked in robots.txt, including deployments that Vercel calls “production”.

The client’s final hosting must support a long-running Node.js application, Next.js, HTTPS and outbound SMTP on 465 or 587. This source is not a PHP application and cannot be uploaded into a PHP-only `public_html` directory and run as-is.

On compatible hosting:

1. Upload the source files, `public`, `package.json`, `package-lock.json`, Next.js/TypeScript config and these instructions. Exclude `.git`, `.next`, `node_modules`, `tmp`, `artifacts`, reference folders and all real `.env` files.
2. Configure the environment using `.env.example`. Set `SITE_STAGE=production` and `SITE_URL` to the final HTTPS origin, without a path. Also configure the client’s SMTP mailbox and Turnstile widget.
3. Run `npm ci`, `npm test`, `npm run build`, then `npm run start` (or use the hosting panel’s Node application manager with `npm run start` as the startup command). Set `PORT` if required by the hosting provider.
4. Keep the Node process running with the hosting provider’s process manager and route the HTTPS domain to it through the provider’s reverse proxy. Environment values must be present during the build and at runtime.

Public production builds fail if `SITE_URL` is missing. If the client’s plan supports only PHP/static files, confirm that before delivery: either upgrade to Node hosting or prepare a static-export version with a separately secured PHP/form-service endpoint. The current API and dynamic image optimisation cannot run on PHP-only hosting.

## Forms

The server endpoint is `/api/enquiry`. Direct delivery needs all variables listed in `.env.example`: SMTP host, port (465 or 587), username, password, sender and recipient, plus Cloudflare Turnstile site and secret keys. Use the email provider’s authenticated sender, and configure SPF/DKIM according to that provider. Set credentials privately in the hosting environment; never paste or commit them.

Create a Turnstile widget for the final domain. The endpoint verifies tokens server-side, including the expected hostname and action. SMTP uses implicit TLS on 465 or mandatory STARTTLS on 587. The API accepts only same-origin requests, validates fields and PDF signatures, limits CVs to 2 MB and total bodies to 3 MB, and applies a honeypot and a best-effort per-instance request limit when a trusted client IP is available. On the client’s hosting, set `TRUST_PROXY=1` only if its reverse proxy overwrites `X-Forwarded-For` with the real client IP. Otherwise the IP limiter is disabled and mandatory Turnstile verification remains active. For strict global quotas, use a persistent distributed rate limiter or hosting firewall rule; the in-memory limit does not span processes.

Without complete configuration, the existing email-draft flow stays available and the API returns 503. Secrets never reach the browser. Restart/redeploy after changing configuration because form availability is rendered at build time.

## Verification before public launch

1. Run `npm test`, `npm run typecheck`, `npm audit --registry=https://registry.npmjs.org`, and `npm run build`.
2. Confirm every French/English route, the language dropdown (mouse, keyboard and touch), sitemap, canonical/alternate tags, favicon and social image.
3. With the real credentials configured, send one approved test contact and CV submission. Confirm inbox delivery, attachment, Reply-To and mobile success/failure feedback. Do not assume acceptance by SMTP guarantees inbox delivery.
4. Ask ALTINDIS to confirm the contact details, rights to publish customer logos and supplied images, both language versions, mailbox retention and the privacy notice. These business approvals cannot be inferred from the source code.
5. Test on a real phone and review Lighthouse accessibility/performance on the hosted deployment. No public chatbot route is included.

The website has no form database or automatic email replies. Submitted information is sent only to the configured mailbox. SMTP failure, unavailable configuration or rejected spam verification never produces a success response. Do not log message bodies, CVs or credentials.
