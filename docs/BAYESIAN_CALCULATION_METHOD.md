# Bayesian Calculation Method: Implementation Guide

**Version:** 2.0  
**Date:** 2025-11-06  
**Purpose:** Detailed operational guide for calculating Bayesian confidence with full transparency  
**Authoritative Methodology:** See BAYESIAN_STANDARD.md v2.2

---

## Overview

This document is the **operational implementation guide** for creating Bayesian knowledge abstracts. For high-level methodology and governance, see **BAYESIAN_STANDARD.md**.

**Document relationship:**
- **BAYESIAN_STANDARD.md** → What and why (methodology, principles)
- **BAYESIAN_CALCULATION_METHOD.md** → How (detailed instructions, lookup tables)

---

## Core Principle

> **"It shouldn't be up to me. It should be what does the math say."**

**Every probability must have a documented, verifiable source.**

**No gut feelings. No arbitrary numbers. No black boxes.**

---

## The Trust Problem

**Question:** "How do I know you didn't just make up these probabilities?"

**Answer:** Every number traces to:
1. Published research (empirical base rates)
2. Established methodologies (Cochrane, GRADE)
3. Conservative defaults (when uncertain)
4. Independent verification (calculator tool)

---

## Step 1: Set Prior (Starting Confidence)

### Rule: Priors Must Come From One of These Sources

#### 1. Base Rates from Literature (BEST)

**Example:**
```json
{
  "prior": {
    "confidence": 0.60,
    "basis": "Base rate: 60% of vitamin supplements show health benefits in large RCTs",
    "source": "Fortmann et al. (2013) Annals of Internal Medicine meta-analysis of vitamin/mineral supplements",
    "sourceURL": "https://doi.org/10.7326/0003-4819-159-12-201312170-00729",
    "method": "base-rate"
  }
}
```

**How to find base rates:**
- Search: "[domain] intervention success rate meta-analysis"
- Example: "dietary supplement efficacy systematic review"
- Use overall success percentage as prior

#### 2. Mechanistic Plausibility (GOOD)

**Example:**
```json
{
  "prior": {
    "confidence": 0.55,
    "basis": "Vitamin D receptor exists in multiple tissues (plausible mechanism), but many plausible mechanisms fail in RCTs. Historical success rate ~50-60%.",
    "source": "Endocrinology textbooks (mechanism) + Fortmann et al. 2013 (historical success rate)",
    "method": "mechanistic"
  }
}
```

**Conservative adjustment:**
- Plausible mechanism alone = 0.50 (maximum entropy)
- Plausible + some pilot data = 0.55-0.60
- Strong mechanism + positive mechanistic studies = 0.60-0.70

#### 3. Expert Surveys (ACCEPTABLE)

**Example:**
```json
{
  "prior": {
    "confidence": 0.52,
    "basis": "Survey of 100 board-certified endocrinologists: mean estimated probability 52%",
    "source": "Smith et al. (2024) Endocrine Society member survey",
    "sourceURL": "https://doi.org/...",
    "method": "expert-survey"
  }
}
```

**Requirements:**
- Actual published survey (not hypothetical)
- Sample size >30 experts
- Domain-relevant expertise
- Method disclosed (Delphi, simple survey, etc.)

#### 4. Historical Precedent (FALLBACK)

**Example:**
```json
{
  "prior": {
    "confidence": 0.50,
    "basis": "Similar vitamin interventions (A, C, E) showed benefits in approximately 50% of large trials",
    "source": "Historical analysis of vitamin RCT outcomes (Fortmann et al. 2013)",
    "method": "historical"
  }
}
```

#### 5. Conservative Default (WHEN NO SOURCE AVAILABLE)

**When truly uncertain and no source available:**
- Use 0.50 (maximum entropy, no bias)
- Document: "No empirical base rate available. Using 0.50 as uninformative prior."

### NEVER ALLOWED

❌ "Seems like 0.60" (gut feeling)  
❌ "I think 0.50 is reasonable" (arbitrary)  
❌ "Let's start at 0.70" (unjustified)  
❌ "My intuition says..." (not documented)

---

## Step 2: Evidence Updates (One at a Time)

### Bayes Factor Formula

**BF = P(Evidence | Hypothesis True) / P(Evidence | Hypothesis False)**

Where:
- P(E|H) = Probability we'd observe this evidence if hypothesis is true
- P(E|~H) = Probability we'd observe this evidence if hypothesis is false
- BF > 1: Evidence supports hypothesis
- BF < 1: Evidence contradicts hypothesis (favors null)
- BF = 1: Evidence is neutral

---

## CRITICAL UPDATE (2025-11-06): Handling BF < 1

### When Evidence Favors Null Hypothesis

**If BF < 1, you must:**

1. **Set `favorsNullHypothesis: true`** in probabilityProvenance
2. **Calculate Inverse BF:** Inverse BF = 1 / BF
3. **Interpret using Inverse BF** with updated thresholds
4. **Use clear language:** "Evidence suggests no effect" (not "failed to find effect")

**Example:**

```json
{
  "factor": "Large RCT shows null result (HR = 0.98, p=0.82)",
  "increases": false,
  "posteriorAfter": 0.35,
  "bayesFactor": 0.25,
  "reasoning": "Well-powered RCT finding null result provides evidence AGAINST the hypothesis. Inverse BF = 4.0 indicates moderate evidence supporting no effect.",
  "probabilityProvenance": {
    "method": "empirical-base-rate",
    "evidenceGrade": "A",
    "favorsNullHypothesis": true,
    "calculation": {
      "P_E_given_H": 0.20,
      "P_E_given_H_reasoning": "If effect exists, only 20% chance of seeing null result in well-powered RCT (Type II error rare with adequate power)",
      "P_E_given_H_source": "Statistical power calculations for RCTs with n>1000, 90% power",
      "P_E_given_not_H": 0.80,
      "P_E_given_not_H_reasoning": "If no effect exists, expect null result 80% of time (allowing for 5% false positives + some noise)",
      "P_E_given_not_H_source": "Standard RCT methodology, α=0.05",
      "BF": 0.25,
      "BF_calculation": "0.20 / 0.80 = 0.25",
      "Inverse_BF": 4.0,
      "Inverse_BF_calculation": "1 / 0.25 = 4.0",
      "Inverse_BF_interpretation": "Inverse BF = 4.0 is moderate evidence FOR the null hypothesis (no effect). Updated thresholds: BF 3-9 = Moderate, BF 9-30 = Strong."
    }
  }
}
```

---

## Standard Probability Lookup Tables

### Evidence Detection Rates (P(E|H))

**If hypothesis is TRUE, how likely would we detect it?**

| Evidence Type | P(E\|H) | Source |
|---------------|---------|--------|
| **Meta-analysis (well-conducted)** | 0.90-0.95 | Cochrane methodology - meta-analyses detect true effects 90-95% of time |
| **Large RCT (n>1000, 90% power)** | 0.85-0.90 | Power calculations - high power trials detect most true effects |
| **Medium RCT (n=200-1000, 80% power)** | 0.75-0.85 | Standard power calculations |
| **Small RCT (n<200)** | 0.60-0.75 | Underpowered studies often miss real effects |
| **Strong observational (well-adjusted)** | 0.60-0.75 | Hill's criteria - well-conducted observational studies |
| **Weak observational** | 0.50-0.65 | High confounding risk |
| **Mechanistic study** | 0.75-0.85 | Lab confirmation of mechanism |
| **Case series** | 0.40-0.60 | Very limited inference capability |

**Sources:**
- Cochrane Handbook for Systematic Reviews
- Standard statistical power analysis textbooks
- Hill's criteria for causation literature

---

### False Positive Rates (P(E|~H))

**If hypothesis is FALSE, how likely would we still see this evidence?**

| Evidence Type | P(E\|~H) | Source |
|---------------|----------|--------|
| **Meta-analysis** | 0.05-0.10 | Low false positive risk in well-conducted synthesis |
| **Large RCT** | 0.10-0.15 | α=0.05 + modest publication bias |
| **Medium RCT** | 0.15-0.20 | Higher bias risk in smaller trials |
| **Small RCT** | 0.20-0.30 | Publication bias + p-hacking risks |
| **Strong observational** | 0.30-0.50 | Confounding common even with adjustment |
| **Weak observational** | 0.40-0.60 | Very high spurious association risk |
| **Mechanistic** | 0.35-0.50 | Mechanism can exist without clinical effect |
| **Case series** | 0.40-0.60 | High spurious association rate |

**Sources:**
- Ioannidis (2005) "Why Most Published Research Findings Are False"
- Publication bias research (Franco et al. 2014)
- Standard false positive rates (α=0.05 adjusted for real-world conditions)

---

## Updated BF Interpretation Thresholds (2025-11-06)

| Bayes Factor | Interpretation | Real-World Context |
|--------------|----------------|-------------------|
| **BF > 100** | Decisive | Rare: forensics, physics, climate (orthogonal evidence types) |
| **BF 30-100** | Very Strong | Uncommon: exceptional consensus, multiple independent meta-analyses |
| **BF 9-30** | Strong | Realistic for well-established effects, high-quality meta-analyses |
| **BF 3-9** | Moderate | Common for solid RCTs, consistent observational findings |
| **BF 1-3** | Weak | Small studies, preliminary evidence |
| **BF = 1** | Neutral | Evidence doesn't favor either hypothesis |
| **BF < 1** | Favors Null | Calculate Inverse BF and interpret with thresholds above |

**Previous thresholds (pre-2025-11-06):** BF 3-10 = Moderate, BF 10-30 = Strong  
**Updated thresholds:** BF 3-9 = Moderate, BF 9-30 = Strong

---

## Method A: Empirical Base Rates (PREFERRED)

### Example 1: Meta-Analysis Shows Positive Effect

**Question:** If our hypothesis is true, how likely would we see a positive meta-analysis?

```json
{
  "P_E_given_H": 0.95,
  "P_E_given_H_reasoning": "Meta-analyses detect true effects 90-95% of the time (high statistical power from aggregating studies)",
  "P_E_given_H_source": "Cochrane Handbook for Systematic Reviews, Section 3.2: Meta-analysis detection rates",
  "P_E_given_H_sourceURL": "https://training.cochrane.org/handbook",
  
  "P_E_given_not_H": 0.10,
  "P_E_given_not_H_reasoning": "False positive rate ~5-10% due to publication bias and Type I errors at α=0.05",
  "P_E_given_not_H_source": "Ioannidis (2005) 'Why Most Published Research Findings Are False' + meta-analysis methodology",
  "P_E_given_not_H_sourceURL": "https://doi.org/10.1371/journal.pmed.0020124",
  
  "BF": 9.5,
  "calculation": "0.95 / 0.10 = 9.5",
  "BF_interpretation": "BF = 9.5 is strong evidence supporting the hypothesis (just above the 9.0 threshold). Updated thresholds: BF 9-30 = Strong."
}
```

**Standard values for meta-analyses:**
- P(E|H): 0.90-0.95 (very reliable detection)
- P(E|~H): 0.05-0.10 (low false positive rate)
- **Source:** Cochrane methodology + Ioannidis publication bias research

---

### Example 2: Single RCT Shows Positive Effect

```json
{
  "P_E_given_H": 0.85,
  "P_E_given_H_reasoning": "Well-powered RCT detects true effect 80-90% of time (β=0.10-0.20)",
  "P_E_given_H_source": "Standard RCT power calculations, 80-90% power typical for well-designed trials",
  
  "P_E_given_not_H": 0.15,
  "P_E_given_not_H_reasoning": "Higher false positive risk than meta-analysis due to single study, publication bias",
  "P_E_given_not_H_source": "α=0.05 threshold + estimated 2-3x inflation from publication bias (Franco et al. 2014)",
  
  "BF": 5.7,
  "calculation": "0.85 / 0.15 = 5.7",
  "BF_interpretation": "BF = 5.7 is moderate evidence (in the 3-9 range) supporting the hypothesis."
}
```

**Standard values for RCTs:**
- P(E|H): 0.80-0.90 (depends on power)
- P(E|~H): 0.10-0.20 (single study, higher false positive risk)

---

### Example 3: Observational Study Shows Association

```json
{
  "P_E_given_H": 0.70,
  "P_E_given_H_reasoning": "Observational studies can detect true causal effects but confounding reduces reliability",
  "P_E_given_H_source": "Hill's criteria for causation; observational studies ~70% reliable when association is strong",
  
  "P_E_given_not_H": 0.40,
  "P_E_given_not_H_reasoning": "High risk of spurious associations from confounding, selection bias, measurement error",
  "P_E_given_not_H_source": "Ioannidis et al. research on observational study false positives",
  
  "BF": 1.75,
  "calculation": "0.70 / 0.40 = 1.75",
  "BF_interpretation": "BF = 1.75 is weak evidence (below the 3.0 threshold for Moderate). Observational data provides limited support."
}
```

**Standard values for observational:**
- P(E|H): 0.60-0.75 (moderate reliability)
- P(E|~H): 0.30-0.50 (high false positive risk)

---

### Example 4: RCT Shows Null Result (Evidence AGAINST Hypothesis)

```json
{
  "P_E_given_H": 0.15,
  "P_E_given_H_reasoning": "If effect truly exists, unlikely (15%) to see null result in well-powered RCT. Would expect positive result ~85% of time.",
  "P_E_given_H_source": "Statistical power calculations - well-powered RCT (80-90% power) should detect real effects",
  
  "P_E_given_not_H": 0.85,
  "P_E_given_not_H_reasoning": "If no true effect, expect null result 85% of time (5% false positive + remaining as true null)",
  "P_E_given_not_H_source": "Standard RCT methodology with α=0.05",
  
  "BF": 0.18,
  "calculation": "0.15 / 0.85 = 0.18",
  "BF_interpretation": "BF = 0.18 means evidence favors null hypothesis",
  
  "favorsNullHypothesis": true,
  "Inverse_BF": 5.67,
  "Inverse_BF_calculation": "1 / 0.18 = 5.67",
  "Inverse_BF_interpretation": "Inverse BF = 5.67 is moderate evidence (in the 3-9 range) SUPPORTING the null hypothesis (no effect exists). Updated thresholds: BF 3-9 = Moderate."
}
```

---

## Method B: Replication Rate (When Available)

**Example: Multiple Studies Replicate Finding**

```json
{
  "replicationData": {
    "totalStudies": 20,
    "supportingStudies": 18,
    "contradictingStudies": 2,
    "replicationRate": 0.90
  },
  
  "P_E_given_H": 0.90,
  "P_E_given_H_reasoning": "If effect is real, expect ~90% replication (some studies fail due to low power, methodological differences)",
  "P_E_given_H_source": "Open Science Collaboration (2015) replication psychology: true effects replicate 80-90%",
  
  "P_E_given_not_H": 0.15,
  "P_E_given_not_H_reasoning": "Seeing 18/20 positive very unlikely if no true effect (would require massive publication bias)",
  "P_E_given_not_H_source": "Binomial probability: P(k≥18|n=20,p=0.05) = 0.000002, but publication bias inflates to ~15%",
  
  "BF": 6.0,
  "calculation": "0.90 / 0.15 = 6.0",
  "BF_interpretation": "BF = 6.0 is moderate evidence (in the 3-9 range) supporting the hypothesis."
}
```

---

## Method C: Effect Size Consistency

**Example: Effect Sizes Converge Across Studies**

```json
{
  "effectSizeData": {
    "study1": "d = 0.45",
    "study2": "d = 0.52",
    "study3": "d = 0.48",
    "mean": 0.48,
    "stdDev": 0.04,
    "interpretation": "Tight range suggests real effect (not random noise)"
  },
  
  "P_E_given_H": 0.85,
  "P_E_given_H_reasoning": "If real effect exists, expect consistent effect sizes across studies (small variance)",
  "P_E_given_H_source": "Borenstein et al. (2009) Introduction to Meta-Analysis: homogeneity indicates true effect",
  
  "P_E_given_not_H": 0.20,
  "P_E_given_not_H_reasoning": "If no true effect, expect wide variance in effect sizes due to sampling error",
  "P_E_given_not_H_source": "Statistical theory: null hypothesis predicts high heterogeneity",
  
  "BF": 4.25,
  "calculation": "0.85 / 0.20 = 4.25",
  "BF_interpretation": "BF = 4.25 is moderate evidence (in the 3-9 range) supporting the hypothesis."
}
```

---

## Method D: Mechanistic Studies (Biological Plausibility)

**Example: Mechanism Confirmed in Lab**

```json
{
  "P_E_given_H": 0.80,
  "P_E_given_H_reasoning": "If clinical effect is real, underlying mechanism should be demonstrable in controlled lab settings",
  "P_E_given_H_source": "Hill's criteria: biological plausibility strengthens causal inference",
  
  "P_E_given_not_H": 0.40,
  "P_E_given_not_H_reasoning": "Mechanism can exist without clinical benefit (many plausible mechanisms don't translate to humans)",
  "P_E_given_not_H_source": "Translational medicine failure rate: ~60% of mechanisms don't produce clinical effects",
  
  "BF": 2.0,
  "calculation": "0.80 / 0.40 = 2.0",
  "BF_interpretation": "BF = 2.0 is weak evidence (below the 3.0 threshold) supporting the hypothesis. Mechanistic studies alone provide limited support."
}
```

**Standard values for mechanistic:**
- P(E|H): 0.75-0.85 (mechanism should exist if effect real)
- P(E|~H): 0.35-0.50 (mechanism can exist without clinical effect)

---

## Step 3: Update Posterior

### Bayes Formula

**Posterior Odds = Prior Odds × Bayes Factor**

Then convert back to probability:
**Posterior = Posterior Odds / (Posterior Odds + 1)**

### Example Calculation

**Starting point:**
- Prior = 0.60
- Prior Odds = 0.60 / 0.40 = 1.5

**Evidence 1: Meta-analysis (BF = 9.5)**
- Posterior Odds = 1.5 × 9.5 = 14.25
- Posterior = 14.25 / (14.25 + 1) = 14.25 / 15.25 = 0.934

**Evidence 2: Null result in different population (BF = 0.5)**
- Posterior Odds = 14.25 × 0.5 = 7.125
- Posterior = 7.125 / 8.125 = 0.877

### Calculator Tool

**Use:** https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php

**Input:**
- Prior probability
- P(E|H)
- P(E|~H)

**Output:**
- Posterior probability
- Verify against your calculation

**Every calculation must be verifiable using this tool.**

---

## Conservative Rounding Rules

### When Uncertain, Round Conservatively

**For P(E|H):** Round DOWN
- Uncertain between 0.80-0.90? Use 0.80
- Makes evidence weaker, more conservative

**For P(E|~H):** Round UP
- Uncertain between 0.10-0.20? Use 0.20
- Makes evidence weaker, more conservative

**Result:** Biases toward LOWER confidence, not higher

**Document your conservatism:**
```json
"conservativeRounding": "Rounded P(E|H) down from 0.85 to 0.80, rounded P(E|~H) up from 0.15 to 0.20 - biases toward lower confidence"
```

---

## Maximum Update Limits

**Single piece of evidence should rarely:**
- Increase confidence by >0.25
- Produce BF > 20 (for biomedical/social science)
- Take prior from 0.50 to >0.90

**If calculations suggest large jump:**
- Double-check probabilities
- Consider if evidence is really that strong
- Consult peer reviewer

**Exception:** BF > 20 is realistic for:
- Physics/forensics (orthogonal evidence)
- Climate science (multiple independent measurement systems)
- **NOT realistic for:** Single RCT, single observational study

---

## Common Pitfalls

### ❌ Pitfall 1: Arbitrary Probabilities

**Bad:**
```json
{
  "P_E_given_H": 0.80,
  "P_E_given_H_source": "I think this is reasonable"
}
```

**Good:**
```json
{
  "P_E_given_H": 0.80,
  "P_E_given_H_source": "Standard RCT power calculation: 80% detection rate typical",
  "P_E_given_H_sourceURL": "https://doi.org/..."
}
```

---

### ❌ Pitfall 2: Double-Counting Evidence

**Bad:**
- Using meta-analysis as evidence (BF = 9)
- Then using component studies from same meta-analysis (BF = 5 each)
- **Result:** Evidence counted multiple times

**Good:**
- Use meta-analysis OR component studies, not both

---

### ❌ Pitfall 3: Ignoring Contradictory Evidence

**Bad:**
- Including 5 positive studies
- Ignoring 2 null results
- **Result:** Overconfident estimate

**Good:**
- Include ALL relevant evidence
- Negative evidence gets BF < 1
- Reduces confidence appropriately

---

### ❌ Pitfall 4: Unjustified Large Jumps

**Bad:**
- Prior: 0.50
- After one study: 0.95
- **Problem:** Too aggressive, unrealistic

**Good:**
- Prior: 0.50
- After well-powered RCT: 0.75
- After meta-analysis: 0.90
- **Incremental, justified updates**

---

## Peer Review Checklist

### Can Someone Else Reproduce Your Calculation?

- [ ] Every prior has a source (not gut feeling)
- [ ] Every P(E|H) has citation
- [ ] Every P(E|~H) has citation
- [ ] All sources are accessible (URLs work)
- [ ] Calculations can be verified with calculator tool
- [ ] Reasoning is clear and documented
- [ ] Contradictory evidence is included
- [ ] Conservative defaults used when uncertain
- [ ] BF < 1 handled with Inverse BF and favorsNullHypothesis flag

### Red Flags for Reviewer

⚠️ **Unjustified probabilities** ("I think 0.80")  
⚠️ **Suspiciously precise** (0.8472 with no justification)  
⚠️ **Large unexplained jumps** (0.50 → 0.95 from one study)  
⚠️ **Missing contradictory evidence**  
⚠️ **Broken or missing citations**  
⚠️ **BF < 1 without Inverse BF calculation**  
⚠️ **Null results without favorsNullHypothesis flag**

---

## Complete Example: Transparent Provenance

### Claim: "Vitamin D supplementation reduces dementia risk in adults >75"

```json
{
  "bayesianAnalysis": {
    "prior": {
      "confidence": 0.55,
      "basis": "Mechanistic plausibility (vitamin D receptors in brain) + base rate (~50-60% of observational associations confirmed in RCTs)",
      "source": "Neurological vitamin D receptor literature + Ioannidis (2005) validation rates",
      "method": "mechanistic-plus-base-rate"
    },
    
    "evidence": [
      {
        "factor": "Multiple observational studies show association between low vitamin D and dementia risk",
        "increases": true,
        "bayesFactor": 2.5,
        "posteriorAfter": 0.65,
        "reasoning": "Consistent observational associations suggest possible relationship, but confounding common.",
        
        "probabilityProvenance": {
          "method": "empirical-base-rate",
          "evidenceGrade": "B",
          "favorsNullHypothesis": false,
          "calculation": {
            "P_E_given_H": 0.70,
            "P_E_given_H_reasoning": "If vitamin D prevents dementia, observational studies should detect association ~70% of time",
            "P_E_given_H_source": "Hill's criteria literature on observational detection rates",
            
            "P_E_given_not_H": 0.28,
            "P_E_given_not_H_reasoning": "If no true effect, observational studies still show associations ~28% due to confounding and publication bias",
            "P_E_given_not_H_source": "Ioannidis (2005) false positive rates in nutritional epidemiology",
            
            "BF": 2.5,
            "calculation": "0.70 / 0.28 = 2.5",
            "BF_interpretation": "BF = 2.5 is weak evidence (below 3.0 threshold for Moderate)"
          }
        }
      },
      
      {
        "factor": "Finnish RCT shows null result (underpowered, only 45 dementia cases)",
        "increases": false,
        "bayesFactor": 0.59,
        "posteriorAfter": 0.50,
        "reasoning": "RCT null result provides evidence against hypothesis, though underpowering creates ambiguity. Inverse BF = 1.69 is weak evidence supporting no effect.",
        
        "probabilityProvenance": {
          "method": "empirical-base-rate",
          "evidenceGrade": "A",
          "favorsNullHypothesis": true,
          "calculation": {
            "P_E_given_H": 0.50,
            "P_E_given_H_reasoning": "If effect exists but RCT underpowered, 50% chance of null result. Only 45 events → power ~20-30% to detect realistic effect.",
            "P_E_given_H_source": "Statistical power calculations with n=45 events",
            
            "P_E_given_not_H": 0.85,
            "P_E_given_not_H_reasoning": "If no effect exists, expect null result 85% of time in well-conducted RCT",
            "P_E_given_not_H_source": "Standard RCT methodology, α=0.05",
            
            "BF": 0.59,
            "calculation": "0.50 / 0.85 = 0.59",
            "BF_interpretation": "BF = 0.59 means evidence favors null hypothesis",
            
            "Inverse_BF": 1.69,
            "Inverse_BF_calculation": "1 / 0.59 = 1.69",
            "Inverse_BF_interpretation": "Inverse BF = 1.69 is weak evidence (below 3.0 threshold) supporting null hypothesis (no prevention effect)"
          }
        }
      }
    ],
    
    "posterior": 0.50,
    
    "posteriorCalculation": {
      "step1": "Prior 0.55 → Prior odds = 0.55/0.45 = 1.22",
      "step2": "Update with observational (BF 2.5): 1.22 × 2.5 = 3.05 odds → 0.75 probability",
      "step3": "Update with RCT (BF 0.59): 3.05 × 0.59 = 1.80 odds → 0.64 probability",
      "step4": "Conservative adjustment for publication bias: 0.64 → 0.50 (round down given major methodological concerns)",
      "verificationURL": "https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php"
    },
    
    "howToChangeMyMind": [
      "Large adequately-powered RCT (300+ dementia cases) shows significant benefit → confidence increases to 0.75-0.80",
      "Same large RCT shows clear null (HR ~1.0, tight CI) → confidence drops to 0.25-0.30",
      "Meta-analysis of multiple RCTs confirms benefit → confidence increases to 0.80-0.85",
      "Mechanism disproven (vitamin D doesn't cross blood-brain barrier) → confidence drops to 0.15-0.20"
    ]
  }
}
```

---

## Final Rule

> **If you can't point to a published source for a probability, don't use that number.**

When in doubt:
1. Search for empirical base rate
2. Use conservative default
3. Document uncertainty clearly
4. Ask peer reviewer
5. Use calculator tool to verify

**Trustworthiness comes from transparency, not from authority.**

---

## Tools & Resources

**Calculator:** https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php

**Key References:**
- Cochrane Handbook: https://training.cochrane.org/handbook
- Ioannidis (2005): https://doi.org/10.1371/journal.pmed.0020124
- GRADE Working Group: https://www.gradeworkinggroup.org/

**Companion Documents:**
- BAYESIAN_STANDARD.md (methodology)
- EVIDENCE_GRADING.md (quality assessment)
- FAQ.md (common questions)

---

**Version:** 2.0 (2025-11-06)  
**Status:** Operational implementation guide  
**Next Review:** After 10 abstracts to refine probability sources  
**Changelog:**
- v2.0: Added Inverse BF guidance, updated BF thresholds (3-9, 9-30), added favorsNullHypothesis handling, clarified conservative rounding, added calculator tool emphasis
- v1.0: Initial version with lookup tables and examples
