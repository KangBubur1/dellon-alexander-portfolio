# Strategy & Build Notes — Dellon Alexander Portfolio

## Phase 1: Strategy

1. **Owner profile**: Dellon Alexander — third-year Undergraduate in Financial Management at Universitas Tarumanagara (Jakarta, Indonesia).
2. **Target goal**: Credit Analyst role at a bank.
3. **Primary audience**: Bank credit risk managers, corporate/commercial banking team leads, and campus/graduate recruiters. Within 6 seconds they want to confirm:
   - Who Dellon is and his degree/university (`Financial Management · Universitas Tarumanagara`).
   - That he is specifically targeting **Credit Analyst** roles.
   - That he can read financial statements, evaluate balance-sheet strength (net cash vs. debt/lease obligations), project cash flows, and build structured financial models.
4. **Positioning statement**: A third-year Financial Management student who combines end-to-end 5-year financial forecasting and DCF valuation rigour with research leadership at IMMANTA to evaluate businesses through a cash-flow and balance-sheet lens.
5. **Core skill pillars** (ranked by relevance to a bank Credit Analyst role):
   1. **Credit Analysis & Balance-Sheet Strength** — evaluating net cash positions (`Rp3.78T` cash & marketable securities vs. `Rp427M` lease liabilities), incremental borrowing rates (`8.90%`), and working capital dynamics.
   2. **5-Year Financial Statement Forecasting** — 5-year income statement projections (`2026E–2030E`) from 4-year actuals (`2022A–2025A`), explicit assumption drivers, Net Working Capital, and Capex modelling.
   3. **DCF & Free Cash Flow (FCFF) Valuation** — Free Cash Flow to Firm (NOPAT + D&A − Capex − ΔNWC), CAPM-based WACC (`8.50%`), terminal value (`4.0%` TGR), enterprise-to-equity bridge, and sensitivity analysis.
   4. **Corporate Finance & Capital Market** — fundamental analysis of listed Indonesian issuer PT Cisarua Mountain Dairy Tbk (`$CMRY`).
   5. **Leadership & Cross-Functional Coordination** — Vice Coordinator of Research & Development at IMMANTA and lead for the Tentier academic initiative.
6. **Visual direction**:
   - **Mood**: Full Dark Institutional Terminal & Research Memo — sleek, cohesive dark-toned surfaces inspired by modern institutional analytics platforms.
   - **Colour palette**:
     - Carbon Obsidian (`#07090E`) and Midnight Slate (`#0B0F17`) for primary and alternating section backgrounds.
     - Elevated Dark Slate (`#101622` / `#161F30`) with crisp structural borders (`#1F2B42`) for cards and modals.
     - Crisp Alabaster (`#F8FAFC`, 18.5:1 contrast) and Cool Silver-Slate (`#94A3B8`, 7.1:1 contrast) for typography.
     - Single accent: Luminous Champagne Gold (`#E2B86B` / `#F3D999`).
   - **Typography pairing**: `Fraunces Variable` (editorial serif display for headings and key figures) + `Inter Variable` (clean tabular-numeral sans-serif for body copy, financial labels, and tables).
   - **Motion style**: Restrained 200–500ms ease-out transitions, subtle hero revenue-trajectory line-chart path draw (`2022A–2030E`), count-up tabular numerals on scroll, and cursor-following champagne spotlight border on project cards. Fully disabled when `prefers-reduced-motion: reduce` is set.
7. **Project ranking**:
   1. **Featured (#1)**: *Financial Forecasting & Discounted Cash Flow (DCF) Valuation of PT Cisarua Mountain Dairy Tbk* — includes full `Background`, `Result`, 7-item `Steps` overview, 5 detailed step walkthroughs (`STEP 1` – `STEP 5`), and all **8 extracted spreadsheet exhibit images** (`public/projects/cmry/image1.png` – `image8.png`) with a fullscreen zoom lightbox.

---

## Locked Content & Translation Notes (Phase 2)

- **Biography**: Kept verbatim in English as provided in the prompt, split into two paragraphs at a sentence boundary in the About section.
- **Project Summary (`Background` & `Result`) and `Detail` (`Steps` + `STEP 1` through `STEP 5`)**: Translated faithfully sentence-by-sentence from the updated Indonesian `.docx` (`_source/media_1792821329378_0efe3aba.txt`) into English, preserving every sentence, step, and number.
- **Extracted Spreadsheet Visuals**: All 8 images embedded in the `.docx` were extracted and copied to `public/projects/cmry/image1.png` through `image8.png` and placed alongside their corresponding sections (`Result` and `STEP 1` – `STEP 5`).

### Source Typos Fixed During Translation
1. `menghasilkan nilai instrinsik saham` (`instrinsik` → `intrinsik`, translated as `intrinsic value of the share`).
2. `depreciation& amortization` → `depreciation & amortization` (added missing space before `&`).
3. `STEP 2 menhitung WACC` / `Menhitung present value` (`menhitung` → `menghitung`, translated as `Calculating`).
4. `Langkah selanjutnya adlaah` (`adlaah` → `adalah`, translated as `The next step is`).
5. `kemudian tambahkan current price untuk menghitung potential upside` → translated faithfully in context as `then compare with the current price to calculate the potential upside`.

---

## `[ADD: ...]` Items for Dellon to Complete
All placeholders live in a single file: `src/data/portfolio.ts`. Search for `[ADD:` to replace them:

1. **Profile Photo** (`profile.photo` in `src/data/portfolio.ts`): Currently uses a styled `DA` monogram portrait card. Drop a portrait photo into `public/photo.webp` and set `photo: '/photo.webp'`.
2. **CV PDF** (`public/cv.pdf`): Replace the placeholder file in `public/cv.pdf` with your final resume PDF.
3. **CMRY Project Artifacts** (`projects[0].artifacts`):
   - `[ADD: link to Excel model (.xlsx)]` — add Google Drive / OneDrive / local path to the `.xlsx` DCF model.
   - `[ADD: link to PDF valuation report]` — add link to the valuation deck or equity research report PDF.
4. **IMMANTA Experience Dates & Scope** (`experience.items`):
   - `[ADD: period]` for *Vice Coordinator of Research and Development*.
   - `[ADD: period]` and `[ADD: scope, team size or outcomes]` for *Initiative Lead — Tentier*.
5. **Software Tools** (`skills.groups` → `Software`):
   - `[ADD: additional software / terminals]`
6. **Education & Certifications** (`education`):
   - `[ADD: expected graduation]` (e.g. `Expected 2027`).
   - `[ADD: GPA]` and `[ADD: relevant coursework]`.
   - `[ADD: certifications, if any]`.
