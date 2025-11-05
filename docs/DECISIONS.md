# Decision Log

**Purpose:** Track strategic decisions as the project evolves  
**Started:** 2025-01-26

---

## How to Use This Log

**When to add entries:**
- Adopting a new methodology
- Changing standards or requirements
- Making tool/platform choices
- Setting policy precedents
- Pivoting strategy

**Entry format:**
```markdown
## YYYY-MM-DD: [Decision Title]
**Decision:** [What we decided]
**Rationale:** [Why we decided this]
**Source:** [What informed this decision]
**Status:** [Adopted | Under Review | Superseded]
**Supersedes:** [Previous decision, if applicable]
```

---

## 2025-01-26: Strategic Pivot to Bayesian Fact-Checker

**Decision:** Build corpus of Wikipedia-derived Bayesian abstracts first, institutional partnerships later

**Rationale:** 
- Steve Midgley advisor feedback: "Institutions won't populate this initially"
- Archive.org model: Build value, then partnerships emerge naturally
- Cold start problem: Need to demonstrate value before recruiting institutions
- Clearer value proposition: "Bayesian fact-checker" vs "federated infrastructure"

**Source:** Meeting with Steve Midgley (Learning Tapestry), 2025-01-25

**Status:** Adopted

**Implications:**
- Focus 80% effort on building compelling examples
- 20% effort on documenting architecture for when institutions ready
- Target 10-15 high-quality abstracts across domains (health, policy, scientific)
- Lead with Vitamin D (timely, newsworthy 2024 Endocrine Society guidelines)

---

## 2025-01-26: Wikipedia as Primary Source Material

**Decision:** Extract claims from contested Wikipedia articles rather than waiting for institutional submissions

**Rationale:**
- Wikipedia edit wars reveal contested knowledge
- Articles already have references we can grade
- Demonstrates system value on real examples
- Users already trust Wikipedia, this adds Bayesian layer

**Source:** Strategic pivot discussion

**Status:** Adopted

**Target articles:**
- 3 easy (Green): Vitamin D, Intermittent Fasting, Omega-3
- 4 moderate (Yellow): Minimum Wage, Body Cameras, UBI, Low-Carb vs Low-Fat
- 3 hard (Red): Glyphosate, COVID Vaccines, Climate Change

---

## 2025-01-26: Evidence Grading System

**Decision:** Use A+ (meta-analysis) → A (RCT) → B (mechanistic) → C (observational) → D (anecdotal)

**Rationale:** 
- Standard medical evidence hierarchy
- Widely accepted by GRADE Working Group
- Familiar to medical/scientific community
- Clear, intuitive ranking

**Source:** GRADE methodology + Cochrane Handbook

**Status:** Adopted

**Details:**
- Grade A+: Meta-analysis, systematic review with meta-analysis
- Grade A: Well-designed RCT, large cohort study (n>1000)
- Grade B: Smaller RCT, mechanistic study, cohort (n<1000)
- Grade C: Observational study, case series
- Grade D: Case report, expert opinion, anecdotal

---

## 2025-01-26: No Unsourced Probabilities Rule

**Decision:** Require documented source for ALL probabilities in Bayesian calculations

**Rationale:**
- Trustworthiness depends on reproducibility
- Institutional branding requires audit trail
- "It shouldn't be up to me. It should be what does the math say."
- Prevents arbitrary confidence estimates

**Source:** Discussion about institutional credibility, Steve Midgley feedback about organizational branding

**Status:** Mandatory for all new abstracts

**Implementation:**
- Every prior must cite empirical base rate, mechanistic reasoning, or expert survey
- Every P(E|H) must cite detection rate from literature
- Every P(E|~H) must cite false positive rate research
- Use conservative defaults when no source available (and document why)

**Quality check:** If reviewer finds unsourced probability, abstract returns for revision

---

## 2025-01-26: Bayesian Calculator Tool

**Decision:** Use https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php

**Rationale:**
- Free and accessible to anyone
- Reliable third-party verification
- Allows independent reproduction of calculations
- Prefer external tool over custom calculator (more trustworthy)

**Alternative considered:** Build custom calculator
**Why rejected:** Prefer third-party verification. Users might question our calculator but can trust established tool.

**Status:** Adopted

**Requirement:** All Bayesian updates must be verifiable using this calculator

---

## 2025-01-26: Provenance Transparency v1.1

**Decision:** Mandatory provenance disclaimers in every abstract

**Rationale:**
- Users must know who submitted (and potential biases)
- Must know what this is NOT (not FDA, not official authority)
- Must have concrete verification pathways
- Epistemic honesty requires acknowledging limitations

**Source:** Schema v1.1 updates, learning from creatine example

**Status:** Adopted

**Required sections:**
- submittedBy + institutionType
- notSubmittedByAuthority (explicit statement)
- verificationStatus (peer review status)
- potentialBiases (minimum 3)
- howToVerify (minimum 3 concrete steps)
- updateMechanism
- transparencyCommitment

---

## 2025-01-26: Conservative Probability Defaults

**Decision:** When uncertain about probability, round toward lower confidence

**Rationale:**
- Better to underestimate certainty than overestimate
- Builds trust (not inflating confidence)
- Aligns with epistemic humility
- Safer for users

**Status:** Adopted

**Rules:**
- Uncertain about P(E|H)? Round DOWN (weaker evidence)
- Uncertain about P(E|~H)? Round UP (weaker evidence)
- Result: Conservative confidence estimates

**Example:**
- Uncertain if RCT detection rate is 0.80 or 0.90? Use 0.80
- Uncertain if false positive rate is 0.10 or 0.20? Use 0.20
- Result: BF = 0.80/0.20 = 4 (vs BF = 0.90/0.10 = 9 if aggressive)

---

## 2025-01-26: Peer Review Requirement

**Decision:** Every abstract must be reviewed by second person before publication

**Rationale:**
- Calculation errors catch before publication
- Reasonableness check (does confidence match intuition?)
- Quality control
- Accountability

**Status:** Adopted

**Review checklist:**
- Calculation verification (30 min)
- Reasonableness check (15 min)
- Provenance check (15 min)
- Sign-off with reviewer name + date

**Initial reviewers:**
- Steve Midgley (if willing)
- Domain experts (as available)
- Eventually: formal review board

---

## 2025-01-26: Confidence Cap at 0.999

**Decision:** Never allow confidence = 1.0, maximum 0.999 for canonical knowledge

**Rationale:**
- Epistemic humility structurally enforced
- Science is provisional, always possibility of error
- Even "canonical" knowledge (gravity, evolution) has p<1.0
- Distinguishes us from authorities claiming certainty

**Source:** Core philosophical principle from Rauch's "Constitution of Knowledge"

**Status:** Mandatory, enforced by schema validation

**Examples:**
- Creatine efficacy: 0.90 (canonical, but not 1.0)
- Climate change (CO₂ → warming): 0.999 (as close to certain as science gets)
- Passenger rights (established law): 0.85-0.90 (depends on case specifics)

---

## 2025-01-26: Documentation Architecture

**Decision:** Three-tiered documentation system

**Rationale:** 
- Need repeatability across context windows
- Need to scale beyond founder's knowledge
- Need institutional credibility

**Status:** Adopted

**Structure:**
- **CREATION_WORKFLOW.md:** Step-by-step guide for building abstracts (6-9 hours per abstract)
- **BAYESIAN_CALCULATION_METHOD.md:** Rigorous probability sourcing methodology
- **DECISIONS.md:** This file - track strategic choices over time

**Location:** 
- Claude Project folder (for continuity across conversations)
- Git repository `/docs` (for version control, public transparency)

---

## 2025-01-26: Target Completion - First 10 Abstracts

**Decision:** Build 10 abstracts across difficulty spectrum before seeking institutional partnerships

**Rationale:**
- Prove the system works
- Demonstrate value to potential partners
- Refine methodology through iteration
- Build credibility

**Status:** In Progress

**Timeline:**
- Weeks 1-2: 3 easy (Vitamin D, Intermittent Fasting, Omega-3)
- Weeks 3-4: 3 moderate (Minimum Wage, Body Cameras, Low-Carb/Low-Fat)
- Weeks 5-6: 2 hard (UBI, Glyphosate)
- Week 7: 2 hardest (Climate Change, COVID Vaccines)

**Success criteria:**
- All 10 abstracts peer-reviewed
- Calculations independently reproducible
- Provenance fully transparent
- Cover breadth: health, policy, scientific domains

---

## 2025-01-26: Business Model Validation Target

**Decision:** Validate value proposition with 3-5 potential customers per category before scaling

**Rationale:**
- Steve's guidance: "Could be a business with value to multiple industries"
- Need market validation before committing to open source vs commercial
- Preserve optionality

**Status:** Planned for Phase 2 (after 10 abstracts complete)

**Target customers:**
- Journalism/fact-checking: 3-5 news orgs
- Health tech: 3-5 supplement/wellness apps
- Policy think tanks: 3-5 organizations
- Legal tech: 3-5 firms
- Research institutions: 3-5 universities

**Key question:** "Would you pay $X/year for access to Bayesian fact-checked knowledge abstracts?"

**Pricing exploration:**
- Journalism: $10k-50k/year
- Health tech: API fees $0.01-0.10/query
- Think tanks: $25k-100k/year
- Legal tech: $50k-200k/year
- Research: $50k-150k/year

---

## 2025-01-26: Hatch Act Clearance Strategy

**Decision:** Develop privately, seek clearance as "personal project" not "government outreach"

**Rationale:**
- Since pivot to private development (not Congressional lobbying), Hatch Act concerns reduced
- "Developing fact-checking tool" easier to clear than "federated infrastructure for government agencies"
- Can transition to full-time if gains traction

**Status:** Pending clearance request to General Counsel

**Safe harbor practices:**
- Personal time only
- Personal equipment
- No DON affiliation
- No government resources
- Clear "personal project" disclaimers

---

## Future Decisions to Track

**Pending decisions:**
- Open source vs commercial vs hybrid model (decide after market validation)
- Non-profit vs for-profit structure (depends on revenue model)
- Institutional partnership terms (after proof of concept)
- Smart contract governance deployment (after 50+ abstracts)

---

## Decision Review Process

**Quarterly review:** Re-evaluate major decisions

**Next review:** 2025-04-26 (after ~10 abstracts completed)

**Questions for review:**
1. Is methodology working? (Can create abstracts in 6-9 hours?)
2. Are calculations trusted? (Peer reviewers finding issues?)
3. Is provenance clear? (Users able to verify?)
4. Are we learning? (Each abstract easier than last?)
5. Should any decisions be revised?

---

**How to contribute to this log:**

When making a significant decision:
1. Add entry with date, decision, rationale, source
2. Mark status (Adopted, Under Review, or Superseded)
3. Note implications for workflow/standards
4. Commit to git with clear message

This log ensures continuity across context windows and team members.

---

**Version:** 1.0 (2025-01-26)
