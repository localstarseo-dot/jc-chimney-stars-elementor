# jc-chimney-stars-elementor

Local source and design-review workspace for the Elementor-compatible Chimney Star homepage duplicate.

## Current deliverable

The repository contains a faithful local mock of the current live homepage shown in the supplied screenshots. It preserves the live section order, black/red visual direction, conversion flow, long-form service coverage, FAQ set, service-area list, contact block, and footer structure.

The duplicate uses:

- approved local Chimney Star logos, icons, team photography, and project images where the live media was unavailable;
- the live Elementor content width and responsive breakpoints;
- separate global, component, and responsive stylesheets;
- semantic, accessible HTML with one H1;
- minimal JavaScript for the mobile menu and clearly labeled local-only form previews;
- current working Chimney Star URLs;
- an Elementor handoff map for rebuilding the duplicate with native Containers and widgets;
- `noindex, nofollow` because this is a local design-review environment.

## Homepage coverage

1. Black primary header and red review bar
2. Full-bleed service hero
3. “I Need Help With…” service selector
4. Four live-site stat blocks
5. Eight service cards
6. Customer review cards
7. Team action gallery and four-step process
8. Chimney cleaning content panel
9. Chimney inspection content panel
10. Complete chimney, fireplace, air duct, and dryer vent inventories
11. Twelve FAQs and 29 service areas
12. Contact preview and complete business footer

## Preview and validation

The static site has no build step.

```sh
npm run validate
npm run preview
```

Open `http://127.0.0.1:8767/`.

Desktop and mobile QA screenshots are stored in `qa/`. The machine-readable results are in `qa-report.json`.

## Status boundary

The live-style homepage duplicate is built, committed, and QA-tested locally. It has not been pushed for this revision, recreated in Elementor, connected to WordPress forms or CRM delivery, instrumented for conversion tracking, published to the live site, or measured in production.
