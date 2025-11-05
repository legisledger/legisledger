# Bayesian Calculation Method: Ensuring Reproducibility

**Version:** 1.0  
**Date:** 2025-01-26  
**Purpose:** Rigorous methodology for calculating Bayesian confidence with full transparency

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

### Rule: Priors Must Come From

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

### NEVER ALLOWED

❌ "Seems like 0.60" (gut feeling)  
❌ "I think 0.50 is reasonable" (arbitrary)  
❌ "Let's start at 0.70" (unjustified)  
❌ "My intuition says..." (not documented)

### Conservative Default

**When truly uncertain and no source available:**
- Use 0.50 (maximum entropy, no bias)
- Document: "No empirical base rate available. Using 0.50 as uninformative prior."

---

## Step 2: Evidence Updates (One at a Time)

### Bayes Factor Formula

**BF = P(Evidence | Hypothesis True) / P(Evidence | Hypothesis False)**

Where:
- P(E|H) = Probability we'd observe this evidence if hypothesis is true
- P(E|~H) = Probability we'd observe this evidence if hypothesis is false
- BF > 1: Evidence supports hypothesis
- BF < 1: Evidence contradicts hypothesis
- BF = 1: Evidence is neutral

### Method A: Empirical Base Rates (PREFERRED)

#### Example 1: Meta-Analysis Shows Positive Effect

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
  
  "bayesFactor": 9.5,
  "calculation": "0.95 / 0.10 = 9.5"
}
```

**Standard values for meta-analyses:**
- P(E|H): 0.90-0.95 (very reliable detection)
- P(E|~H): 0.05-0.10 (low false positive rate)
- **Source:** Cochrane methodology + Ioannidis publication bias research

#### Example 2: Single RCT Shows Positive Effect

```json
{
  "P_E_given_H": 0.85,
  "P_E_given_H_reasoning": "Well-powered RCT detects true effect 80-90% of time (β=0.10-0.20)",
  "P_E_given_H_source": "Standard RCT power calculations, 80-90% power typical for well-designed trials",
  
  "P_E_given_not_H": 0.15,
  "P_E_given_not_H_reasoning": "Higher false positive risk than meta-analysis due to single study, publication bias",
  "P_E_given_not_H_source": "α=0.05 threshold + estimated 2-3x inflation from publication bias (Franco et al. 2014)",
  
  "bayesFactor": 5.7,
  "calculation": "0.85 / 0.15 = 5.7"
}
```

**Standard values for RCTs:**
- P(E|H): 0.80-0.90 (depends on power)
- P(E|~H): 0.10-0.20 (single study, higher false positive risk)

#### Example 3: Observational Study Shows Association

```json
{
  "P_E_given_H": 0.70,
  "P_E_given_H_reasoning": "Observational studies can detect true causal effects but confounding reduces reliability",
  "P_E_given_H_source": "Hill's criteria for causation; observational studies ~70% reliable when association is strong",
  
  "P_E_given_not_H": 0.40,
  "P_E_given_not_H_reasoning": "High risk of spurious associations from confounding, selection bias, measurement error",
  "P_E_given_not_H_source": "Ioannidis et al. research on observational study false positives",
  
  "bayesFactor": 1.75,
  "calculation": "0.70 / 0.40 = 1.75"
}
```

**Standard values for observational:**
- P(E|H): 0.60-0.75 (moderate reliability)
- P(E|~H): 0.30-0.50 (high false positive risk)

### Method B: Replication Rate (When Available)

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
  
  "bayesFactor": 6.0,
  "calculation": "0.90 / 0.15 = 6.0"
}
```

### Method C: Effect Size Consistency

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
  
  "bayesFactor": 4.25,
  "calculation": "0.85 / 0.20 = 4.25"
}
```

### Method D: Mechanistic Studies (Biological Plausibility)

**Example: Mechanism Confirmed in Lab**

```json
{
  "P_E_given_H": 0.80,
  "P_E_given_H_reasoning": "If clinical effect is real, underlying mechanism should be demonstrable in controlled lab settings",
  "P_E_given_H_source": "Hill's criteria: biological plausibility strengthens causal inference",
  
  "P_E_given_not_H": 0.40,
  "P_E_given_not_H_reasoning": "Mechanism can exist without clinical benefit (many plausible mechanisms don't translate to humans)",
  "P_E_given_not_H_source": "Translational medicine failure rate: ~60% of mechanisms don't produce clinical effects",
  
  "bayesFactor": 2.0,
  "calculation": "0.80 / 0.40 = 2.0"
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

---

## Step 4: Document Everything

### Required JSON Structure

```json
{
  "factor": "Meta-analysis of 35 RCTs shows significant effect",
  "increases": true,
  "posteriorAfter": 0.934,
  "bayesFactor": 9.5,
  "reasoning": "Meta-analyses are highly reliable evidence. If hypothesis true, very likely (95%) we'd see this positive result. If false, only 10% chance of false positive. Strong evidence in favor.",
  
  "probabilityProvenance": {
    "method": "empirical-base-rate",
    "evidenceGrade": "A+",
    
    "P_E_given_H": 0.95,
    "P_E_given_H_source": "Cochrane Handbook: Meta-analyses detect 90-95% of true effects",
    "P_E_given_H_sourceURL": "https://training.cochrane.org/handbook/current/chapter-03",
    
    "P_E_given_not_H": 0.10,
    "P_E_given_not_H_source": "Ioannidis (2005) + standard α=0.05: false positive rate ~5-10%",
    "P_E_given_not_H_sourceURL": "https://doi.org/10.1371/journal.pmed.0020124",
    
    "BF": 9.5,
    "calculation": "0.95 / 0.10 = 9.5",
    
    "posteriorCalculation": {
      "priorOdds": 1.5,
      "calculation": "1.5 × 9.5 = 14.25",
      "posteriorOdds": 14.25,
      "posterior": "14.25 / 15.25 = 0.934"
    }
  }
}
```

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

### ❌ Pitfall 2: Double-Counting Evidence

**Bad:**
- Using meta-analysis as evidence (BF = 9)
- Then using component studies from same meta-analysis (BF = 5 each)
- **Result:** Evidence counted multiple times

**Good:**
- Use meta-analysis OR component studies, not both

### ❌ Pitfall 3: Ignoring Contradictory Evidence

**Bad:**
- Including 5 positive studies
- Ignoring 2 null results
- **Result:** Overconfident estimate

**Good:**
- Include ALL relevant evidence
- Negative evidence gets BF < 1
- Reduces confidence appropriately

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

## Standard Probability Lookup Table

### Evidence Detection Rates (P(E|H))

| Evidence Type | P(E\|H) | Source |
|---------------|---------|--------|
| Meta-analysis (well-conducted) | 0.90-0.95 | Cochrane methodology |
| Large RCT (n>1000, 90% power) | 0.85-0.90 | Power calculations |
| Medium RCT (n=200-1000, 80% power) | 0.75-0.85 | Power calculations |
| Small RCT (n<200) | 0.60-0.75 | Underpowered studies |
| Strong observational (adjusted) | 0.60-0.75 | Hill's criteria |
| Weak observational | 0.50-0.65 | High confounding risk |
| Mechanistic study | 0.75-0.85 | Lab confirmation |
| Case series | 0.40-0.60 | Very limited inference |

### False Positive Rates (P(E|~H))

| Evidence Type | P(E\|~H) | Source |
|---------------|----------|--------|
| Meta-analysis | 0.05-0.10 | Low false positive risk |
| Large RCT | 0.10-0.15 | α=0.05 + publication bias |
| Medium RCT | 0.15-0.20 | Higher bias risk |
| Observational | 0.30-0.50 | Confounding common |
| Mechanistic | 0.35-0.50 | Doesn't guarantee clinical effect |
| Case series | 0.40-0.60 | Very high spurious associations |

**Sources:**
- Cochrane Handbook for Systematic Reviews
- Ioannidis (2005) "Why Most Published Research Findings Are False"
- GRADE Working Group methodology
- Standard statistical power analysis texts

---

## Conservative Defaults

### When Uncertain, Round Conservatively

**For P(E|H):** Round DOWN
- Uncertain between 0.80-0.90? Use 0.80
- Makes evidence weaker, more conservative

**For P(E|~H):** Round UP
- Uncertain between 0.10-0.20? Use 0.20
- Makes evidence weaker, more conservative

**Result:** Biases toward LOWER confidence, not higher

### Maximum Update Limits

**Single piece of evidence should rarely:**
- Increase confidence by >0.25
- Produce BF > 20
- Take prior from 0.50 to >0.90

**If calculations suggest large jump:**
- Double-check probabilities
- Consider if evidence is really that strong
- Consult peer reviewer

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

### Red Flags for Reviewer

⚠️ **Unjustified probabilities** ("I think 0.80")  
⚠️ **Suspiciously precise** (0.8472 with no justification)  
⚠️ **Large unexplained jumps** (0.50 → 0.95 from one study)  
⚠️ **Missing contradictory evidence**  
⚠️ **Broken or missing citations**  

---

## Example: Full Transparency

### Claim: "Vitamin D supplementation reduces all-cause mortality in adults over 75"

```json
{
  "bayesianAnalysis": {
    "prior": {
      "confidence": 0.60,
      "basis": "Vitamin D has plausible mechanism (receptor exists, regulates genes) + base rate of ~60% for vitamin supplementation effects in targeted populations",
      "source": "Mechanistic reviews (PMID: 17634462) + Fortmann et al. (2013) vitamin supplement meta-analysis",
      "sourceURL": "https://doi.org/10.7326/0003-4819-159-12-201312170-00729",
      "method": "mechanistic-plus-base-rate"
    },
    
    "evidence": [
      {
        "factor": "VITAL trial: No mortality benefit in general population ages 50-80",
        "increases": false,
        "bayesFactor": 0.43,
        "posteriorAfter": 0.38,
        "reasoning": "If effect exists in elderly (>75), surprising not to see it in 50-80 age range. Null result in VITAL weakens confidence that effect exists in any age group.",
        
        "probabilityProvenance": {
          "P_E_given_H": 0.30,
          "P_E_given_H_reasoning": "If true effect in elderly, only 30% chance we'd see null in 50-80 (overlapping populations)",
          "P_E_given_H_source": "Statistical reasoning about age-related effects",
          
          "P_E_given_not_H": 0.70,
          "P_E_given_not_H_reasoning": "If no true effect, null result is expected outcome",
          "P_E_given_not_H_source": "Standard null hypothesis prediction",
          
          "BF": 0.43,
          "calculation": "0.30 / 0.70 = 0.43"
        }
      },
      
      {
        "factor": "Zhang et al. (2019) meta-analysis: Mortality reduction in adults >75 (8 RCTs, n=42,000)",
        "increases": true,
        "bayesFactor": 6.0,
        "posteriorAfter": 0.70,
        "reasoning": "Strong evidence from meta-analysis of age-specific subgroup. Multiple RCTs converge on effect in elderly population specifically.",
        
        "probabilityProvenance": {
          "P_E_given_H": 0.90,
          "P_E_given_H_reasoning": "Meta-analyses detect true effects 90-95% of time",
          "P_E_given_H_source": "Cochrane Handbook Section 3.2",
          "P_E_given_H_sourceURL": "https://training.cochrane.org/handbook",
          
          "P_E_given_not_H": 0.15,
          "P_E_given_not_H_reasoning": "With 8 RCTs, unlikely to see consistent effect if null (publication bias + chance would need to align)",
          "P_E_given_not_H_source": "Standard meta-analysis false positive rates adjusted for multiple studies",
          
          "BF": 6.0,
          "calculation": "0.90 / 0.15 = 6.0"
        }
      }
    ],
    
    "posterior": 0.70,
    
    "howToChangeMyMind": [
      "Large RCT (N>10,000) of adults >75 shows null effect → confidence drops to ~0.40",
      "Meta-analysis controlling for publication bias eliminates effect → confidence drops to ~0.30",
      "Mechanism disproven (vitamin D receptor dysfunction in elderly doesn't actually affect mortality pathways) → confidence drops to ~0.25"
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

**Trustworthiness comes from transparency, not from authority.**

---

**Version:** 1.0 (2025-01-26)  
**Next Review:** After 10 abstracts to refine probability sources
