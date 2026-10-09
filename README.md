# jc-chimney-stars-elementor

Local source and GitHub review workspace for the Elementor-compatible Chimney Star redesign.

## Current deliverable

The repository contains the first homepage mock. It keeps the live site's recognizable conversion journey while improving hierarchy, spacing, mobile behavior, service organization, trust presentation, and maintainability.

The mock uses:

- approved local Chimney Star logos, trust marks, icons, team photography, and project images;
- separate global, component, and responsive stylesheets;
- minimal JavaScript for the accessible mobile navigation;
- verified existing service and location URLs;
- concise Elementor build comments plus a separate handoff map;
- `noindex, nofollow` because this is a design-review environment.

## Files

```text
index.html
assets/
  css/
    global.css
    components.css
    responsive.css
  js/
    main.js
  brand/
  icons/
  photos/
docs/
  ELEMENTOR-HANDOFF.md
qa/
  home-desktop.png
  home-mobile.png
scripts/
  validate.mjs
```

## Preview and validation

Requires Node.js 20 or newer for validation. The site itself has no build or package-install step.

```sh
npm run validate
npm run preview
```

Open `http://127.0.0.1:8767/` after starting the preview server.

## Status boundary

This homepage is built locally for design review. It has not yet been approved, recreated in Elementor, connected to WordPress forms or CRM delivery, instrumented for conversion tracking, or measured in production.
