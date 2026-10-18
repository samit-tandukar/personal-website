# Samit Tandukar — personal website

A responsive, dependency-free professional portfolio for [samittandukar.com](https://samittandukar.com).

## Structure

- `index.html`: accessible page content and Person/ProfilePage structured data.
- `assets/css/style.css`: responsive styling and reduced-motion support.
- `assets/images/profile.jpg`: original portrait, used visibly and as the preferred search/social image.
- `robots.txt` and `sitemap.xml`: crawler discovery and canonical URLs.

## Development and deployment

Serve the repository root with any static server. No installation or build step is required. Retain the existing hosting integration and deploy the root directory. The canonical domain is `https://samittandukar.com/`; do not publish this version on a different production domain without updating its URLs.

## Content verification

The public LinkedIn page exposes only partial information. Confirm the About text, project descriptions and career summary against the latest LinkedIn export before merging. Exact previous employment dates and unverified performance metrics are intentionally omitted. Time-limited credentials are linked to LinkedIn for current status rather than presented as active certifications.

## Search image follow-up

The portrait is an HTML image with an accessible description. Open Graph, Twitter metadata, ProfilePage.primaryImageOfPage and Person.image identify it as the preferred image. Test the live canonical page and image after deployment, submit `sitemap.xml` in Google Search Console and request indexing for the homepage. Google selects thumbnails automatically; metadata cannot guarantee a particular image or an update date.

## Verification limits

Check the design in desktop and mobile browsers before merging. Automated structural checks do not measure visual layout, Core Web Vitals or Google's eventual search presentation.

© 2026 Samit Tandukar. All rights reserved.
