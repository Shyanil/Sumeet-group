Subject: Sumeet website — landing-page revisions and pre-launch teaser
To: [Design and development recipients to be confirmed]
Status: Draft — not sent

Hi team,

The approved home-2 design remains the basis for the main homepage. The revised local version makes the first screen more direct and introduces a separate, generic pre-launch teaser.

Implemented for review:
- Replaced the long, three-act hero with one offer and two visible actions: Download STC brochure and Book a site visit. The second label is provisional pending confirmation.
- Used a white primary hero button and charcoal supporting controls; removed the dark red header CTA treatment.
- Removed repeated statement/image bands to shorten the homepage.
- Added an early developer credibility strip using existing company and portfolio information.
- Replaced the static image marquee with a filterable gallery, full-screen image viewer, previous/next controls, keyboard navigation and focus return.
- Built a separate three-section teaser at the neutral /coming-soon route: launch announcement, introduction and registration. Its photographic direction uses clearly labelled AI concept imagery, with no project name, renders, location, pricing, floor plans or special project URL.
- Kept the teaser out of navigation and the sitemap, and marked it noindex. This is a public teaser, not access control for confidential content.
- Added a server endpoint for validated lead delivery. The UI only confirms success after the configured destination accepts the submission.
- Preserved Next.js, JavaScript and server-side rendering.

Decisions and launch dependencies:
1. Identify the confidential project and confirm the exact public disclosure boundary. The existing group homepage and public assets already contain project-specific information; their confidentiality needs a project-specific review before deployment.
2. Confirm whether Book a site visit or Request a callback should be the secondary homepage CTA.
3. Confirm the approved brochure for the intended campaign. The current download is the existing STC PDF; Urban Nest has no web-ready brochure configured. Confirm that the approved downloadable brochure does not expose floor plans intended to be gated.
4. Confirm the project before adding its master plan, connectivity and nearby destinations. Do not publish new project-specific facts while its launch status is unclear. Distances must be checked against approved material.
5. Floor-plan access must be implemented as a real server-controlled download after a successful lead action, with files outside public/. A form overlay or noindex is not sufficient. Existing floor-plan asset URLs have not yet been gated; this is outstanding pending the confidential-project decision.
6. Supply the approved CRM/form webhook and optional authentication token to activate registration. Until configured, forms show an honest unavailable message with a call option; no lead is claimed as saved.
7. Confirm recipient addresses for this consolidated update.

Validation: production build passed; seven lead endpoint tests passed; desktop, 390px and 320px browser checks passed for SSR, teaser disclosure, gallery keyboard/focus controls, and the unavailable-registration state. No hydration errors or horizontal overflow were detected.

Nothing has been deployed or emailed. Please use this list as the shared design/development revision record.
