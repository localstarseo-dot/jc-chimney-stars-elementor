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

## Hero slideshow

The hero cycles through rooftop repair, fireplace service, inspection consultation, crown repair, and the team photo. Reproduce that sequence in the Elementor background slideshow with a 3000ms interval and a 900ms fade. Keep the dark overlay and copy fixed. The local slideshow decodes the next photo before display, includes a pause/play control, pauses offscreen or in a hidden tab, and starts paused when reduced motion is requested.

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
| Current revision pushed to GitHub | Not performed |
| Elementor recreation | Not started |
| WordPress form/CRM delivery | Not connected |
| Tracking and schema QA | Not started |
| Live publication and production measurement | Not started |
