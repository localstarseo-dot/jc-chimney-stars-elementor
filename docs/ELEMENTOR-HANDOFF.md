# Elementor handoff map

This local homepage is a static design-review source. It is not yet an Elementor template or a live WordPress implementation.

## Global system

- Compatibility baseline verified from the live site: Hello Elementor child theme, Elementor and Elementor Pro, a 1140px content container, tablet through 1024px, and mobile through 767px.
- Match the live Elementor palette: primary red `#A90100`, dark navy `#1C1E3D`, warm white `#F8F3EF`, muted gold `#A99767`, body text `#333333`, and page background `#FBFBFB`.
- Set the global colors from `assets/css/global.css` in Elementor Site Settings.
- Use Manrope for headings and Inter for body/UI text.
- Use Theme Builder templates for the header, footer, and pre-footer CTA.
- Assign the existing `.cs-*` classes through each Container or widget's Advanced settings.
- Keep one global CSS layer. Do not paste the full stylesheet into individual HTML widgets.
- Use native Elementor widgets for headings, text, images, buttons, icon lists, accordions, and navigation.
- Keep the four Theme Builder areas identified in the mock: `header`, `content`, `pre-footer-cta`, and `footer`.
- Keep the primary desktop navigation aligned to the live Elementor header areas: About Us, Roofing Services, Chimney Services, Fireplace Services, and Duct Services, followed by the booking CTA. Secondary destinations remain in the footer or relevant page sections.

## Section map

| Mock section | Elementor structure | Widgets | Responsive behavior | Custom code |
| --- | --- | --- | --- | --- |
| Utility and header | Theme Builder header with two parent Containers | Image, Nav Menu, Buttons, Text | Desktop horizontal; mobile drawer | Small mobile-menu script only if Elementor Nav Menu does not cover the approved behavior |
| Hero | Parent Container, two inner Containers | Heading, Text, Buttons, Icon List, Image | 55/45 desktop; stacked mobile | Blueprint grid and image-frame CSS |
| Help panel | Inner Container with four child Containers | Heading, Icon Box or CTA | Four/two/one columns | None |
| Trust strip | Full-width Container | Images and Text | Horizontal, wrapping on mobile | None |
| Services | Loop Grid or repeated card Containers | Image, Icon, Heading, Text, Button | Four/two/one columns | Card classes only |
| Knowledge | Two-column Container | Image, Heading, Text, Icon List | Two columns, then stack | Blueprint background only |
| Process | Repeated child Containers | Icon Box | Four/two/one columns | Dashed connector is optional CSS |
| Projects | Loop Grid | Featured Image, taxonomy/text | Asymmetric desktop, stacked mobile | Grid classes only |
| Reviews | Loop Grid or Loop Carousel | Rating, Text, Name | Three/one columns | Use verified review data only |
| FAQ | Two-column Container with Nested Accordion | Heading, Text, Accordion | Two columns, then stack | None |
| Service areas | Parent Container plus location Loop Grid | Heading, Text, Loop Grid, CTA | Two columns, then stack | None |
| CTA and footer | Theme Builder template parts | Heading, Buttons, Images, Lists | Horizontal to stacked | Roofline decoration only |

## WordPress dependencies to confirm

- Whether booking stays on the current `/book-online/` page or uses a Workiz embed.
- Whether review cards are maintained manually, through a plugin, or through a verified review data source.
- Whether services and locations will use Posts, Pages, or custom post types for Loop Grid templates.
- Final global header/footer approval before building Theme Builder templates.
- Current credentials, offer terms, review totals, business hours, addresses, and service coverage before publication.

## Release boundary

The local mock is built and responsive. Elementor recreation, WordPress forms, CRM delivery, tracking, schema ownership, live PageSpeed, and production QA remain separate stages.
