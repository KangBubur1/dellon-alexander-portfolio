/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit this file to update the website — no component changes needed.
 *
 *  LOCKED CONTENT (owner's own words, faithfully translated from Indonesian):
 *    - `bio`
 *    - every project's `summary` and `detail`
 *  Do not paraphrase these. Everything else is supporting copy.
 *
 *  Any value starting with "[ADD:" is rendered as a dashed placeholder chip
 *  so it is easy to spot and replace.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Stat = {
  label: string;
  value: string;
  /** Optional numeric value for the count-up animation. */
  count?: { to: number; decimals?: number; prefix?: string; suffix?: string };
  sub?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type SummarySection = {
  /** The owner's own label, e.g. "Background", "Result". */
  label: string;
  /** Full text, split only at sentence boundaries for readability. */
  paragraphs: string[];
  /** Optional image attached to this summary section in the source document. */
  images?: ProjectImage[];
};

export type DetailStepBlock = {
  /** Exact step heading from the document, e.g. "STEP 1". */
  stepNumber: string;
  /** Short descriptive subtitle for navigation/readability. */
  title: string;
  /** Faithful sentence-by-sentence translation of the owner's step text. */
  paragraphs: string[];
  /** Extracted spreadsheet tables/visuals from the source document for this step. */
  images: ProjectImage[];
};

export type Project = {
  slug: string;
  /** Owner's exact project title. */
  title: string;
  /** Short UI label (1–3 words) used for filter chips. */
  category: string;
  featured: boolean;
  period?: string;
  tags: string[];
  /** Cover image from the document used on the project card. */
  coverImage?: ProjectImage;
  /** Highlighted number already present in the owner's text. */
  highlight?: { value: string; label: string; chip?: string; count?: Stat['count'] };
  /** Key-stats strip in the modal (numbers copied from the text). */
  stats: Stat[];
  /** LOCKED — owner's summary (Part A). */
  summary: SummarySection[];
  /** Which summary section is previewed on the card. */
  cardPreview: string;
  /** LOCKED — owner's detail (Part B). */
  detail: {
    label: string;
    intro: string[];
    stepsLabel?: string;
    /** Initial 7-point overview list from the document. */
    steps: string[];
    /** Detailed step-by-step breakdown (STEP 1 – STEP 5) with spreadsheet exhibits. */
    stepBlocks: DetailStepBlock[];
  };
  artifacts: { label: string; href: string }[];
};

export const profile = {
  name: 'Dellon Alexander',
  initials: 'DA',
  role: 'Financial Management Undergraduate',
  targetRole: 'Credit Analyst',
  badge: 'Open to Credit Analyst roles',
  location: 'Jakarta, Indonesia',
  email: 'dellonalexander006@gmail.com',
  linkedin: {
    label: 'linkedin.com/in/DellonAlexander29',
    // NOTE: provided as "linkedin.com/DellonAlexander29"; LinkedIn profile URLs use /in/. Verify.
    href: 'https://www.linkedin.com/in/DellonAlexander29',
  },
  cv: '/cv.pdf',
  /** Replace with e.g. '/photo.webp' (place the file in /public). Empty = monogram placeholder. */
  photo: '',
  university: 'Universitas Tarumanagara',
};

export const hero = {
  eyebrow: 'Financial Management · Universitas Tarumanagara',
  headline: 'Cash-flow-first analysis, built for credit decisions.',
  subheadline:
    'Third-year Financial Management student who builds full 5-year financial forecasts and DCF valuations — from balance-sheet net cash and working capital to FCFF and WACC — bringing structured financial rigour to credit analysis.',
  primaryCta: { label: 'Explore case study', href: '#work' },
  secondaryCta: { label: 'Download CV', href: '/cv.pdf' },
  /** Snapshot panel — every figure comes from the CMRY project text & model. */
  snapshot: {
    title: 'Valuation & Credit Snapshot',
    ticker: '$CMRY',
    company: 'PT Cisarua Mountain Dairy Tbk',
    rows: [
      { label: 'Enterprise Value', value: 'Rp35,767,932M' },
      { label: 'Cash & M/S vs. Debt', value: 'Rp3.78T vs Rp427M' },
      { label: 'Implied Share Price', value: 'Rp4,984', count: { to: 4984, prefix: 'Rp' } },
      { label: 'Current Share Price', value: 'Rp4,210', count: { to: 4210, prefix: 'Rp' } },
      {
        label: 'Potential Upside',
        value: '+18.39%',
        count: { to: 18.39, decimals: 2, prefix: '+', suffix: '%' },
      },
    ] as Stat[],
    verdict: 'BUY',
    footnote: 'DCF · WACC 8.50% (Rf 7.44%, Beta 0.19, Cost of Debt 8.90%) · TGR 4.0%',
  },
};

export const proofBar: Stat[] = [
  {
    value: '3rd',
    label: 'Year, Financial Management',
    sub: 'Universitas Tarumanagara',
    count: { to: 3, suffix: 'rd' },
  },
  {
    value: '4A + 5E',
    label: 'Historical & Forecast Horizon',
    sub: 'FY2022A–FY2025A · 2026E–2030E',
  },
  {
    value: '8',
    label: 'Financial Model Exhibits',
    sub: 'IS · Assumptions · NWC · WACC · FCFF · DCF · Sensitivity',
    count: { to: 8 },
  },
  {
    value: 'R&D',
    label: 'Vice Coordinator',
    sub: 'IMMANTA · Led Tentier',
  },
];

/** LOCKED — owner's biography, word for word (split into paragraphs only). */
export const bio: string[] = [
  'I am currently a third-year Financial Management student at Universitas Tarumanagara. I have developed a strong interest in Capital Market, Corporate Finance, Valuation, and Credit Analysis.',
  'Alongside my studies, I am actively involved in student organizations within IMMANTA, having served as Vice Coordinator of Research and Development and led key academic initiatives like Tentier. Through these leadership roles, I have sharpened my skills in project management, team collaboration, and cross-functional coordination, positioning me well for future professional growth.',
];

/** Key phrases from the bio to accent visually (must appear verbatim in `bio`). */
export const bioHighlights = [
  'Capital Market, Corporate Finance, Valuation, and Credit Analysis',
  'Vice Coordinator of Research and Development',
  'Tentier',
];

export const pillars = [
  {
    title: 'Credit Analysis & Balance-Sheet Strength',
    text: 'A core area of interest — evaluating net cash positions (Rp3.78T cash & marketable securities vs. Rp427M lease liabilities), incremental borrowing rates (8.90%), and working capital dynamics.',
  },
  {
    title: '5-Year Financial Statement Forecasting',
    text: 'Projecting income statements (2026E–2030E) from 4-year historical actuals (2022A–2025A) using margin drivers, step-down revenue growth assumptions, NWC schedules, and Capex projections.',
  },
  {
    title: 'DCF & Free Cash Flow (FCFF) Valuation',
    text: 'Building unlevered free cash flow schedules from NOPAT, D&A, Capex, and Change in NWC, discounted via CAPM-derived WACC (8.50%) and perpetuity growth terminal value (4.0%).',
  },
  {
    title: 'Corporate Finance & Capital Market',
    text: 'Fundamental valuation and two-dimensional WACC / terminal growth sensitivity testing applied to listed Indonesian issuer PT Cisarua Mountain Dairy Tbk ($CMRY).',
  },
  {
    title: 'Leadership & Cross-Functional Coordination',
    text: 'Project management, team collaboration, and cross-functional coordination honed as Vice Coordinator of Research & Development at IMMANTA and lead of Tentier.',
  },
];

export const workIntro = {
  title: 'Selected Work',
  intro:
    'End-to-end financial modelling: 4-year historical analysis (2022A–2025A), 5-year statement & NWC projections (2026E–2030E), CAPM/WACC derivation, FCFF valuation, and sensitivity tables.',
  ctaLine: 'Want to review the full DCF spreadsheet or discuss my analytical process?',
  ctaLabel: "Let's talk",
};

export const projects: Project[] = [
  {
    slug: 'cmry-dcf-valuation',
    title:
      'Financial Forecasting & Discounted Cash Flow (DCF) Valuation of PT Cisarua Mountain Dairy Tbk',
    category: 'Equity & Cash Flow Valuation',
    featured: true,
    period: 'FY2022A – FY2030E Model',
    tags: [
      'DCF',
      'FCFF',
      'WACC',
      'CAPM',
      'Income Statement Forecast',
      'Net Working Capital',
      'Capex',
      'Sensitivity Analysis',
    ],
    coverImage: {
      src: '/projects/cmry/image1.png',
      alt: 'Discounted Cash Flow summary, implied share price calculation, and WACC vs. growth sensitivity tables for PT Cisarua Mountain Dairy Tbk ($CMRY)',
      caption:
        'DCF Valuation Summary — FCFF projections (2026E–2030E), Enterprise-to-Equity bridge, and Sensitivity Tables.',
    },
    highlight: {
      value: '+18.39%',
      label: 'Potential Upside',
      chip: 'BUY',
      count: { to: 18.39, decimals: 2, prefix: '+', suffix: '%' },
    },
    stats: [
      { label: 'Revenue FY2022A → FY2025A', value: 'Rp6.38T → Rp10.72T' },
      {
        label: 'Historical Revenue CAGR',
        value: '18.91%',
        count: { to: 18.91, decimals: 2, suffix: '%' },
      },
      { label: 'Cash & Securities vs. Debt', value: 'Rp3.78T vs Rp427M' },
      { label: 'Cost of Debt (IBR 2025)', value: '8.90%' },
      { label: 'WACC (CAPM Discount Rate)', value: '8.50%' },
      { label: 'Terminal Growth Rate', value: '4.0%' },
      { label: 'Intrinsic vs. Market Price', value: 'Rp4,984 vs Rp4,210' },
      { label: 'Potential Upside · Call', value: '+18.39% · BUY' },
    ],
    summary: [
      {
        label: 'Background',
        paragraphs: [
          'PT Cisarua Mountain Dairy Tbk ($CMRY) is a leading consumer staples (Consumer Non-Cyclicals) company in Indonesia engaged in the production and distribution of processed dairy products and ready-to-eat consumer foods (Consumer Foods under the Kanzler brand).',
          'Throughout the historical period FY2022A - FY2025A, CMRY recorded very strong revenue growth from Rp6.38 trillion to Rp10.72 trillion (CAGR 18.91%) with a solid net cash balance sheet position, cash and marketable securities of Rp3.78 trillion against lease liabilities of only Rp427 million.',
          'This project aims to evaluate the intrinsic value of CMRY shares through 5-year financial statement projection modelling (2026E - 2030E), Net Working Capital & Capex, the calculation of Free Cash Flow to Firm (FCFF), the determination of a CAPM-based WACC discount rate, through to Sensitivity Analysis testing.',
        ],
      },
      {
        label: 'Result',
        paragraphs: [
          'Based on Discounted Cash Flow (DCF) modelling with a WACC of 8.50% and a Terminal Growth Rate of 4.0%, $CMRY shares have an intrinsic value of Rp4,984 per share. Compared with the current market price of Rp4,210 per share, there is a Potential Upside of +18.39%, resulting in a BUY investment recommendation.',
        ],
        images: [
          {
            src: '/projects/cmry/image1.png',
            alt: 'Discounted Cash Flow Overview, Enterprise-to-Equity Value Calculation, and Sensitivity Tables for $CMRY',
            caption:
              'Overview: Discounted Cash Flow (2026E–2030E), Implied Share Price Calculation (Rp4,984 vs. Rp4,210 current price, +18.39% upside), and Sensitivity Tables.',
          },
        ],
      },
    ],
    cardPreview: 'Result',
    detail: {
      label: 'Detail',
      intro: [
        'Using the Discounted Cash Flow valuation method to calculate the intrinsic value of PT Cisarua Mountain Dairy Tbk.',
      ],
      stepsLabel: 'Steps',
      steps: [
        'Forecast the income statement for the next 5 years',
        'Create an assumptions table',
        'Calculate net working capital and capital expenditure',
        'Calculate CAPM and WACC as the discount rate',
        'Calculate free cash flow to firm by finding NOPAT, then adding depreciation & amortization, then subtracting capital expenditure and change in NWC',
        'Find the intrinsic value of the share using the present value of FCFF and Terminal Value to find enterprise value, then subtract net debt. Then divide equity value by shares outstanding to obtain the intrinsic value of the share',
        'Create a sensitivity analysis to see how much changes in WACC and Growth rate affect the intrinsic value of the share.',
      ],
      stepBlocks: [
        {
          stepNumber: 'STEP 1',
          title: 'Income Statement Forecast, Assumption Drivers & Net Working Capital (2022A – 2030E)',
          paragraphs: [
            "Using the 4-year actual income statement taken from $CMRY's financial statements from 2022–2025. Creating a 5-year income statement projection (2026–2030). To build the projection, an assumptions table is required. The assumptions table is created by calculating the margin on revenue and EBT for each required account across the 4 actual years. Then, in the estimated (projection) years, the percentages are calculated using the average formula for each year, except for Revenue growth YoY, where after finding the average for 2026E, revenue growth is assumed to decline by 1.5% each year.",
            'In the net working capital table, input the 4-year actual data. Then project the figures for 2026E – 2030E based on the assumptions table that has been created. The objective is to calculate capital expenditure and the change in net working capital in the estimated years.',
          ],
          images: [
            {
              src: '/projects/cmry/image2.png',
              alt: 'Income Statement (in Millions Rupiah) from 2022A to 2030E for PT Cisarua Mountain Dairy Tbk',
              caption:
                'Income Statement (in Millions Rupiah): 4-year actuals (2022A–2025A) and 5-year projections (2026E–2030E).',
            },
            {
              src: '/projects/cmry/image3.png',
              alt: 'Assumption Drivers table from 2022A to 2030E showing revenue growth, margins, tax rate, NWC drivers, and Capex % of revenue',
              caption:
                'Assumption Drivers (2022A–2030E): historical averages and 1.5% annual step-down in YoY revenue growth from 2026E.',
            },
            {
              src: '/projects/cmry/image4.png',
              alt: 'Net Working Capital and Capital Expenditure schedule from 2022A to 2030E',
              caption:
                'Net Working Capital (NWC), Change in NWC, and Capital Expenditure projections (2022A–2030E).',
            },
          ],
        },
        {
          stepNumber: 'STEP 2',
          title: 'Weighted Average Cost of Capital (WACC) & CAPM',
          paragraphs: [
            'Calculating WACC. The calculation is performed by establishing several assumptions first. The risk-free rate is taken based on the 10-year Indonesian government bond (RI) yield, market return and beta are taken from investment websites, and the tax rate is taken from the projection results in Step 1. Meanwhile, debt and equity are taken from the 2025 actual financial statement data.',
            'Cost of debt is taken from the IBR (incremental borrowing rate) in the 2025 actual financial statements, recorded at 8.9%. Cost of equity is calculated using the Capital Asset Pricing Model (CAPM).',
            'Then, based on the established assumption figures, WACC is calculated to be used as the discount rate.',
          ],
          images: [
            {
              src: '/projects/cmry/image5.png',
              alt: 'Weighted Average Cost of Capital (WACC) assumption drivers and calculation table showing 8.50% WACC',
              caption:
                'WACC Calculation: Risk-Free Rate 7.44%, Market Return 13.00%, Beta 0.19, Cost of Debt 8.90%, Tax Rate 20.58%, Cost of Equity (CAPM) 8.50% → WACC 8.50%.',
            },
          ],
        },
        {
          stepNumber: 'STEP 3',
          title: 'Free Cash Flow to Firm (FCFF / Unlevered Free Cash Flow)',
          paragraphs: [
            'Based on the figures already calculated from Step 1 and Step 2, the next step is to find free cash flow to firm (unlevered free cash flow). Taking EBIT and the tax rate from Step 1. Then, after obtaining NOPAT (EBIT after tax), add depreciation and amortization, then subtract capital expenditure and the change in net working capital, resulting in the final free cash flow to firm.',
          ],
          images: [
            {
              src: '/projects/cmry/image6.png',
              alt: 'Free Cash Flow to Firm schedule from 2026E to 2030E',
              caption:
                'Free Cash Flow to Firm (2026E–2030E): NOPAT + Depreciation & Amortization − Capital Expenditure − Change in NWC.',
            },
          ],
        },
        {
          stepNumber: 'STEP 4',
          title: 'Discounted Cash Flow, Terminal Value & Implied Share Price',
          paragraphs: [
            'Calculating the present value of FCFF for projection years 1–5 using the WACC calculated in Step 2 as the discount rate. Then calculate the terminal value using the perpetuity growth method, and discount the terminal value to present value using the WACC.',
            'The next step is to calculate enterprise value by summing all present values of FCFF and Terminal Value. Then subtract net debt and divide by the number of shares outstanding to obtain the final result, namely the implied share price (target price), then compare with the current price to calculate the potential upside.',
          ],
          images: [
            {
              src: '/projects/cmry/image7.png',
              alt: 'Discounted Cash Flow present value table and Enterprise-to-Equity bridge yielding Rp4,984 implied share price',
              caption:
                'DCF Calculation: Enterprise Value Rp35,767,932M + Cash & M/S Rp3,779,887M − Debt Rp427M = Equity Value Rp39,547,392M ÷ 7,935M shares = Rp4,984 Implied Share Price (+18.39% upside).',
            },
          ],
        },
        {
          stepNumber: 'STEP 5',
          title: 'Sensitivity Analysis (WACC & Growth Rate)',
          paragraphs: [
            'Creating a sensitivity analysis of changes in the growth rate and WACC on the target price and potential gain/loss.',
            'The objective is to see how much influence changes in assumptions have on the final analysis result.',
          ],
          images: [
            {
              src: '/projects/cmry/image8.png',
              alt: 'Sensitivity Tables for Implied Share Price and Potential Gain/Loss across WACC (7.50% to 9.50%) and Growth Rate (3.00% to 5.00%)',
              caption:
                'Sensitivity Analysis: Implied Share Price (Rp3,647 – Rp8,438) and Potential Gain/Loss (-13.37% to +100.43%) across WACC (7.50%–9.50%) and Terminal Growth Rate (3.00%–5.00%).',
            },
          ],
        },
      ],
    },
    artifacts: [
      { label: '[ADD: link to Excel model (.xlsx)]', href: '' },
      { label: '[ADD: link to PDF valuation report]', href: '' },
    ],
  },
];

export const experience = {
  title: 'Experience & Leadership',
  intro: 'Where analysis meets execution — leading research and academic programmes for fellow students.',
  items: [
    {
      role: 'Vice Coordinator of Research and Development',
      org: 'IMMANTA',
      period: '[ADD: period]',
      points: ['Served as Vice Coordinator of the Research and Development division.'],
      skills: ['Project management', 'Team collaboration', 'Cross-functional coordination'],
    },
    {
      role: 'Initiative Lead — Tentier',
      org: 'IMMANTA',
      period: '[ADD: period]',
      points: [
        'Led Tentier, one of the organisation’s key academic initiatives.',
        '[ADD: scope, team size or outcomes]',
      ],
      skills: ['Leadership', 'Project management'],
    },
  ],
};

export const skills = {
  title: 'Skills & Tools',
  intro: 'Grouped by how they are used in practice.',
  groups: [
    {
      name: 'Valuation & Financial Modelling',
      items: [
        '5-year Income Statement forecasting',
        'Assumption drivers & margin modelling',
        'Net Working Capital & Capex schedules',
        'Free Cash Flow to Firm (FCFF)',
        'CAPM & WACC derivation',
        'Discounted Cash Flow (DCF)',
        'WACC & growth sensitivity analysis',
      ],
    },
    {
      name: 'Analytical Focus',
      items: [
        'Credit Analysis',
        'Corporate Finance',
        'Capital Market',
        'Valuation',
        'Balance-sheet & net-cash assessment',
      ],
    },
    {
      name: 'Software',
      items: ['Spreadsheet financial modelling', '[ADD: additional software / terminals]'],
    },
    {
      name: 'Soft Skills',
      items: [
        'Project management',
        'Team collaboration',
        'Cross-functional coordination',
        'Leadership',
      ],
    },
  ],
};

export const education = {
  title: 'Education & Certifications',
  items: [
    {
      school: 'Universitas Tarumanagara',
      degree: 'Undergraduate — Financial Management',
      period: 'Third year · [ADD: expected graduation]',
      notes: ['[ADD: GPA]', '[ADD: relevant coursework]'],
    },
  ],
  certifications: ['[ADD: certifications, if any]'],
};

export const contact = {
  title: 'Let’s talk credit.',
  line: 'Looking for an analyst who reads the cash flow and balance sheet before the conclusion? I’d be glad to walk you through my model.',
  availability: 'Open to Credit Analyst opportunities',
};

export const seo = {
  title: 'Dellon Alexander — Financial Management | Aspiring Credit Analyst',
  description:
    'Portfolio of Dellon Alexander, a third-year Financial Management student at Universitas Tarumanagara: financial forecasting, DCF valuation and credit-focused analysis.',
};

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
