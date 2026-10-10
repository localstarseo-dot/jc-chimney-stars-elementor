# Local service overview pages

`chimney-services.html` and `fireplace-services.html` follow the roofing page layout with the approved homepage black/red palette. Each reuses the global navigation, offer bar, sticky lead form, three-second popup, footer, and bottom CTA. Local overview links are available in the navigation dropdowns on all four pages.

Hero photographs fade every 3000ms using the shared homepage slideshow. The gallery advances every 2000ms, right to left, with a shuffled sequence on reload. Photographs come from the existing packaged local technician collection, selected for chimney or fireplace work. The hero badges remain company-level trust assets.

Each page has four service cards, reviews, gallery, four-step process, two service-detail sections, service inventory, FAQs, service areas, contact form, and map. The former roofing counter row uses service highlights on these pages, with no invented service-specific statistics.

Content is local draft copy. No new price, warranty duration, or service certification is asserted. Forms remain non-delivering previews and the sticky bottom booking button remains unlinked. Duct Services has not been built in this task.

Validate each page with `node scripts/validate.mjs <page>.html`. Shared HTML is mirrored across pages; future global changes must be applied to all pages. CSS and JavaScript are shared. Map local assets to Media Library URLs and verify the forms and globals separately during Elementor migration.
