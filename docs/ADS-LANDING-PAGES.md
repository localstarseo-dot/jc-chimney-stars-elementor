# Chimney Star Ads landing-page mockups

## Source and paths

- /lp-1/: Chimney Repair
- /lp-2/: Chimney Cleaning
- /lp-3/: Chimney Inspection

One repository, independent service intent, shared Ads components. General website pages are unchanged.

Editable copy: src/ads/pages.mjs. Shared markup: scripts/build-ads-pages.mjs. Styles and interactions: assets/css/ads-pages.css and assets/js/ads-pages.js. The three folder index.html files are generated static delivery files.

Run: node scripts/build-ads-pages.mjs, then node scripts/validate-ads.mjs. Keep editable source and generated pages together in any authorized future commit.

## Asset inventory and provenance

Existing technician photos, logos, icons, badges, and payment marks are reused from this client, not Santa. Optimized copies of designated raw before/after files live in assets/photos/ads; manifest.json records their original sources and dimensions. scripts/prepare-ads-assets.cjs prepares them with Sharp (ADS_SHARP_PATH can point to an installed Sharp module).

LP1: supplied crown, flashing, and masonry before/after pairs. LP2: supplied sweep and blockage pairs, plus an equipment-preparation photo. The designated source is now the client library at ../assets/Before And After, visually checked against the matching pairs. LP3: individual fireplace-assessment, consultation, and results-discussion photos. No inspection before/after transformation is invented. Visual pairing does not establish that these are documented completed customer jobs; confirm provenance before using them as production case-study evidence.

Not found: approved customer-avatar photos and an approved direct Google review-listing URL. Review cards use text initials, not fabricated reviewer photos. Hero Google mark links to the in-page customer reviews. JC requested the review-section action use Google instead of Yelp; it now opens a Google Maps business search for Chimney Star as a fallback. Supply the exact GBP review destination before launch. Existing Yelp marks in the hero and approved global footer remain unchanged.

## Copy and offer boundaries

The local draft retains the company-level 5.0 rating and 619+ reviews from the approved website. These are not service-specific review figures and need current factual approval before Ads launch. JC subsequently supplied the global dark stats strip to replace Why Chimney Star: 831 Inspections, 3,894 Fires Prevented, 1,478 Chimney Sweeps, and 874 Chimney Repairs. These exact supplied figures are mockup references, not independently verified outcomes. In particular, the causal Fires Prevented claim requires substantiation before an Ads launch. Customer excerpts were supplied by JC in the About Us content and are labeled company-wide feedback; no invented review dates or profile pictures.

Current client-supplied offers are "10% Off Repairs", "$20 Off Your First Chimney Sweep", and "$25 Off Your First Chimney Inspection". Each LP renders only its designated offer and claim label. The existing client-requested resetting countdown is a preview mock, not a genuine deadline; replace it with approved factual terms/deadline or remove it before Ads launch. Confirm payment-acceptance statements and credential/insurance scope before production use.

## Contact and integration

Primary action: ../book-online/ with the user-supplied Workiz embed. Secondary action: tel:+15125012755. The local booking destination is first-time-customer-only; returning customers are directed to call. No booking was submitted during QA.

JC requested removal of the final enquiry/booking panel and FAQ section. Neither is rendered on the LPs now. There is no simulated submission-success state and no plugin/CRM form ID or delivery destination was supplied. Booking and call actions retain their existing destinations; claim-section and fixed offer-text links open the offer dialog. The later approved popout addition includes a three-second invitation and exit/internal-navigation interception, with booking/call bypass and a continue-page action. No voucher is issued, and no promotion is transmitted to Workiz by this static preview.

Missing before launch: native form plugin/IDs and routing owner, consent wording, verified policy/terms URLs, actual offer conditions, service proof approval, review-source verification, conversion IDs/events and consent configuration. Existing Privacy Policy URL is retained from the site, not independently certified as launch-approved.

## Gutenberg mapping

Top offer, focused nav, hero, concerns, Our Work, experience, reviews, process, service list, FAQs, booking, and footer map to scoped Groups/Columns, Heading, Paragraph, Image, Buttons, and Details blocks or scoped Custom HTML when needed. Comparisons retain a native range control with unique labels. Install the Ads styles/controller once. Use real Shortcode blocks for the eventual native plugin form, not shortcode text in HTML.

Keep /lp-1/, /lp-2/, /lp-3/ as separate destinations. Maps embeds and existing website popup controllers are intentionally excluded.

JC subsequently requested the full global navigation and review top bar on all LPs. These replace the focused Ads navigation and service offer strip. The builder extracts the exact approved header/review strip from the homepage, fixes relative destinations for LP folders, and generates assets/css/ads-global-header.css from the shared header, button, and responsive styles. The existing main.js controls mobile menu and disclosures; website popout controllers are not included. This explicitly approved navigation override preserves separate service-intent content. Rebuild LPs after global header/top-bar changes.

Global-navigation regression checks covered widths 320, 390, 768, 1024, 1100, 1200, and 1440px. The site's small-mobile logo/menu-label rules were included to preserve its 320px behavior. No document overflow remained; mobile menu opening, child-service links, and Escape dismissal passed on all three LPs. Header and review-strip markup also match the normalized homepage source through validate-ads.mjs.

The user requested the approved global website footer on all LPs. The Ads builder extracts that footer from the homepage and adjusts its relative links for the LP folders. assets/css/ads-global-footer.css is generated from the corresponding global component styles, with the existing footer breakpoints and tokens. Footer content, hours, monochrome trust/review assets, full-color payments, social icons, and service links remain intact. Rebuild the LPs after future global-footer changes.

## Readiness

This package is a static review build prepared for authorized GitHub Pages staging. Preview URLs: https://localstarseo-dot.github.io/jc-chimney-stars-elementor/lp-1/ (repair), /lp-2/ (sweep), and /lp-3/ (inspection). Verify the deployment revision and served contents after pushing before reporting publication. Native Gutenberg implementation, booking completion, Ads/analytics tracking, proof verification, genuine offer deadline, and production performance remain separate uncompleted gates. Structural/local browser checks and Pages publication are not evidence of conversion lift or paid-traffic launch readiness.

### Local checks, October 13, 2026

- Three pages passed the repository structural validator and Ads-specific asset/anchor/intent checks.
- Chromium viewport widths 320, 390, 640, 641, 768, 1023, 1024, and 1440: all 24 page-width cases had no document horizontal overflow; correct service H1 and booking target observed.
- All 68 image instances decoded without broken sources after loading below-fold images.
- All five comparison range controls changed the clipped photo via keyboard. Mouse drag checked on LP1 and LP2. These checks do not claim physical-device touch coverage.
- Offer dialog opening and Escape close checked on each page. FAQ anchor destinations stayed visible below the sticky header. No page errors observed.
- Local PerformanceObserver identified each hero image as the LCP candidate at 390px and 1440px. Images are discoverable in HTML and high-priority. This does not establish production CWV or a loading-speed improvement.
- No real form, call, or booking completion was exercised; no conversion tracking installed and no publication performed.

### Global footer and asset recheck

The assets-root Before And After library contains 40 photos forming 20 complete filename-matched pairs; none of the Before files is missing its After counterpart. The five selected repair/cleaning sets were visually inspected and optimized again from that source. Other service pairs remain unused because they do not match these three Ads intents.

All LPs now use the homepage global footer; exact normalized footer content is checked by validate-ads.mjs. Browser checks at 320, 390, 768, and 1440px passed with no document overflow. All referenced images decoded successfully. Booking and service links resolve relative to the repository root. Homepage/footer source files were not edited.

Latest narrow revision: removed the hero service-area line, FAQs, and final booking/enquiry sections from all three LPs. Structural checks passed after rebuilding, including no broken #booking anchors. Other sections, global components, and hero/sticky actions are unchanged.

JC's subsequent screenshot revision replaced What to expect and the smaller Relevant services block with the global Chimney & Fireplace / Air Duct & Dryer Vent directories, followed by Our Service Areas, directly after Google reviews. Directory/area markup comes from the homepage; assets/css/ads-global-directories.css is generated from its component styles. Checks at 320, 390, 768, and 1440px confirmed section order, 29 service-area entries, no removed process block, and no horizontal overflow on all LPs. Separate service-specific heroes, concern cards, and project photos remain intact.

The next approved revision replaces the concern/problem chooser on all three LPs with the homepage eight-card Professional Chimney, Air Duct & Roofing Services showcase. Markup and red-gradient/card styles come from the global source; LP folder links are adjusted and card images load lazily. Service-specific heroes and project evidence remain separate. The broader cards and their website destinations are an explicit client-directed departure from the initial focused Ads template.

Latest correction: keep the approved showcase design, but make its copy and the lower service directory specific to each LP. LP1 has eight repair categories; LP2 has four cleaning/assessment categories; LP3 has four inspection categories. Fewer cards are used where that avoids inventing services just to fill eight slots. Cards link to the page's own Our Work section; directory actions link to booking. Global navigation/footer, company-level statistics/reviews, and the service-area section remain as approved. Editable showcase titles, introductions, cards, and directory lists live in src/ads/pages.mjs.

Latest scoped exception: JC requested the lower service directory be general again. All LPs reuse the complete homepage Chimney & Fireplace and Air Duct & Dryer Vent lists there, followed by shared service areas. Only that directory is broadened; heroes, red showcase cards, and project evidence retain each LP's service intent.

Latest section-order revision: move the unchanged four-stat strip directly after the hero on all three LPs, before the red service showcase. The validator checks this placement and prevents duplicate statistics strips. No changes to the general website or supplied figures.

Latest approved addition: all LPs now reuse the homepage discount section immediately after Google reviews. The older small Ads offer dialog is replaced by the supplied voucher design and a separate leaving dialog. A dedicated Ads controller provides the three-second invitation, explicit claim clicks, internal page-switch interception, desktop exit intent after eight seconds, Escape/backdrop dismissal, and continued navigation. Booking, telephone, same-page anchors, downloads, modified clicks, and new-tab links bypass interception. Native dialogs provide focus containment and background inertness; no form or simulated voucher submission is included. Booking URLs stay relative to the repository root.

Both popouts share the existing 59-minute local-storage preview timer, rating, and red booking/white call actions. This is a client-requested mock of the website behavior, not evidence of a genuine expiring offer. Before Ads publication, replace the resetting timer with approved factual offer terms/deadline or remove it. The visible inline section retains the offer-mockup disclaimer. No main-site controller or general-page source was modified.

Latest replacement: remove the Professional service-card showcase from all three LPs. After hero and statistics, move the existing single discount section here, then add the approved Watch Our Team in Action red-to-black gallery and four-step service process. Gallery photos combine supplied company-team photos and each LP's relevant service photos; no unrelated duct/roofing imagery is inserted. The existing global carousel is reused with its reduced-motion fallback. LP1 process wording matches the repair screenshot; cleaning and inspection retain their specific process text from src/ads/pages.mjs. Our Work, reviews, lower general inventory, areas, footer, and both popouts remain unchanged.

Latest gallery correction: remove general team photos and the hero/work-derived fallback. Explicit visually reviewed service lists now live in src/ads/galleries.mjs: seven repair-work/repair-consultation photos for LP1, six sweep/cleaning/debris/blockage photos for LP2, and three chimney-inspection consultation/findings photos for LP3. Generic gear preparation, duct/vent inspection, laundry service, and group portraits are excluded. Cleaning gallery includes the supplied optimized sweep and blockage before/after assets with clear state labels in alt text; the separate matched Our Work comparisons remain intact. All originals are unique per gallery; carousel-only loop clones remain hidden from assistive technology. Existing local assets were sufficient; no new imagery was generated.

Offer copy supplied by JC on October 13, 2026: LP1 "$100 Off Repairs Over $1,000" / "Claim $100 Off"; LP2 "$20 Off Your First Chimney Sweep" / "Claim $20 Off"; LP3 "$25 Off Your First Chimney Inspection" / "Claim $25 Off". Store each offer once in src/ads/pages.mjs and render it in the inline voucher, fixed offer bar, offer popup, and leaving popup. Repair threshold and first-service qualifiers are repeated in each offer's supporting text; no unprovided first-time restriction is added to repair. Generic discount and mock-amount-approval wording is removed from these LP offers. Main website offers and the shared booking page are unchanged. Claim buttons navigate to booking or open the explicit offer popup, not issue a voucher or transmit a promotion to Workiz. Existing reset countdown remains a preview-only launch gap; provided amounts do not establish a genuine time limit.

Footer-gap correction: remove the wrapper's fixed 92px desktop/76px mobile bottom padding. Reserve the sticky action bar's measured height inside the black global footer instead, using ResizeObserver and 78px/72px no-JavaScript fallbacks plus safe-area padding. This removes the exposed light band while keeping copyright above the fixed buttons. Footer markup and general website pages are unchanged.

October 17 hero-only revision: remove the We Accept All Cards label and four payment-card logos from each LP hero. Keep all four existing trust badges, enlarged to 76px with 24px gaps on desktop, 64px with 18px gaps on mobile, and 56px with 16px gaps below 360px. Preserve intrinsic proportions using object-fit: contain; badges remain left-aligned on desktop and centered on mobile. Footer payment logos and all other website pages remain unchanged.

October 17 mobile review-strip revision: keep rating, five stars, and review count on one line below 768px. Visually shorten only the introductory Our Customers Rate Us and Based On phrases on mobile, preserving the full text for assistive technology and desktop. Mobile text is 10–12px and stars 14–17px with responsive gaps, rather than shrinking the entire original sentence below 8px. Scope this change to LP-generated header styles/markup, not the main website header source.

October 17 hero spacing revision: remove the small Local chimney service / Austin eyebrow from every LP hero on all devices. Keep the main service/location H1 unchanged. Reduce desktop vertical padding to 48–72px and mobile padding to 32px, with a 20px heading-to-intro gap and consistent review/badge/action spacing. No empty placeholder is retained for the removed eyebrow. Other section headings, offers, and general website heroes remain unchanged.

October 17 repair-offer revision: change LP1 from a fixed $100 discount to "10% Off Repairs Over $1,000" with "Claim 10% Off" across the inline section, sticky bar, and both popouts. Preserve the existing over-$1,000 threshold. LP2 and LP3 offers remain unchanged.

October 17 follow-up: JC removed the repair offer's over-$1,000 requirement. LP1 now reads "10% Off Repairs" / "Claim 10% Off", with supporting copy "Save 10% on chimney repairs." This supersedes the threshold above across all LP1 offer placements. LP2 and LP3 remain unchanged.
