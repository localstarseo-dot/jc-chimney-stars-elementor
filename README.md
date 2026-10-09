# jc-chimney-stars-elementor

Local source and GitHub Pages review workspace for the new Chimney Star design aligned with the current Elementor website. It starts from the same approved local homepage files and packaged assets while keeping this redesign isolated from the existing repositories.

## Upload and publish

1. Use the GitHub repository named `jc-chimney-stars-elementor`.
2. Upload the **contents of this folder** to the repository root. `index.html` and `assets/` must stay beside each other. If using the ZIP, extract it first; uploading only the ZIP will not publish the page.
3. In the repository, open **Settings → Pages**. Select **Deploy from a branch**, then choose **main** and **/ (root)** and save.
4. Open the published URL shown by GitHub Pages after deployment finishes.

No build command, Node installation, WordPress installation, or API key is required.

Reference: [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Included

- `index.html`: complete homepage with its original CSS and JavaScript embedded.
- `assets/brand/`: required logos, trust badges, footer marks, and decorative brand mask.
- `assets/photos/`: required photographs, sized and compressed for web delivery.
- `assets/icons/`: required navigation and service artwork.
- `asset-manifest.json`: original-to-packaged image mapping and file sizes.
- `qa-report.json`: local browser and asset verification results.
- `.nojekyll`: tells GitHub Pages to serve the package as static files.

The package uses portable, lowercase filenames and relative asset paths so it works under a repository URL. Source artwork, source HTML, and approved component files were not overwritten. Future Elementor-aligned design work should be developed and reviewed here without changing the existing Chimney Star repositories.

## Preview locally

Open `index.html` in a browser. For the most accurate preview, serve this folder with any static server. If Python is installed, run `python3 -m http.server 8000` here and open `http://localhost:8000/`.

## Existing connections and content

Google Fonts and the Google Maps embed require an internet connection. All other images and brand assets are included locally. Home links stay in this preview; other navigation links open the original paths on `https://chimney-star.com/`. This package includes only the homepage, not the linked service, location, or company pages. Phone, email, social, and booking destinations come from the supplied page.

Existing copy, offers, ratings, pricing, and credential artwork are preserved from the supplied source. This packaging pass does not validate those business claims or the availability of every external destination. The preview includes `noindex, nofollow` to avoid indexing a duplicate of the business site. Remove that tag only if this becomes an approved production website.

Initial packaging checks on September 23 passed at 320, 390, 768, 1024, and 1440px: the original 43 assets and 40 image elements loaded, there was no horizontal page overflow, and the mobile/desktop menus, Escape key, sticky header, and FAQ controls worked. Google Maps loading was not fully validated at every viewport; it remains an external dependency.

September 28 timeline update: the moving outline star now uses the supplied official full-color star logo on a warm-white circular badge. The package now contains 44 image assets and 41 image elements. The updated badge was visually checked at 1440px and 390px, with working scroll progress, a loaded logo, no horizontal overflow, and clearance beside the mobile cards. Existing scroll logic and reduced-motion behavior are preserved. This revision is local and has not been uploaded to GitHub.

September 29 navigation update: removed the seven decorative icons beside Home, About, Services, Service Areas, Reviews, Blog, and Contact. Labels, dropdown arrows, links, the brand logo, and menu scripts are preserved. This revision is local and has not been uploaded to GitHub.

Status: built and locally QA-tested, ready for upload. Publishing to GitHub, conversion tracking, form delivery, and live performance measurement are separate steps.
