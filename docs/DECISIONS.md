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
## D-YYYY-NNN: [Decision Title]
- **D** stands for Decision. 
- **YYYY** is the year.
- **NNN** is a sequential number (e.g., 001, 002)
**Decision:** [What we decided]
**Rationale:** [Why we decided this]
**Source:** [What informed this decision]
**Status:** [Adopted | Under Review | Superseded]
**Supersedes:** [Previous decision, if applicable]
```

---

## 2025-12-06: Structured Disagreement Knowledge Collection Schema
**Decision:** Introduce a new JSON schema type (`@type: CollectionPage`) to group related, contested, or multi-faceted knowledge claims (e.g., Minimum Wage effects). Each knowledge claim abstract remains 'One Claim,' but the Collection acts as a master index for navigating and communicating *structured disagreement*.
**Rationale:** The strict "One Abstract = One Claim" rule (2025-11-05 decision) failed to scale for complex policy/scientific topics that involve multiple, equally valid claims (e.g., employment vs. poverty effects of minimum wage) where confidence levels differ. The Collection schema preserves this necessary nuance and enables the **Confidence Slider** UX (as defined in `UXUI.md`) to filter *collections* of related claims.
**Source:** Development of minimum-wage-master-collection-2025.json and feedback on Abstract #20 complexity.
**Status:** Adopted
**Implications:** Requires a new `CollectionPage` schema and frontend support for displaying Collection metadata and linking related claims in the UI.

## 2025-11-06: Bayesian Documentation Integration

**Decision:** Integrated three Bayesian documents (BAYESIAN_REASONING.md, 
BAYESIAN_CALCULATION_METHOD.md, EVIDENCE_GRADING.md) into two-document 
system: BAYESIAN_STANDARD.md (methodology) and BAYESIAN_CALCULATION_METHOD.md 
(implementation).

**Rationale:** 
- Clearer separation: methodology vs. implementation
- Reduced duplication
- Added missing content (Inverse BF, conservative rounding, complete lookup tables)
- Archived tutorial content (available for educational use)

**Status:** Adopted

## 2025-11-06: Standardized Interpretation of Bayes Factors < 1 (Evidence Against Hypothesis)

**Decision:** The schema will include a new boolean field, `favorsNullHypothesis`, within the `probabilityProvenance` object. This field will explicitly indicate when evidence supports the null hypothesis (i.e., when $BF_H < 1$), enabling clearer, human-friendly interpretations in the UI and prose.

**Rationale:**

1.  **Clarity for Users:** Replaces the ambiguous "no significant differences" with a direct and interpretable statement like "no effect" or "no benefit," which aligns with the Bayesian framework's ability to provide evidence for absence.
2.  **Cognitive Load Reduction:** Simplifies the interpretation of Bayes Factors less than 1, where the inverse factor ($BF_{\neg H}$) more intuitively represents the strength of evidence *against* the original claim.
3.  **Machine Readability:** Provides a programmatic flag (`favorsNullHypothesis: true`) for UI systems to automatically render appropriate language and visual cues, ensuring consistent messaging.
4.  **Bayesian Consistency:** Leverages the power of Bayesian inference to explicitly quantify support for the null, avoiding the limitations of frequentist "failure to reject."

**Implementation:**

* **Schema Update:** Add `favorsNullHypothesis: boolean` to the `probabilityProvenance` object. Default to `false`.
* **Prose Standard:** When `favorsNullHypothesis` is `true`:
    * The `calculation` field will explain the inverse BF and its categorization.
    * The `factor` description and `conclusion.outcome.result` will use direct language such as "no effect found," "no benefit observed," or "evidence supports absence of difference."
* **UI Recommendation:** Implement clear visual indicators (e.g., specific icons, color coding, or tooltips) that translate `favorsNullHypothesis: true` into easy-to-understand statements for the user.

## 2025-11-06: Schema Version v1.2.0 Finalization & Evidence Rubric Update

**Decision:** The domain-agnostic schema is finalized as **v1.2.0**. We are also revising the **Bayesian Factor (BF) Rubric** and adopting a standard for **Inverse BF Interpretation**.

**Rationale:**
1.  **Rigor:** The previous BF 10-30 threshold was mathematically too conservative for the degree of posterior update seen in strong claims.
2.  **Clarity:** The Inverse BF standard eliminates confusion when evidence favors the null hypothesis (BF < 1).

**Supersedes:** BF thresholds defined in `EVIDENCE_GRADING.md` (v1.0.0).

**Implementation:**

* **BF Threshold Update:**
    * **BF 3-9** is **Moderate** (Previously 3-10).
    * **BF 9-30** is **Strong** (Previously 10-30).
* **Inverse BF Standard:** When evidence favors the null hypothesis ($\neg H$), the prose must refer to the **Inverse Bayes Factor** ($BF_{\neg H} > 1$) for categorization.
* **Schema:** The `submittedBy` field will be formalized as a structured object (see separate motion).

## 2025-11-06: Schema Refactoring for Fact-Checking Pivot

**Decision:** Refactor the `core-knowledge-schema.json` to be domain-agnostic for the "Factual Claim" domain, specifically supporting the Wikipedia/WayBack Machine pivot.

**Rationale:**

1. **Decoupling from Legal Domain:** The original schema was heavily reliant on legal fields (`jurisdiction`, `remedy`, `entitled`, `legalBasis`). The new focus on **epistemic confidence** requires a neutral vocabulary.
2. **Operationalizing Context:** The concept of tracking claims through time (like a WayBack Machine archive) requires a clear `context` field to replace the legal `jurisdiction`, defining the specific environment (time, source, revision number) under which the claim is being analyzed.
3. **Enhancing Generality:** The updated schema uses generic terms like `claimBasis` and `factuality` to ensure the structure can handle legal, scientific, or historical claims equally well, supporting future domain expansion.
4. **Maintaining Humility:** The core principle of probabilistic conclusions ($P(H) < 1.0$) is explicitly retained to differentiate the Bayesian approach from binary fact-checking.

**Source:** Legis Ledger Team Meeting, 2025-11-05; Gemini Analysis, 2025-11-06

**Status:** Adopted

**Implementation:**

* Removed `LegalRightKnowledge` from `@type` enum; added **`FactualClaimKnowledge`**.
* Replaced `jurisdiction` block with generic **`context`** block.
* Updated `conclusion` block to use **`factuality`** (`True`/`False`/`Uncertain`) instead of legal `entitled`/`remedy`.
* Renamed `evidenceBasis` to **`claimBasis`**.

## 2025-11-06: Schema Version v1.2.0 Finalization

**Decision:** The domain-agnostic schema is finalized as **v1.2.0**, incorporating changes from the fact-checking pivot and explicitly adopting the **Bayesian Factor (BF) Thresholds** as defined in `EVIDENCE_GRADING.md`.

**Rationale:**

1. **Governance:** Formally versioning the schema to allow for future backward compatibility tracking.
2. **Rigor:** Codifying the **BF 3-10 = Moderate** and **BF 10-30 = Strong** thresholds ensures all contributors use a consistent, high standard for evidence interpretation, moving away from subjective verbal descriptions.
3. **Completion:** Integrates the required `context` and `claimBasis` blocks from the v1.1.0 development phase.

**Source:** Gemini Analysis & User Feedback on BF interpretation, 2025-11-06; Schema Review 2025-11-06

**Status:** Adopted

**Implementation:**

* Schema version officially set to `1.2.0`.
* All future abstract generation must ensure BF-to-Interpretation mapping adheres strictly to the **BF 3-10 (Moderate)** rule.

## 2025-11-05: Claim Granularity Architecture - One Abstract = One Claim

**Decision:** One JSON abstract contains ONE primary claim with full Bayesian analysis. Related claims listed with summary info (confidence + evidence grade + funnel position) and pointer to their own full abstracts.

**Rationale:**

User feedback: Confusion about which metadata (evidence grade, funnel position) applies to which claim when multiple claims in one file
Clarity: Each abstract tells one coherent story without ambiguity
Independent updates: Can update bone health evidence without touching dementia claim
Easier querying: APIs can filter by claim type cleanly
Simpler for users: "Does vitamin D prevent dementia?" → get ONE focused answer

**Source:** User review of vitamin-d-dementia-prevention-2025.json, 2025-11-05

**Status:** Adopted

**Implementation:**

Each claim gets own JSON file (e.g., vitamin-d-bone-health-2025.json, vitamin-d-dementia-prevention-2025.json)
relatedClaims section enhanced with evidenceGrade and funnelPosition fields
Master index files (e.g., vitamin-d-master-index-2025.json) link related claims for topics with multiple claims
Schema updated to formalize this structure

**Trade-off:** More files to manage (7 vitamin D claims = 7 files), but Git handles this well. Master index provides navigation.

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
