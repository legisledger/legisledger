# Legis Ledger: Business Plan

**Tagline:** Bayesian Fact-Checker for Contested Knowledge  
**Vision:** Wikipedia's WayBack Machine, but for reliability - "Show me this page, but only what's confirmed"  
**Stage:** Pre-seed (Building MVP corpus)  
**Ask:** $500k-1M seed (when ready)

---

## Executive Summary

**The Problem:**
Wikipedia works for settled facts but breaks down for contested claims. Users can't distinguish between "rickets prevention (90% confidence, 50+ years data)" and "dementia prevention (50% confidence, inconclusive RCT)." Result: Misinformation spreads, trust erodes, good science gets lumped with speculation.

**The Solution:**
Filtered Wikipedia with user-controlled confidence thresholds. Set your threshold at 70% → see only claims meeting that bar. Removed claims explained (not hidden). Full Bayesian reasoning available for transparency. Think: Archive.org's WayBack Machine, but for epistemic reliability instead of time.

**The Pivot:**
Originally conceived as federated infrastructure for institutions (think email for knowledge claims). Advisor Steve Midgley (Learning Tapestry CEO, former Harvard/MIT) redirected: "Institutions won't populate this initially. Build the corpus like Archive.org did - create value, then partnerships emerge."

**Traction:**
- 3 working MVPs (Passenger Rights, Creatine, Vitamin D)
- Advisor committed (Steve Midgley, equity-based)
- Methodology validated by statistics background (PhD Education/Instructional Systems, MBA, 15+ years DON systems engineer)
- Strategic wife placement: Jess Regan (CMU Chief Strategy Officer) - access to Bayesian statistics department

**The Ask (When Ready):**
$500k-1M seed to:
1. Hire Bayesian professor (validate methodology, academic credibility)
2. Build 50-100 abstracts across domains (prove breadth)
3. Develop API for B2B customers
4. Pilot with 3-5 customers per vertical

---

## Market Opportunity

### Total Addressable Market (TAM): $15B
**Fact-checking + Evidence Synthesis + Research Intelligence**

- Journalism fact-checking: $500M
- Legal research: $5B (LexisNexis, Westlaw)
- Health tech evidence: $3B (UpToDate, Epocrates)
- Academic research tools: $4B (Elsevier, Web of Science)
- Policy analysis: $2B (think tanks, consultancies)
- Pharma evidence synthesis: $1B

### Serviceable Addressable Market (SAM): $2B
**Organizations needing structured, confidence-weighted knowledge**

- 5,000 newsrooms × $50k = $250M
- 20,000 law firms × $75k = $1.5B
- 500 health tech companies × $100k = $50M
- 100 policy think tanks × $200k = $20M
- 1,000 research institutions × $150k = $150M

### Serviceable Obtainable Market (SOM): $50M (Year 5)
**Realistic penetration in 5 years**

- 100 journalism customers × $50k = $5M
- 50 legal tech customers × $200k = $10M
- 200 health tech customers × $100k = $20M
- 50 policy customers × $150k = $7.5M
- 50 research customers × $150k = $7.5M

---

## Product: Filtered Wikipedia

### Core Innovation
**User-controlled confidence thresholds applied to Wikipedia articles**

**User experience:**
1. Visit: legis-ledger.org/wikipedia/vitamin-d
2. Set threshold: 70% (recommended)
3. See: 3 claims retained, 3 removed
4. Read: Clean article with only confirmed claims
5. Expand: See why claims were removed, full Bayesian analysis

**Key differentiators:**
- **Not binary** (true/false) → Probabilistic (0-99.9%)
- **Not hidden authority** ("trust us") → Transparent provenance (explicit biases, verification paths)
- **Not forced consensus** (Wikipedia edit wars) → Structured disagreement (multiple institutions can publish different confidence levels)
- **Not black box** (opaque algorithms) → Open reasoning (every probability sourced)

### Three Views for Three Personas

**View 1: Filtered Wikipedia (Consumers)**
- Clean article, Wikipedia-style
- Only claims ≥ threshold
- Removed claims in separate section with explanations
- Familiar format, easy reading

**View 2: Claim-Focused (Professionals)**
- Structured assertions
- Confidence badges prominent
- Evidence grades visible
- API-friendly for integration

**View 3: Full Transparency (Researchers)**
- Complete Bayesian analysis
- Prior → Evidence → Posterior
- All sources with DOIs
- Reproducible calculations

### Technical Architecture

**Data format:** JSON-LD (schema.org compatible)  
**Schema:** Domain-agnostic core + extensions (legal, scientific, policy)  
**Evidence grading:** A+ (meta-analysis) → D (anecdotal)  
**Bayesian engine:** Transparent probability sourcing, conservative defaults  
**API:** REST endpoints for filtering, threshold adjustment, claim extraction

**Key technical decisions:**
- Git for provenance (immutable history)
- Cryptographic signatures (institutional verification)
- Fork-friendly (can't be captured)
- Federation-ready (ActivityPub-inspired protocol)

---

## Business Model

### Revenue Streams (Multi-Sided Market)

**Tier 1: Consumer (Freemium)**
- Free: 10 filtered articles/month
- Premium: $9.99/month (unlimited articles, custom thresholds, PDF export)
- Target: 100,000 premium subscribers = $12M/year (Year 5)

**Tier 2: Professional (Subscription)**
- Journalists: $99/month
- Physicians: $149/month
- Policy analysts: $199/month
- Target: 5,000 professional users = $9M/year

**Tier 3: Business (API + Integration)**
- Health apps: $0.01-0.10/query
- News organizations: $5k-50k/year
- Legal tech: $50k-200k/year
- Target: $25M/year from B2B

**Tier 4: Enterprise (Custom)**
- Pharma evidence synthesis: $200k-500k/year
- Government agencies: $100k-300k/year
- Large law firms: $200k-500k/year
- Target: $25M/year from enterprise

**Total Year 5 Revenue Target: $71M**

### Unit Economics (Illustrative)

**Consumer (Premium):**
- ARPU: $120/year
- CAC: $20 (content marketing, SEO)
- LTV: $600 (5-year retention)
- LTV/CAC: 30:1 ✅

**Professional:**
- ARPU: $1,800/year
- CAC: $500 (content marketing, demos)
- LTV: $9,000 (5-year retention)
- LTV/CAC: 18:1 ✅

**Business (API):**
- ARPU: $50,000/year (average)
- CAC: $10,000 (sales team, pilots)
- LTV: $250,000 (5-year retention)
- LTV/CAC: 25:1 ✅

**Enterprise:**
- ARPU: $300,000/year
- CAC: $75,000 (sales, legal, integration)
- LTV: $1,500,000 (5-year retention)
- LTV/CAC: 20:1 ✅

**Key assumptions:**
- Retention: 80%+ (high switching costs once integrated)
- Gross margin: 85%+ (software scalability)
- Payback period: 6-12 months

---

## Go-To-Market Strategy

### Phase 1: Corpus Building (Months 1-6)
**Goal:** 20-30 high-quality examples proving value

**Focus domains:**
- Health/wellness (10 abstracts): Vitamin D, Creatine, Intermittent Fasting, Omega-3, etc.
- Policy (5 abstracts): Minimum Wage, UBI, Body Cameras, etc.
- Scientific (5 abstracts): Climate Change, Vaccine Efficacy, etc.
- Legal (5 abstracts): Passenger Rights, Employment Law, etc.

**Distribution:**
- Public gallery on legis-ledger.org
- Reddit (r/science, r/skeptic, r/bayesian)
- Hacker News (technical audience)
- Academic Twitter

**Success metric:** 10,000 unique visitors, 100 newsletter signups

### Phase 2: Customer Discovery (Months 7-9)
**Goal:** Validate willingness to pay across 3 verticals

**Targets:**
- Journalism: Talk to 10 fact-checking teams, convert 2 pilots
- Health tech: Talk to 10 supplement/wellness apps, convert 2 pilots
- Policy: Talk to 10 think tanks, convert 2 pilots

**Pricing validation:**
- Start with pilots ($5k-10k for 6 months)
- Measure usage, value delivery
- Convert to full contracts

**Success metric:** 6 paying pilots, $50k revenue

### Phase 3: Product-Market Fit (Months 10-18)
**Goal:** Prove repeatable sales motion

**Expand verticals:**
- Add legal tech (law firms, compliance)
- Add research institutions (universities, R&D labs)

**Build sales assets:**
- Case studies from pilots
- ROI calculators
- API documentation
- Self-service onboarding

**Success metric:** $500k ARR, 20 paying customers, 80%+ retention

### Phase 4: Scale (Months 19-36)
**Goal:** $5M ARR, prepare for Series A

**Hire:**
- VP Sales (B2B enterprise)
- VP Product (API + integrations)
- 3-5 SDRs (outbound)
- Customer success team

**Expand corpus:**
- 200+ abstracts across domains
- Institutional partnerships (universities submit claims)
- Federated infrastructure (multiple Legis Ledger instances)

**Success metric:** $5M ARR, 100 customers, path to $20M ARR

---

## Competitive Landscape

### Direct Competitors (None Currently)

**Closest analogs:**
- **Wikipedia:** Consensus-based, not confidence-weighted
- **Snopes/FactCheck.org:** Binary (true/false), not Bayesian
- **PubMed/Cochrane:** Scientific only, not cross-domain
- **Prediction markets (Metaculus):** Forward-looking, not evidence synthesis

**Our moat:** Only Bayesian fact-checker with transparent provenance and domain-agnostic architecture

### Indirect Competitors

| Competitor | Strength | Weakness vs. Us |
|-----------|----------|----------------|
| **Wikipedia** | Universal coverage | No confidence levels, forced consensus |
| **Snopes** | Brand trust | Binary judgments, opaque reasoning |
| **UpToDate** | Clinical depth | Medical only, expensive ($500+/user/year) |
| **LexisNexis** | Legal breadth | No confidence weighting, not evidence-based |
| **Elsevier** | Academic reach | Paywalled, not user-friendly |
| **ChatGPT** | Conversational | No provenance, hallucination risk |

### Competitive Advantages

**1. First-mover in Bayesian fact-checking**
- 2-3 year head start building corpus
- Methodology is defensible (requires statistics expertise)
- Network effects (more abstracts → more utility)

**2. Governance by design (uncapturable)**
- Open source code (Apache 2.0)
- Open data (CC-BY)
- Fork rights prevent lock-in
- See: GOVERNANCE_CONSTITUTION.md

**3. Cross-domain architecture**
- Same schema works for health, policy, legal, scientific
- Competitors are domain-specific (medical, legal, etc.)
- Winner-takes-most across all knowledge domains

**4. Transparent provenance**
- Every probability sourced
- No black box algorithms
- Users can verify independently
- Builds trust in polarized environment

**5. Strategic positioning**
- CMU connection via Jess Regan (Bayesian statistics access)
- DOD systems engineering background (rigorous methodology)
- Steve Midgley advisor (edtech credibility, Learning Tapestry)

---

## Financial Projections

### 5-Year Revenue Model

| Year | Consumers | Professionals | Business (B2B) | Enterprise | Total Revenue |
|------|-----------|---------------|----------------|-----------|---------------|
| Y1 | $0 | $0 | $50k | $0 | **$50k** |
| Y2 | $50k | $100k | $500k | $200k | **$850k** |
| Y3 | $500k | $1M | $3M | $1.5M | **$6M** |
| Y4 | $3M | $4M | $10M | $8M | **$25M** |
| Y5 | $12M | $9M | $25M | $25M | **$71M** |

### Operating Expenses

| Category | Y1 | Y2 | Y3 | Y4 | Y5 |
|----------|----|----|----|----|-----|
| **Personnel** | $300k | $800k | $2M | $5M | $12M |
| **Infrastructure** | $50k | $100k | $250k | $500k | $1M |
| **Sales/Marketing** | $100k | $300k | $1M | $3M | $8M |
| **R&D** | $50k | $200k | $500k | $1M | $2M |
| **G&A** | $50k | $100k | $250k | $500k | $1M |
| **Total OpEx** | **$550k** | **$1.5M** | **$4M** | **$10M** | **$24M** |

### Gross Margin

| Year | Revenue | COGS (15%) | Gross Profit | Gross Margin |
|------|---------|-----------|--------------|--------------|
| Y1 | $50k | $8k | $42k | 85% |
| Y2 | $850k | $128k | $722k | 85% |
| Y3 | $6M | $900k | $5.1M | 85% |
| Y4 | $25M | $3.75M | $21.25M | 85% |
| Y5 | $71M | $10.65M | $60.35M | 85% |

### Profitability

| Year | Gross Profit | OpEx | Net Income | Net Margin |
|------|-------------|------|-----------|-----------|
| Y1 | $42k | $550k | **-$508k** | -1016% |
| Y2 | $722k | $1.5M | **-$778k** | -92% |
| Y3 | $5.1M | $4M | **+$1.1M** | 18% |
| Y4 | $21.25M | $10M | **+$11.25M** | 45% |
| Y5 | $60.35M | $24M | **+$36.35M** | 51% |

**Break-even:** Year 3  
**Path to profitability:** Proven  
**Cash needs:** $2M total (seed + Series A)

---

## Funding Strategy

### Pre-Seed (Now - 6 Months)
**Status:** Bootstrap + advisor equity

**Goals:**
- Build 20-30 abstracts
- Validate product-market fit
- Get Hatch Act clearance (federal employee)
- Recruit first customers

**Runway:** Personal savings + DON salary (no external funding needed)

### Seed Round ($500k-1M, Months 6-12)
**Use of funds:**

| Category | Amount | Purpose |
|----------|--------|---------|
| **Bayesian professor hire** | $150k | Validate methodology, academic credibility |
| **Engineer (full-stack)** | $150k | API development, scaling infrastructure |
| **Corpus building** | $100k | Contractors for evidence gathering (Gemini-style work) |
| **Sales/marketing** | $100k | Customer acquisition, case studies |
| **Legal/incorporation** | $50k | Proper entity structure, IP protection |
| **Runway (12 months)** | $50k | Founder salary while building |

**Target investors:**
- **Thesis-driven VCs:** Lux Capital (epistemic infrastructure), Pioneer Fund (contrarian ideas)
- **Angel groups:** Bayesian/stats professors, edtech angels (Steve's network)
- **Strategic angels:** Journalism (Knight Foundation network), health tech, legal tech founders

**Milestones:**
- 50+ abstracts across domains
- 6 paying pilot customers
- API v1 launched
- $100k ARR

### Series A ($5-10M, Year 2-3)
**Use of funds:**
- Scale sales team (10-15 people)
- Expand engineering (5-10 people)
- Institutional partnerships (federated instances)
- International expansion

**Milestones for raise:**
- $2M+ ARR
- 50+ paying customers
- 80%+ net revenue retention
- Clear path to $20M ARR

---

## Team & Advisors

### Founder: Damon Regan

**Background:**
- PhD, Education (Instructional Systems), University of Central Florida
- MBA, Rollins College
- 15+ years: Department of Navy, Systems Engineer (enterprise architecture, AI/ML integration)
- Mission: "Bring about understanding with epistemic humility"

**Why credible for this:**
- Systems thinking (DOD complexity)
- Instructional design (knowledge structures)
- AI/ML experience (prompt engineering, LLM integration)
- Epistemic humility (personal mission alignment)

**Transition plan:**
- Currently federal employee (Hatch Act clearance in progress)
- Will transition full-time when seed raised
- DOD experience = asset (clearances, government customers)

### Strategic Spouse: Jess Regan

**Role:** Not formally on team, but strategic asset

**Background:**
- Chief Strategy and Marketing Officer, Carnegie Mellon Institute for Strategy & Technology
- Access: CMU Statistics & Data Science Department
- Network: Academic, policy, tech leadership

**Value:**
- Bayesian professor recruiting (CMU or Duke)
- Academic partnerships
- Policy connections
- Strategic counsel

### Advisor: Steve Midgley

**Background:**
- CEO, Learning Tapestry (edtech infrastructure)
- Former: Harvard, MIT (learning systems)
- Expertise: Federated infrastructure, product strategy

**Contribution:**
- Product vision (filtered Wikipedia pivot)
- Strategic guidance (Archive.org model)
- Edtech connections
- 1-2 hours/month

**Compensation:** 0.25% equity (2-year vest, options)

### Future Hires (Seed Round)

**Chief Scientific Officer (Bayesian Professor)**
- CMU or Duke Statistics PhD
- Published on Bayesian inference
- Academic credibility for methodology
- $120-150k + 2-5% equity

**Full-Stack Engineer**
- API development
- Frontend (React/Next.js)
- Backend (Python/FastAPI)
- $120-150k + 1-2% equity

**Evidence Researcher (Contract)**
- Gemini-style work (evidence gathering)
- Part-time initially
- $50-75/hour

---

## Risk Mitigation

### Risk 1: Institutions Don't Adopt
**Mitigation:** Build corpus first (Archive.org model). Institutions follow value, not vision.

### Risk 2: Bayesian Methodology Too Complex
**Mitigation:** Three views (filtered Wikipedia, claims, analysis). Complexity optional.

### Risk 3: Competition from Big Tech (Google, Microsoft)
**Mitigation:** Governance by design (can't be captured). Open source + fork rights = moat.

### Risk 4: Revenue Model Unproven
**Mitigation:** Multi-sided market (consumers, professionals, B2B, enterprise). Not dependent on one segment.

### Risk 5: Hatch Act Issues
**Mitigation:** Private project, personal time, no DOD affiliation. Clearance in progress.

### Risk 6: Trust/Credibility Challenges
**Mitigation:** Transparent provenance (explicit biases, verification paths). "Don't trust us - verify yourself."

### Risk 7: Capture Risk (Funders, Politics)
**Mitigation:** Structural impossibility (see GOVERNANCE_CONSTITUTION.md). Fork rights, open source, cryptographic verification.

---

## Why Now?

### Tailwinds

**1. Misinformation Crisis**
- Trust in institutions at all-time low
- Polarization increasing
- Need for structured disagreement infrastructure

**2. AI Hallucination Problem**
- ChatGPT can't cite sources reliably
- No confidence levels
- Legis Ledger = "ground truth" for LLMs

**3. Bayesian Renaissance**
- More people understand Bayesian thinking (thanks to rationalist community, FiveThirtyEight, etc.)
- Nate Silver, Scott Alexander, Gwern popularized
- Market ready for probabilistic reasoning

**4. Wikipedia Limitations Obvious**
- Edit wars on contested topics (minimum wage, vaccines, climate)
- Forced consensus doesn't work for emerging knowledge
- No way to express uncertainty

**5. Archive.org Success Model**
- Proved "build corpus first, partnerships later" works
- 866 billion web pages archived
- Institutional partnerships emerged organically

### Why This Team

**1. Systems Thinking (DOD Background)**
- Enterprise architecture at scale
- Mission-critical systems (lives depend on reliability)
- Security clearances (government customers accessible)

**2. Epistemic Humility (Personal Mission)**
- Not building this to "be right"
- Building to "enable cooperation through structured disagreement"
- Aligns with product philosophy

**3. Strategic Network**
- Steve Midgley (edtech, federated infrastructure)
- Jess Regan (CMU, policy, academic)
- DOD connections (intelligence community applications)

**4. Technical + Business**
- PhD (instructional systems) + MBA
- Understands knowledge structures AND business models
- Rare combination for this problem

---

## Long-Term Vision (10 Years)

### Year 1-3: Legis Ledger the Company
- Build corpus (200+ abstracts)
- Validate business model
- Achieve profitability

### Year 4-7: Legis Ledger the Protocol
- Federated instances (universities, think tanks host their own)
- ActivityPub-style federation
- Smart contract governance (vocabulary voting)

### Year 8-10: Legis Ledger the Standard
- JSON-LD schema adopted by institutions
- "Bayesian abstract" becomes standard format
- Like DOI for knowledge claims (permanent identifiers)

**Exit scenarios:**
- **Acquisition:** Google (integrate with Knowledge Graph), Microsoft (Bing fact-checking), Meta (fight misinformation)
- **IPO:** If we reach $50M+ ARR with clear path to $200M
- **Non-profit transition:** If mission drift risk emerges, convert to foundation (Internet Archive model)

**Preference:** Build sustainable business, then decide. Optionality preserved through governance design.

---

## Appendices

### A. Governance Constitution
See: [GOVERNANCE_CONSTITUTION.md](GOVERNANCE_CONSTITUTION.md)

**Key principles:**
- No central authority (federated)
- Fork rights (can't be captured)
- Cryptographic verification (math, not trust)
- Transparent finances (capture-resistant)

### B. Technical Architecture
See: [README.md](README.md) - Architecture section

**Core schema:** Domain-agnostic JSON-LD
**Extensions:** Legal, Scientific, Policy
**Bayesian engine:** Conservative probability sourcing
**Federation protocol:** ActivityPub-inspired

### C. Example Abstracts
- **Vitamin D:** [vitamin-d-filtered-mvp.json](examples/vitamin-d-filtered-mvp.json)
- **Creatine:** [creatine-lbm-resistance-training-2025.json](examples/creatine-lbm-resistance-training-2025.json)
- **Passenger Rights:** [eu-delay-mechanical-3hrs.json](examples/eu-delay-mechanical-3hrs.json)

### D. Methodology
See: [BAYESIAN_CALCULATION_METHOD.md](docs/BAYESIAN_CALCULATION_METHOD.md)

**Every probability sourced:**
- Priors from empirical base rates
- P(E|H) from detection rates
- P(E|~H) from false positive rates
- Conservative defaults when uncertain

### E. Customer Validation
*To be added after Phase 2 (customer discovery)*

---

**Last Updated:** 2025-11-07  
**Version:** 2.0 (Investor-Ready)  
**Contact:** [Your email]  
**Website:** legis-ledger.org (launching Q1 2026)

---

**Tagline for pitch decks:**
> "Wikipedia's WayBack Machine for reliability. Set your confidence threshold, see only what's confirmed. Bayesian fact-checking infrastructure for the knowledge economy."