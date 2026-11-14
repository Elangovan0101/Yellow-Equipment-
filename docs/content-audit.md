# Yellow Equipment Services: content audit and review list

Source audited: https://yellowequipmentoman.com/index.html and every page it links to (45 pages, no deeper nesting).
Every fact on the new internal pages comes from those pages or from the existing homepage copy. Nothing was taken from manufacturer websites.

## 1. Items for company review

Each item below needs a decision from Yellow Equipment before launch. The website currently shows the value in the "Shown now" column.

| # | Topic | Conflict or gap | Shown now | Where |
|---|---|---|---|---|
| 1 | Generator power range | Homepage and company page say **20–700 kVA**. The FPT-IVECO generator page says **30–720 kVA**. | 20–700 kVA on homepage and company page. 30–720 kVA on the generator page. | `/`, `/company`, `/products/fpt/power-generation` |
| 2 | Allison network size | Homepage says about **1,400** distributor and dealer locations. The Allison ReMan page says about **1,600** authorised distributors and dealers. | About 1,400 (Allison pages). The ReMan text omits the number. | `/products/allison`, `/parts/remanufactured` |
| 3 | FPT truck engine list | The original truck page lists **CURSOR 11** twice, with 302–419 kW the second time. The page text names the CURSOR 13 (12.9 L) as part of the family, so the duplicate was renamed **CURSOR 13**. | CURSOR 13, 302–419 kW | `/products/fpt/trucks` |
| 4 | Parts warranty wording | Original: "a period of warranty that is much longer and in-depth with the genuine brand". The meaning is unclear. | "All parts supplied by Yellow Equipment carry a period of warranty. We supply only authorised parts." | `/parts`, all parts pages, `/company#warranty` |
| 5 | Service descriptions | The original site lists six service **names** only, with no descriptions. The descriptions and bullet points come from the redesigned homepage copy. | Homepage copy | `/services/*` |
| 6 | Services 07 and 08 | "Engine Servicing" and "Transmission & Drivetrain Solutions" appear on the redesigned homepage but not in the original site's service list. | Shown as services 07 and 08 | `/services/engine-servicing`, `/services/transmission-drivetrain` |
| 7 | "Practices applied" per service | Each service page shows three of the eight company practices (from "Why you choose YES"). Which three is an editorial choice. | See `services[].practices` in `src/data/catalog/site.js` | `/services/*` |
| 8 | Allison Extended Coverage prices | The original page has about 30 tables of US-dollar Extended Coverage prices by vocation. The model each table belongs to is only in images, and the prices are likely US list prices that may be outdated. | **Not reproduced.** Coverage rules, the eligible series and the 5-year series are shown. | `/parts/transmission-parts#coverage` |
| 9 | FPT connected services availability | FPT lists MyFPT and Remote Assistance availability for Europe and the Americas, but not Oman or the GCC. | FPT's availability text, with a note that availability is set by FPT per country | `/products/fpt#connected` |
| 10 | FPT fluids by region | The FPT fluids list covers China, Korea, USA & Canada, and Europe/South America/Africa. The Middle East is not listed. | All four regions, plus "Ask our team which fluids are supplied in Oman" | `/parts/oils-coolants#fpt` |
| 11 | Other-equipment brand list | The original shows "Volvo JCB" on one line. | Split into **Volvo** and **JCB** | `/products/other#brands` |
| 12 | Photography | All photos are the project's own `/media` images and the brand logos you supplied. No manufacturer product photos are used. Some photos are illustrative, for example the Kenworth truck on the FPT trucks and LCV pages, and workshop photos on the Allison family pages. | Illustrative photos | Product pages |
| 13 | Dana Industrial link | The original links to dana-industrial.com. It is kept as an external link. | External link | `/products/dana` |

Please supply, if available:
- Licensed product photography (Allison families, FPT engines, Dana products, generator sets).
- Confirmed generator range, plus any Oman-specific warranty terms.
- Real descriptions for each service, if the homepage copy is not approved.

## 2. Sitemap

```
/                                   Homepage (unchanged sections, now linking into every page below)
/company                            Profile, mission, vision, #values, #why, #procedures, #warranty
/products                           Overview of all dealerships and supported equipment
/products/allison                   Brand, families by group, technology, aftermarket
/products/allison/:family           1000-2000-series, 9-speed, 3000-series, 4000-series, 6000-series,
                                    8000-series, 9000-series, fractran, x-models, egen-flex, egen-force, egen-power
/products/dana                      Brand, 6 applications, product × application matrix, Dana Industrial
/products/dana/:application         construction, agriculture, material-handling, mining, forestry, specialty-electric
/products/fpt                       Brand, #on-road, #off-road, #marine, #power-generation, aftermarket, #connected
/products/fpt/:category             lcv-minibuses, trucks, buses, agriculture, construction, power-units,
                                    marine-commercial, marine-pleasure, g-drive-marine, power-generation
/products/other                     6 homepage product categories (anchored), #brands, BeneParts
/services                           8 services + company practices
/services/:service                  fleet-management, annual-maintenance-contracts, component-rebuilds,
                                    field-repairs, oil-sampling, authorised-parts, engine-servicing,
                                    transmission-drivetrain
/parts                              Categories, #brands, engine / parts / transmission sales
/parts/genuine-parts                Overview, #allison (genuine vs non-genuine), #fpt, #dana
/parts/engine-parts                 #fpt (15 genuine part types), brands
/parts/transmission-parts           #allison (incl. Twin Disc & ZF), #dana, #coverage (Allison warranty)
/parts/oils-coolants                #allison (TES fluid specs), #fpt (fluids by region)
/parts/remanufactured               #allison (Genuine ReMan, DPIM2 ReFlex), #fpt (Original Reman)
*                                   404 page
```

50 routes in total. Every internal link and every in-page anchor (101 hash links) was checked automatically in the browser, with no failures.

## 3. Where each original page now lives

| Original page | New location |
|---|---|
| index | `/` (homepage), with brand text on `/products/*` |
| company | `/company` |
| contact | `/#contact` and the contact band on every page |
| other | `/products/other` |
| parts | `/parts`, with brands on `/parts#brands` |
| allison-1000-series … allison-9000-series, allison-9-speed, allison-FracTran, allison-x-model, allison-eGen-Flex/Force/Power | `/products/allison/:family` |
| allison-genue | `/parts/genuine-parts#allison` |
| allison-reman | `/parts/remanufactured#allison` |
| allison-approved | `/parts/oils-coolants#allison` |
| allison-extended | `/parts/transmission-parts#coverage` (price tables excluded, see item 8) |
| dana-construction, -Agriculture, -material, -mining, -forest, -electric | `/products/dana/:application` |
| dana-highway (wide-ranging and industrial) | `/products/dana` |
| fpt-Lcv, -truck, -buses, -agri, -construct, -power, -commercial, -pleasure, -drive | `/products/fpt/:category` |
| Fpt-iveco | `/products/fpt/power-generation` |
| fpt-genuine | `/parts/engine-parts#fpt` and `/parts/genuine-parts#fpt` |
| fpt-oil | `/parts/oils-coolants#fpt` |
| fpt-reman | `/parts/remanufactured#fpt` |
| fpt-app, -remote, -assistant, -master | `/products/fpt#connected` |

## 4. Product images (local catalog)

All product, parts and support photos used on internal pages were downloaded from the live site into `public/media/catalog/` (332 files, ~19 MB). The site no longer depends on yellowequipmentoman.com for images.

| Area | Local folder | Wired into |
|---|---|---|
| Allison families | `public/media/catalog/products/` | `/products/allison`, each family page hero + gallery |
| Dana applications | same | `/products/dana`, each application hero + product gallery |
| FPT categories / engines | same | `/products/fpt`, each category hero, matched engine photos, galleries |
| Parts / reman / fluids / connected | `public/media/catalog/services/` | Parts pages, FPT aftermarket & connected services |
| Page banners | `public/media/catalog/banners/` | Parts, Company, Other Equipment, generator range |
| Engine & parts sales | `public/media/catalog/engine-sales/`, `parts-sales/` | Parts index gallery |

Mapping file: `src/data/catalog/images.json` (and helpers in `images.js`).

## 5. Deployment notes

- The site uses client-side routing. The host must rewrite unknown paths to `/index.html`, for example Netlify `_redirects`, a Vercel rewrite, or nginx `try_files $uri /index.html`.
- `public/sitemap.xml` and `public/robots.txt` assume the domain is `https://yellowequipmentoman.com`.
- `hero.mp4` (83 MB) and `field.mp4` (12.6 MB) are still uncompressed because ffmpeg was not available. Re-encode them before launch (for example H.264 CRF 26, 1920 px wide).
- Keep `public/media/catalog/` in the deployed build. After cutover, the old site can go offline; images are fully local.
