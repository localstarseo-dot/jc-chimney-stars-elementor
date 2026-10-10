# Elementor handoff map

This local homepage is the source-of-truth duplicate for design review. It is not yet an Elementor template or a live WordPress implementation.

## Global system

- Baseline: Hello Elementor child theme, Elementor and Elementor Pro.
- Content width: `1140px`.
- Tablet breakpoint: through `1024px`.
- Mobile breakpoint: through `767px`.
- Core colors: primary red `#A90100`, bright CTA red `#C40000`, dark navy `#1C1E3D`, warm white `#F8F3EF`, black `#050505`, muted gold `#A99767`.
- Typography: Poppins for primary UI and headings; Bangers only for the live-style action/contact display headings.
- Theme Builder owns the header and footer. The page template owns the content sections.
- Add the existing `.cs-*` classes through each Container or widget’s Advanced settings.
- Keep one shared CSS layer. Do not paste the entire stylesheet into multiple HTML widgets.
- Use native Elementor widgets for headings, text, images, buttons, icon lists, Forms, Accordions, and Nav Menu.

## Duplicate section map

| Live duplicate section | Elementor structure | Primary widgets | Responsive behavior |
| --- | --- | --- | --- |
| Header | Theme Builder header with inner horizontal Container | Image, Nav Menu, Button | Desktop nav; Elementor drawer/mobile menu at 1024px |
| Review bar | Full-width Container below nav | Text and star icon row | Wraps into two lines on narrow screens |
| Hero | Full-width Container with five local background photos and a fixed overlay | Background slideshow, Heading, Text, Icon List, Button | 3000ms rotation, 900ms fade; background repositions on mobile |
| Help selector | Narrow inner Container | Form Select and Button | Single column at all sizes |
| Stats | Four equal child Containers | Icon, Counter, Heading | Four/two/one columns |
| Service cards | Eight repeated child Containers | Icon Box | Four/two/one columns |
| Reviews | Summary Container plus three cards | Rating, Text, Heading | Four-part desktop layout; stacked mobile |
| Team gallery | Four image Containers | Image | Four/two/one columns |
| Service process | Four repeated child Containers | Icon Box | Four/two/one columns |
| Cleaning feature | Two-column Container | Image, Heading, Text, Button | Stacks image before copy |
| Inspection feature | Two-column dark Container | Heading, Text, Button, Image | Stacks image before copy |
| Service inventories | Two headings plus Icon List grids | Heading, Icon List | Three/four columns; one column mobile |
| FAQs | Nested Accordion in two columns | Accordion | Two columns desktop; one column mobile |
| Service areas | Centered heading and three-column Icon List | Heading, Icon List | Three/two/one columns |
| Contact | Two-column Container | Elementor Form, Text, Icon List, Button | Stacked mobile |
| Footer | Theme Builder footer | Image, Text, Icon Lists | Four/two/one columns |

## Navigation behavior

The supplied navigation interactions are adapted to the existing black/red header, Poppins typography, monochrome logo and booking CTA. Chimney, fireplace, and duct menus use native details/summary disclosures with one open at a time, outside-click dismissal, and Escape dismissal with focus restoration. At 1024px and below, the full-width mobile panel starts below the complete header, scrolls independently, locks background scrolling, focuses its first item, and contains keyboard focus. Breakpoint changes reset the menu; resizing within mobile keeps an open menu open. Existing production destinations are retained, with additional submenu destinations taken from the supplied code; destination availability requires separate production-link QA.

## Offer bar, popup, and sticky quick form

The supplied lead components are implemented in `assets/css/lead-offer.css` and `assets/js/lead-offer.js`, separate from navigation. The red top offer bar stays visible while scrolling. Its 59-minute display timer shares one stored expiry with the popup, survives reloads, and renews after expiry. This is a client-side preview timer, not a server-enforced offer deadline; confirm the 25% discount and actual offer terms before production.

The popup opens from the offer bar or automatically three seconds after initialization on every visit or reload, including back-forward cache returns. There is no once-per-session suppression. Closing by button, backdrop, or Escape restores focus. Keyboard focus stays in the dialog; background content is inert and scrolling is locked while it is open. The black quick-form strip appears after scrolling 300px, directly below the offer bar. It is hidden while the mobile menu or popup is open. Name, phone, and service address pass into the popup in memory only. Submitting the popup shows preview confirmation and clears the fields; no request, email, CRM delivery, or personal-data storage occurs.

For Elementor, install the offer components once in the global header/template, enqueue the separate lead stylesheet and script once, and replace preview forms with the approved Elementor/Forminator lead flow. Recheck mobile menu positioning, WordPress admin-bar offsets, consent, offer eligibility, notification/CRM routing, and real success tracking. The static popup is not an exported native Elementor template.

## Hero slideshow behavior

The hero now includes the supplied four local credential badges, Google/Yelp review artwork, and Visa/Mastercard/American Express/Discover logos. The trust row has a transparent background with 16px between individual badges/review marks and 24px between groups, as requested. Review marks link to the existing review section and the Yelp destination from the local source. The booking CTA retains the production booking URL; the call CTA uses `tel:+15125012755`. Artwork is staged from local files, not evidence of current credential status, review-platform rating, or payment acceptance; confirm these before production. Six newly copied asset sources and hashes are recorded in `asset-manifest.json` under `hero_trust_assets`.

The desktop hero height target is approximately 70% of its previous minimum; tablet/mobile minimums are 546px/504px. Spacing is tightened and mobile CTAs stack. Height remains content-driven when necessary so badges, copy, and buttons are not clipped on smaller screens. Desktop measured height changed from 1226px to approximately 858px at the same viewport. Mobile runtime verification remains pending.

The hero cycles through rooftop repair, fireplace service, inspection consultation, crown repair, and the team photo. Reproduce that sequence in the Elementor background slideshow with a 3000ms interval and a 900ms fade. Keep the dark overlay and copy fixed. The local slideshow decodes the next photo before display, runs without a visible playback control, pauses offscreen or in a hidden tab, and remains static when reduced motion is requested.

## Technician photo carousel

The Watch Our Team in Action gallery contains all 26 visually inspected technician images from the local Black Uniform collection, using the already optimized WebP copies. Empty fireplace/before-and-after-only images are excluded. `assets/js/gallery-carousel.js` advances one image right-to-left every 2000ms with a 650ms slide and seamless wraparound; there are no pause or arrow buttons. Four photos show on desktop, two on tablet, and one on mobile. Incoming images decode before advancing; animation suspends offscreen/in hidden tabs. Reduced-motion mode uses a manually scrollable static gallery. Copy this as an Elementor carousel with the same image sequence/timing, or enqueue the scoped static implementation once. Local asset hashes are listed under `technician_gallery_assets` in `asset-manifest.json`.

## Form implementation boundary

The local service selector and contact form intentionally do not transmit data. During WordPress migration:

1. Rebuild both with the approved Elementor Form or Workiz workflow.
2. Confirm recipients, CRM routing, required fields, consent text, reCAPTCHA, success/error states, and spam handling.
3. Test delivery end-to-end with a controlled submission.
4. Add conversion tracking only after the real success event is known.

## Content requiring client confirmation

The duplicate reflects values currently displayed on the live homepage. Before publication, confirm:

- 19+ years language;
- 619+ review total and review-source presentation;
- 831 inspections, 3,894 fires prevented, 1,478 sweeps, and 874 repairs;
- certification, insurance, guarantee, and annual-service wording;
- offer terms;
- business hours;
- Pflugerville and Central Austin addresses;
- complete service-area coverage.

## Release boundary

| Stage | Status |
| --- | --- |
| Local duplicate | Built |
| Local responsive and interaction QA | Passed |
| Current revision pushed to GitHub | Pushed to main |
| Elementor recreation | Not started |
| WordPress form/CRM delivery | Not connected |
| Tracking and schema QA | Not started |
| Live publication and production measurement | Not started |
