# Evidence and Confidence: Grading Systems in Legis Ledger

**Version:** 1.0.0  
**Last Updated:** January 25, 2025  
**Purpose:** Unified reference for all confidence and evidence quality measures

---

## Overview

Legis Ledger uses **three complementary grading systems** to communicate confidence and evidence quality. Each serves a different purpose, and together they provide a complete picture of knowledge reliability.

**Why three systems?**
- Each answers a different question
- They measure different aspects of epistemic quality
- Using all three prevents false precision
- Makes limitations explicit

**The three systems:**
1. **Bayes Factors** → How strong is this specific piece of evidence?
2. **Validation Funnel** → How well-established is this knowledge overall?
3. **Probability Provenance Grade** → How did we get these confidence numbers?

**This document explains each system, when to use which, and how they interact.**

---

## System 1: Bayes Factors (Evidence Strength)

### Purpose
**Question answered:** "How much should this specific piece of evidence change my belief?"

### What It Measures
The **strength of individual evidence items** in updating from prior to posterior.

### Scale

| Bayes Factor (BF) | Interpretation | Meaning |
|-------------------|----------------|---------|
| **BF > 100** | Decisive | Evidence overwhelmingly favors hypothesis |
| **BF 30-100** | Very strong | Evidence strongly supports hypothesis |
| **BF 10-30** | Strong | Evidence clearly supports hypothesis |
| **BF 3-10** | Moderate | Evidence somewhat supports hypothesis |
| **BF 1-3** | Weak | Evidence barely supports hypothesis |
| **BF ≈ 1** | No evidence | Evidence doesn't favor either way |
| **BF < 1** | Against | Evidence favors alternative hypothesis |

### Formula
```
BF = P(Evidence | Hypothesis True) / P(Evidence | Hypothesis False)
```

### Examples

**Example 1: Mechanical issue documented in flight logs (Passenger Rights)**
```
P(logs show mechanical | passenger entitled) = 0.92
P(logs show mechanical | passenger not entitled) = 0.08

BF = 0.92 / 0.08 = 11.5 ≈ 12

Interpretation: STRONG evidence (10-30 range)
```

**Example 2: Meta-analysis shows creatine effect (Scientific)**
```
P(see this effect size | creatine works) = 0.98
P(see this effect size | creatine doesn't work) = 0.08

BF = 0.98 / 0.08 = 12.25 ≈ 12

Interpretation: STRONG evidence (10-30 range)
```

**Example 3: Single small study with positive result**
```
P(positive result | hypothesis true) = 0.80
P(positive result | hypothesis false) = 0.50

BF = 0.80 / 0.50 = 1.6

Interpretation: WEAK evidence (1-3 range)
```

### When to Use
- **Inside `bayesianAnalysis.evidence[]` array**
- For each individual piece of evidence
- To show how strongly each factor updates belief

### What It Doesn't Tell You
- ❌ Overall confidence in conclusion
- ❌ Whether conclusion is "settled" or "contested"
- ❌ Where numbers came from (empirical vs. estimated)

---

## System 2: Validation Funnel (Knowledge Maturity)

### Purpose
**Question answered:** "How well-established is this knowledge in the broader scientific/legal/policy community?"

### What It Measures
The **maturity and acceptance** of knowledge claims through Rauch's validation funnel (from *The Constitution of Knowledge*, 2021).

### Conceptual Model
```
WIDE END → Anyone can propose anything (speculation)
    ↓
MIDDLE → Peer review, replication, checking (testing)
    ↓
NARROW END → "Generally accepted" → "Well confirmed" → "Canonical"
```

### Scale

| Funnel Position | Confidence Range | Characteristics | Example |
|----------------|------------------|-----------------|---------|
| **Wide End (Speculation)** | 0.20-0.50 | Preliminary hypothesis, single study, not replicated | "New molecule might treat Alzheimer's" |
| **Middle (Testing)** | 0.50-0.70 | Multiple studies, some replication, emerging consensus | "UBI pilot programs show poverty reduction" |
| **Narrow (Confirmed)** | 0.70-0.90 | Strong evidence, well-replicated, broad consensus | "Passenger entitled to EU 261 compensation" |
| **Narrow (Canonical)** | 0.90-0.999 | Decades of testing, overwhelming consensus, predictive power | "CO₂ causes warming", "Creatine increases muscle mass" |

### Key Principle
**We never allow 1.0 (absolute certainty).** Epistemic humility is structurally enforced. Even canonical knowledge remains provisional.

### Operationalization

**How we determine funnel position:**

1. **Time tested** - How long has this been studied?
   - <5 years: Wide/Middle
   - 5-15 years: Middle/Narrow
   - 15+ years: Narrow (if replicated)

2. **Replication** - How many independent confirmations?
   - <3 studies: Wide
   - 3-10 studies: Middle
   - 10-50 studies: Narrow
   - 50+ studies: Narrow-Canonical

3. **Consensus** - What % of experts agree?
   - <60%: Wide/Middle (contested)
   - 60-80%: Middle/Narrow (emerging)
   - 80-95%: Narrow (strong)
   - 95%+: Narrow-Canonical (overwhelming)

4. **Predictive power** - Do predictions come true?
   - Untested: Wide
   - Mixed results: Middle
   - Consistently accurate: Narrow

### Examples by Domain

**Legal (Narrow End - Confirmed):**
- **Claim:** EU 261/2004 mechanical delay entitles compensation
- **Time:** 20+ years since regulation (2004)
- **Replication:** Thousands of enforcement cases
- **Consensus:** Clear ECJ precedent (C-549/07)
- **Funnel:** Narrow-confirmed (0.85 confidence)

**Scientific (Narrow End - Canonical):**
- **Claim:** Creatine + training increases lean body mass
- **Time:** 25+ years of research (1992-2025)
- **Replication:** 500+ studies, 95% replication rate
- **Consensus:** ISSN, IOC, AIS all agree
- **Predictive:** Mechanism predictions all validated
- **Funnel:** Narrow-canonical (0.90 confidence)

**Policy (Middle - Testing):**
- **Claim:** UBI at $1,000/month reduces poverty in US cities
- **Time:** <10 years of pilot programs
- **Replication:** 3-5 pilots, mixed results
- **Consensus:** Ideologically divided (~50-60%)
- **Funnel:** Middle-testing (0.65 confidence)

### When to Use
- **In `metadata.funnelPosition` field**
- For overall knowledge claim status
- To communicate scientific maturity
- To show where on consensus spectrum

### What It Doesn't Tell You
- ❌ How individual pieces of evidence contribute
- ❌ Where probability numbers came from
- ❌ Whether evidence is empirical or theoretical

---

## System 3: Probability Provenance Grade (Data Quality)

### Purpose
**Question answered:** "How did we arrive at these specific probability values?"

### What It Measures
The **source and method** used to derive probabilities in Bayesian calculations.

### Scale

| Grade | Method | Characteristics | Example |
|-------|--------|-----------------|---------|
| **A: High Confidence** | Empirical base rates | Published data, n>1000, verifiable | Meta-analysis of 35 RCTs (creatine) |
| **B: Moderate Confidence** | Expert elicitation | Structured survey, n>20 experts | Survey of 50 aviation lawyers |
| **C: Low Confidence** | Theoretical modeling | Logical reasoning, precedent interpretation | EU 261 legal analysis |
| **D: Speculative** | Unjustified judgment | No provenance, "gut feeling" | ❌ **Not acceptable** |

### Detailed Definitions

#### Grade A: Empirical Base Rates
**Method:** Probabilities calculated from actual observed frequencies in large datasets

**Requirements:**
- ✅ Published data source (peer-reviewed or official statistics)
- ✅ Sample size: n > 1,000 (or comprehensive meta-analysis)
- ✅ Direct measurement of outcome
- ✅ Verifiable (anyone can check the source)

**Examples:**
```json
{
  "probabilityProvenance": {
    "method": "empirical-base-rate",
    "evidenceGrade": "A",
    "empiricalData": {
      "source": "Candow et al. (2022) meta-analysis",
      "dataset": "35 RCTs, 1,192 participants",
      "calculation": {
        "P_E_given_H": 0.98,
        "P_E_given_not_H": 0.08,
        "BF": 12.25,
        "rationale": "If creatine works, 98% probability meta-analysis detects effect. If doesn't work, 8% false positive rate."
      },
      "dataAccessibility": "Published open-access",
      "url": "https://doi.org/10.1016/j.nut.2022.111659"
    }
  }
}
```

**Why Grade A:**
- Numbers come from real observations
- Anyone can verify by checking source
- Sample size gives statistical power
- Replicable methodology

---

#### Grade B: Expert Elicitation
**Method:** Probabilities derived from structured survey of domain experts

**Requirements:**
- ✅ Minimum 20 experts surveyed
- ✅ Structured protocol (e.g., Delphi method)
- ✅ Expert qualifications documented
- ✅ Methodology transparent and reproducible

**Examples:**
```json
{
  "probabilityProvenance": {
    "method": "expert-elicitation",
    "evidenceGrade": "B",
    "expertElicitation": {
      "source": "Survey of EU aviation lawyers, 2024",
      "participants": 50,
      "qualifications": "Licensed aviation attorneys in France, Germany, Netherlands",
      "methodology": "Modified Delphi method, 2 rounds",
      "question": "If mechanical issue documented in logs and delay >3hrs, what % of EU 261 claims succeed?",
      "medianResponse": 0.88,
      "confidenceInterval": [0.82, 0.94],
      "consensus": "High (IQR: 0.85-0.92)"
    }
  }
}
```

**Why Grade B:**
- Transparent but subjective
- Multiple experts reduce individual bias
- Reproducible survey method
- Better than pure theory, not as good as empirical data

---

#### Grade C: Theoretical Modeling
**Method:** Probabilities estimated through logical reasoning from theory, precedent, or mechanisms

**Requirements:**
- ✅ Explicit reasoning provided
- ✅ Sources cited (case law, theory papers, etc.)
- ✅ Assumptions stated clearly
- ✅ Limitations acknowledged

**Examples:**
```json
{
  "probabilityProvenance": {
    "method": "theoretical-model",
    "evidenceGrade": "C",
    "theoreticalModel": {
      "P_E_given_H": {
        "estimate": 0.92,
        "reasoning": "ECJ Case C-549/07 unambiguously establishes mechanical issues are not extraordinary circumstances. With clear precedent and strong DGAC enforcement in France, estimate 90-95% success rate when mechanical documentation exists."
      },
      "P_E_given_not_H": {
        "estimate": 0.08,
        "reasoning": "Without mechanical cause, passenger faces higher evidentiary burden. Estimate 5-15% success rate based on general claims without clear documentation."
      },
      "basis": "Legal precedent interpretation (ECJ C-549/07) + enforcement reputation (DGAC)",
      "limitations": [
        "No public statistics on actual claim outcomes",
        "Probabilities are educated estimates, not empirical measurements",
        "Real-world success rates may differ"
      ]
    }
  }
}
```

**Why Grade C:**
- No empirical validation
- Subjective estimation
- But still transparent and falsifiable
- Honest about limitations

---

#### Grade D: Speculative (Not Acceptable)
**Method:** No justification, pure assertion

**❌ NOT ALLOWED IN LEGIS LEDGER**

**What it looks like:**
```json
{
  "probabilityProvenance": {
    "method": "unjustified-judgment",
    "evidenceGrade": "D",
    "note": "Seems like 90% to me"
  }
}
```

**Why we reject this:**
- No transparency
- No verifiability
- No accountability
- Undermines entire mission

**If you can't provide Grade A, B, or C provenance, you can't submit a claim.**

---

### When to Use
- **In `probabilityProvenance` field within each `evidence` item**
- When showing where Bayes Factor probabilities came from
- To enable users to assess data quality
- To maintain transparency and verifiability

### What It Doesn't Tell You
- ❌ How strong the evidence is (that's Bayes Factors)
- ❌ How mature the knowledge is (that's Funnel Position)
- ❌ The final confidence level (that's posterior probability)

---

## How the Three Systems Interact

### They Answer Different Questions

| System | Question | Example Answer |
|--------|----------|----------------|
| **Bayes Factor** | How strong is this evidence? | "BF = 12 (strong)" |
| **Funnel Position** | How mature is the knowledge? | "Narrow-canonical (25+ years)" |
| **Provenance Grade** | Where did the numbers come from? | "Grade A (meta-analysis)" |

### They Can Diverge (And That's OK)

**Example 1: Strong Evidence, Grade C Provenance**
- **Claim:** Passenger entitled to EU 261 compensation
- **Bayes Factor:** 12 (strong evidence from legal precedent)
- **Funnel Position:** Narrow-confirmed (20 years of enforcement)
- **Provenance Grade:** C (theoretical - no public claim statistics)

**Interpretation:** The legal reasoning is sound and precedent is clear (strong BF), the law is well-established (narrow funnel), but we had to estimate probabilities because government doesn't publish claim success data (Grade C provenance).

**Example 2: Weak Single Study, Grade A Provenance**
- **Claim:** New drug reduces symptoms
- **Bayes Factor:** 2.5 (weak-to-moderate, single study)
- **Funnel Position:** Wide-speculation (no replication yet)
- **Provenance Grade:** A (published RCT with 500 participants)

**Interpretation:** We have real data (Grade A), but it's only one study (weak BF) and hasn't been replicated yet (wide funnel). Need more research.

**Example 3: Strong Consensus, Grade B Provenance**
- **Claim:** This policy will work in context X
- **Bayes Factor:** 8 (moderate-to-strong expert agreement)
- **Funnel Position:** Middle-testing (pilot programs ongoing)
- **Provenance Grade:** B (expert elicitation survey)

**Interpretation:** Experts agree it will probably work (moderate-strong BF), some early evidence exists (middle funnel), but based on expert judgment rather than published data (Grade B).

### Visual Decision Tree

```
START: You have a knowledge claim

Question 1: How strong is each piece of evidence?
→ Calculate Bayes Factors (System 1)
   → Ranges from 1 (weak) to 100+ (decisive)

Question 2: How mature/replicated is the overall knowledge?
→ Determine Funnel Position (System 2)
   → Wide (speculation) → Middle (testing) → Narrow (canonical)

Question 3: Where did the probability numbers come from?
→ Assign Provenance Grade (System 3)
   → A (empirical) → B (experts) → C (theory) → D (rejected)

RESULT: Complete transparency
→ Users see evidence strength, knowledge maturity, and data quality
```

---

## Examples Across All Three Systems

### Example 1: Creatine Supplementation (Scientific Domain)

**Claim:** Creatine + resistance training increases lean body mass

**Bayes Factors (System 1):**
- Mechanism studies: BF = 2.0 (weak)
- Early RCTs: BF = 3.5 (moderate)
- 2017 meta-analysis: BF = 8.0 (moderate-strong)
- 2022 comprehensive meta-analysis: BF = 12.0 (strong)
- Multiple systematic reviews: BF = 15.0 (strong)

**Funnel Position (System 2):**
- **Position:** Narrow-canonical
- **Justification:** 25+ years (1992-2025), 500+ studies, 95% replication rate, overwhelming consensus (ISSN, IOC, AIS)

**Provenance Grade (System 3):**
- **Grade:** A (Empirical base rates)
- **Source:** Candow et al. (2022) - 35 RCTs, 1,192 participants
- **Verifiable:** DOI: 10.1016/j.nut.2022.111659

**Final Confidence:** 0.90

**Interpretation:** Strong evidence (BF 12-15), canonical knowledge (25+ years), empirical data (Grade A). High confidence justified.

---

### Example 2: Passenger Rights (Legal Domain)

**Claim:** Passenger entitled to €600 for mechanical delay >3hrs from France

**Bayes Factors (System 1):**
- EU departure (France): BF = 2.8 (moderate)
- Delay >3 hours (4 hours): BF = 1.9 (weak)
- Mechanical documented: BF = 12.0 (strong)
- Airline claims weather: BF = 0.45 (decreases confidence)

**Funnel Position (System 2):**
- **Position:** Narrow-confirmed
- **Justification:** 20+ years since regulation (2004), clear ECJ precedent (C-549/07), strong DGAC enforcement

**Provenance Grade (System 3):**
- **Grade:** C (Theoretical modeling)
- **Source:** Legal precedent interpretation, no public claim statistics
- **Limitations:** Probabilities are educated estimates based on case law

**Final Confidence:** 0.85

**Interpretation:** Strong legal precedent (BF 12 for key factor), well-established law (narrow funnel), but probabilities estimated not empirical (Grade C). Good confidence but acknowledges data limitation.

---

### Example 3: Universal Basic Income (Policy Domain)

**Claim:** UBI at $1,000/month reduces poverty in urban US populations

**Bayes Factors (System 1):**
- Mechanism plausible: BF = 2.0 (weak)
- Pilot programs show effect: BF = 3.5 (moderate)
- Meta-analysis of cash transfers: BF = 5.0 (moderate)

**Funnel Position (System 2):**
- **Position:** Middle-testing
- **Justification:** <10 years of pilot programs, 3-5 studies, ideologically contested (~50-60% support), mixed results

**Provenance Grade (System 3):**
- **Grade:** B (Expert elicitation) or C (Theoretical)
- **Source:** Depends on whether expert survey conducted or just policy analysis
- **Limitations:** Pilot programs are not at scale, different contexts

**Final Confidence:** 0.65

**Interpretation:** Moderate evidence (BF 3-5), still being tested (middle funnel), based on experts or theory (Grade B/C). Moderate confidence appropriate - need more data.

---

## Guidelines for Contributors

### When Submitting a Knowledge Claim

**You MUST provide:**
1. ✅ Bayes Factors for each evidence item (with calculations)
2. ✅ Justification for funnel position
3. ✅ Probability provenance for each BF (Grade A, B, or C)

**Template:**
```json
{
  "bayesianAnalysis": {
    "evidence": [
      {
        "factor": "Description of evidence",
        "bayesFactor": 12.0,
        "probabilityProvenance": {
          "method": "empirical-base-rate | expert-elicitation | theoretical-model",
          "evidenceGrade": "A | B | C",
          // Include appropriate detailed block based on grade
        }
      }
    ]
  },
  "metadata": {
    "funnelPosition": "narrow-end-canonical",
    "funnelJustification": "Explain time tested, replication, consensus"
  }
}
```

### Choosing the Right Provenance Grade

**Use Grade A if:**
- ✅ You have published statistics (n > 1000)
- ✅ Meta-analyses exist
- ✅ Data is publicly accessible
- ✅ Anyone can verify your numbers

**Use Grade B if:**
- ✅ You conducted or can reference an expert survey
- ✅ Minimum 20 qualified experts
- ✅ Structured methodology
- ✅ Results documented and reproducible

**Use Grade C if:**
- ✅ You're reasoning from theory, precedent, or mechanism
- ✅ No empirical data exists
- ✅ You can explain your reasoning explicitly
- ✅ You acknowledge limitations

**Never use Grade D** (pure assertion with no justification)

### What Happens if Grades Don't Match Evidence Strength?

**That's OK!** The systems measure different things.

**Example:** You can have:
- Strong Bayes Factor (BF = 12)
- With Grade C provenance (theoretical estimate)
- In narrow funnel position (well-established law)

This means: "The legal reasoning is sound, but we estimated the probabilities because empirical data doesn't exist."

**Be honest.** Don't inflate provenance grade to match confidence level.

---

## For Reviewers: How to Validate Submissions

### Check Bayes Factors
- [ ] Is BF calculation shown?
- [ ] Do P(E|H) and P(E|¬H) make sense?
- [ ] Does BF label match table (weak/moderate/strong)?
- [ ] Are all BFs accounted for in the evidence array?

### Check Funnel Position
- [ ] How long has this been studied?
- [ ] What's the replication rate?
- [ ] What % of experts agree?
- [ ] Do predictions match observations?
- [ ] Does position match confidence range?

### Check Provenance Grade
- [ ] Is method specified (empirical/expert/theoretical)?
- [ ] Grade A: Data source cited? Sample size > 1000?
- [ ] Grade B: Survey details? Minimum 20 experts?
- [ ] Grade C: Reasoning explicit? Limitations acknowledged?
- [ ] Grade D: Reject immediately (no justification)

### Red Flags
- 🚩 High confidence (>0.85) with Grade C provenance → Question if appropriate
- 🚩 BF labeled "strong" but value is 4.5 → Mislabeled (should be "moderate")
- 🚩 Narrow-canonical funnel but <5 years of study → Contradiction
- 🚩 Grade A claimed but no data source provided → Validate or downgrade

---

## Frequently Asked Questions

### Q: Why not just use one overall grade?

**A:** Because different questions need different measures.

- **Bayes Factor:** Evidence strength (per item)
- **Funnel Position:** Knowledge maturity (overall)
- **Provenance Grade:** Data quality (per calculation)

Collapsing into one number loses critical information.

### Q: Can I have high confidence with Grade C provenance?

**A:** Yes, if the theoretical reasoning is sound and evidence is strong.

**Example:** EU 261 passenger rights (0.85 confidence, Grade C) works because:
- Legal precedent is crystal clear (strong BF)
- Law has been tested for 20+ years (narrow funnel)
- Even though we don't have claim statistics (Grade C)

But we're **transparent** about the limitation.

### Q: Should I aim for Grade A always?

**A:** Aim for the highest grade truthfully achievable.

- If empirical data exists → Use it (Grade A)
- If no data but experts available → Survey them (Grade B)
- If neither → Theoretical modeling is OK (Grade C)

**Don't fake Grade A.** Grade C with honest limitations beats fake Grade A.

### Q: What if two institutions disagree on funnel position?

**A:** That's structured disagreement in action!

- Institution 1: "This is narrow-canonical" (0.90 confidence)
- Institution 2: "This is middle-testing" (0.60 confidence)

Both can coexist in the system. Users see both perspectives with reasoning.

### Q: How do I calculate Bayes Factors from meta-analyses?

**A:** Use statistical power and Type I error:

```
If n=1000, effect size d=0.5:
- Power = 0.99 (probability of detecting true effect)
- Alpha = 0.05 (false positive rate)

P(E|H) = 0.99
P(E|¬H) = 0.05

BF = 0.99 / 0.05 = 19.8 ≈ 20 (strong evidence)
```

See BAYESIAN_REASONING.md for detailed examples.

---

## Summary Table: Three Systems at a Glance

| Aspect | Bayes Factors | Funnel Position | Provenance Grade |
|--------|--------------|-----------------|------------------|
| **Measures** | Evidence strength | Knowledge maturity | Data quality |
| **Scale** | 0.1 to 100+ | Wide → Narrow | A → B → C (→ D rejected) |
| **Granularity** | Per evidence item | Per claim overall | Per probability |
| **Question** | How strong? | How established? | Where from? |
| **Example** | BF = 12 (strong) | Narrow-canonical | Grade A (meta-analysis) |
| **Can vary** | Yes (evidence varies) | No (one per claim) | Yes (by calculation) |
| **Location in JSON** | `bayesianAnalysis.evidence[].bayesFactor` | `metadata.funnelPosition` | `evidence[].probabilityProvenance.evidenceGrade` |

---

## Conclusion

**Three systems, one mission: Transparent knowledge infrastructure**

- **Bayes Factors** show evidence strength step-by-step
- **Funnel Position** shows knowledge maturity over time
- **Provenance Grade** shows data quality and verifiability

**Together, they enable:**
- ✅ Precise disagreement (not vague "experts disagree")
- ✅ Honest uncertainty (not false confidence)
- ✅ Verifiable reasoning (not black-box assertions)
- ✅ Gradual convergence (as evidence accumulates)

**This is epistemic humility operationalized.**

---

**For more details:**
- Bayes Factors: See BAYESIAN_REASONING.md
- Funnel Position: See ARCHITECTURE.md, "Validation Funnel" section
- Provenance Grades: See worked examples (Passenger Rights vs. Creatine)

**Last Updated:** January 25, 2025  
**Version:** 1.0.0  
**Status:** Reference document for all contributors and reviewers
