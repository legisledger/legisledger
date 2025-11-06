# 🔒 Bayesian Methodology & Reasoning: The Legis Ledger Standard

**Version:** 2.2 (Enhanced & Complete)  
**Purpose:** To establish a transparent, rigorous, and verifiable methodology for calculating confidence scores within the Legis Ledger infrastructure, operationalizing **Structured Bayesian Pluralism**.

---

## 1. Core Principles: Why We Use Bayes

The foundation of Legis Ledger is the commitment to **epistemic humility** and **verifiability**. Bayesian reasoning is the mathematical framework that enforces these values.

### The Foundational Rule

> **Every probability must have a documented, verifiable source.**  
> **No gut feelings. No arbitrary numbers. No black boxes.**

When a knowledge claim is submitted, it is a mathematical statement: "I started at confidence $X$ (my prior), considered evidence $Y$, and arrived at confidence $Z$ (my posterior). Here is the verifiable path I took."

| Principle | Why It Matters for Legis Ledger |
| :--- | :--- |
| **Transparency** | Every assumption and data point is visible in the JSON Abstract. |
| **Verifiability** | The math is checkable, allowing contributors to challenge reasoning, not just assertions. |
| **Updateability** | Confidence is dynamic; it changes precisely and predictably as new evidence arrives. |
| **Humility** | We never claim certainty. Confidence is a probability, reflecting the fundamental uncertainty in real-world knowledge. |

---

## 2. The Four-Step Calculation Framework

Contributors must follow these steps sequentially to generate the final `confidence` score in the knowledge abstract.

### Step 1: Set Prior (Starting Confidence)

The Prior Confidence ($P(H)$) is the starting point—the belief in the hypothesis ($H$) before considering case-specific evidence.

| Priority | Source Rule | Example Basis |
| :--- | :--- | :--- |
| **BEST** | **Base Rates from Literature:** Published empirical success rates or meta-analyses for the general case type. | *"60% of similar legal claims succeed based on historical court data."* or *"50-60% of observational associations confirmed in RCTs (Ioannidis 2005)"* |
| **GOOD** | **Mechanistic Plausibility:** Biological/physical mechanism exists and is well-established. | *"Vitamin D receptors exist in brain + anti-inflammatory effects → prior 0.55"* |
| **ACCEPTABLE** | **Expert Surveys:** Published surveys of domain experts with documented methodology. | *"Survey of 100 endocrinologists: mean estimated probability 52%"* |
| **FALLBACK** | **Historical Precedent:** Similar interventions/claims in same domain. | *"Similar vitamin interventions (A, C, E) showed benefits in ~50% of trials"* |
| **DEFAULT** | **Conservative Default (0.50):** Used when no reliable source exists. Represents maximum entropy (total ignorance). | *"No literature exists on this specific claim, so we start unbiased."* |

**Critical:** The JSON must include the `prior` object with `confidence`, `basis`, `source`, and `method`.

**Example:**
```json
"prior": {
  "confidence": 0.55,
  "basis": "Mechanistic plausibility (vitamin D receptors in brain) + base rate (~50-60% of nutritional interventions show effects in RCTs)",
  "source": "Ioannidis (2005) validation rates + neurological literature on vitamin D receptors",
  "method": "mechanistic-plus-base-rate"
}
```

---

### Step 2: Calculate the Bayes Factor (BF) for Evidence

The **Bayes Factor (BF)** measures the strength of a **specific piece of evidence** ($E$) in relation to the hypothesis ($H$). It answers the question: "How much more likely is this evidence if the hypothesis is true, compared to if it is false?"

$$\text{BF} = \frac{P(E | H)}{P(E | \neg H)}$$

| Term | Definition | JSON Field |
| :--- | :--- | :--- |
| **$P(E \| H)$** | **Likelihood of Evidence given Hypothesis is True.** The probability of observing the specific evidence ($E$) if the hypothesis ($H$) is correct. | `P_E_given_H` |
| **$P(E \|\neg H)$** | **Likelihood of Evidence given Hypothesis is False.** The probability of observing the same evidence ($E$) if the hypothesis ($H$) is incorrect (the null hypothesis). | `P_E_given_not_H` |
| **BF** | The ratio of the two likelihoods. | `BF` |

**All $P(E | H)$ and $P(E | \neg H)$ values must be documented with a verifiable source and reasoning.**

**Quick Reference for Common Evidence Types:**

| Evidence Type | $P(E\|H)$ | $P(E\|\neg H)$ | Source |
|---------------|-----------|---------------|--------|
| Meta-analysis (well-conducted) | 0.90-0.95 | 0.05-0.10 | Cochrane methodology |
| Large RCT (n>1000, 90% power) | 0.85-0.90 | 0.10-0.15 | Power calculations |
| Medium RCT (n=200-1000) | 0.75-0.85 | 0.15-0.20 | Power calculations |
| Observational (well-adjusted) | 0.60-0.75 | 0.30-0.50 | Hill's criteria |
| Mechanistic study | 0.75-0.85 | 0.35-0.50 | Lab validation literature |

**For complete lookup tables, see BAYESIAN_CALCULATION_METHOD.md**

---

### Step 2b: Handling Evidence Against Hypothesis (BF < 1)

When evidence favors the null hypothesis ($\neg H$), the Bayes Factor will be **less than 1**.

**Procedure:**

1. **Set `favorsNullHypothesis: true`** in the `probabilityProvenance` object
2. **Calculate the Inverse Bayes Factor:** 
   $$\text{Inverse BF} = \frac{1}{\text{BF}} = \frac{P(E | \neg H)}{P(E | H)}$$
3. **Interpret using the Inverse BF:** "This evidence provides [strength] support for the null hypothesis (no effect)"
4. **Use direct language:** 
   - ✅ "Evidence suggests no effect"
   - ✅ "Evidence supports absence of benefit"
   - ❌ "Failed to find significant difference" (too ambiguous)

**Example:** 
```json
{
  "factor": "Large RCT shows null result (HR = 0.98, p=0.82)",
  "increases": false,
  "bayesFactor": 0.20,
  "probabilityProvenance": {
    "favorsNullHypothesis": true,
    "calculation": {
      "P_E_given_H": 0.15,
      "P_E_given_not_H": 0.75,
      "BF": 0.20,
      "Inverse_BF": 5.0,
      "Inverse_BF_interpretation": "Inverse BF = 5.0 is moderate evidence AGAINST the hypothesis (supporting no effect). Updated BF thresholds (2025-11-06): BF 3-9 = Moderate, BF 9-30 = Strong."
    }
  }
}
```

**Critical Insight:** Bayesian inference can provide **evidence for the null** (not just "failure to reject"). This distinguishes us from frequentist approaches and makes our uncertainty quantification more precise.

---

### Step 3: Iteratively Update the Posterior

The Posterior Confidence ($P(H | E)$) is the updated belief after considering a piece of evidence.

**Formula:**

1. **Prior Odds:** $\text{Odds}(H) = \frac{P(H)}{1 - P(H)}$
2. **Posterior Odds:** $\text{Odds}(H | E) = \text{Odds}(H) \times \text{BF}$
3. **Posterior Confidence:** $P(H | E) = \frac{\text{Odds}(H | E)}{1 + \text{Odds}(H | E)}$

This process is **repeated sequentially** for every piece of evidence. The **Posterior Confidence of step $n$** becomes the **Prior Confidence of step $n+1$**.

**Verification Tool:** Use https://www.gigacalculator.com/calculators/bayes-theorem-calculator.php to verify all calculations.

**Example:**
```
Prior: 0.60 → Prior Odds: 0.60/0.40 = 1.5
Evidence 1 (BF = 8): Posterior Odds = 1.5 × 8 = 12 → Posterior = 12/13 = 0.923
Evidence 2 (BF = 0.5): Posterior Odds = 12 × 0.5 = 6 → Posterior = 6/7 = 0.857
```

---

### Step 4: Document the Analytical Path

The JSON Abstract must contain an array (`bayesianAnalysis.evidence`) that logs every step, ensuring the entire thought process is auditable.

**Required fields for each evidence step:**
```json
{
  "factor": "Description of evidence",
  "increases": true/false,
  "posteriorAfter": 0.XX,
  "bayesFactor": X.XX,
  "reasoning": "Why this evidence changes confidence",
  "probabilityProvenance": {
    "method": "empirical-base-rate",
    "evidenceGrade": "A/B/C",
    "favorsNullHypothesis": false/true,
    "calculation": {
      "P_E_given_H": 0.XX,
      "P_E_given_H_reasoning": "...",
      "P_E_given_H_source": "Citation",
      "P_E_given_not_H": 0.XX,
      "P_E_given_not_H_reasoning": "...",
      "P_E_given_not_H_source": "Citation",
      "BF": X.XX
    }
  }
}
```

---

## 3. Epistemic Quality & Conservatism (Three Grading Systems)

Legis Ledger uses three independent systems to communicate the overall reliability and maturity of the knowledge abstract.

### System 1: Bayes Factors (BF) — *Strength of Specific Evidence*

This is the quantitative measure from Step 2, defining how much a single evidence item moved the confidence needle.

| Bayes Factor (BF) | Interpretation | Real-World Frequency |
| :--- | :--- | :--- |
| **BF > 100** | Decisive | Rare: forensics, physics, climate (orthogonal evidence) |
| **BF 30–100** | Very Strong | Uncommon: exceptional consensus, multiple meta-analyses |
| **BF 9–30** | Strong | Realistic for well-established effects, high-quality meta-analyses |
| **BF 3–9** | Moderate | Common for solid RCTs, consistent observational findings |
| **BF 1–3** | Anecdotal/Weak | Small studies, preliminary evidence |
| **BF = 1** | No Change | Irrelevant evidence (doesn't favor either hypothesis) |
| **BF < 1** | Against Hypothesis | Evidence favors null (calculate Inverse BF for interpretation) |

**Updated 2025-11-06:** Previous thresholds were BF 3-10 (Moderate) and BF 10-30 (Strong). New thresholds: **BF 3-9 (Moderate)** and **BF 9-30 (Strong)**.

**Context:**
- **Biomedical/social science:** Most evidence BF 3-20 (Moderate to Strong)
- **Exceptional cases:** BF 30-100 (Very Strong) for rare high-consensus findings
- **Physics/forensics:** BF >100 realistic with orthogonal evidence types
- **NOT realistic:** BF >30 for single RCT or observational study

---

### System 2: The Validation Funnel — *Maturity of Knowledge Overall*

This system, found in `metadata.funnelPosition`, measures the consensus and history of the knowledge (inspired by Rauch's *Constitution of Knowledge*).

| Funnel Position | Confidence Range | Typical Characteristics |
| :--- | :--- | :--- |
| **Narrow-End Canonical** | 0.90-0.999 | 15+ years consistent research, multiple independent meta-analyses, >90% replication rate, high institutional consensus, predictive validity confirmed |
| **Narrow-End Confirmed** | 0.70-0.90 | Well-established knowledge, but application context-dependent or minor edge cases exist |
| **Approaching Narrow** | 0.60-0.75 | Consensus growing, but major studies or court rulings still needed |
| **Middle-Funnel Testing** | 0.40-0.65 | Active disagreement, conflicting evidence, interpretation highly debated |
| **Wide-End Speculation** | 0.20-0.50 | Early-stage claims, insufficient evidence, high uncertainty |

---

### System 3: Probability Provenance Grade (A, B, C) — *Quality of Source Data*

This system grades the quality of the source used for the probabilities in the BF calculation, included in the `probabilityProvenance` object within each evidence step.

| Grade | Source Type | Quality Rationale |
| :--- | :--- | :--- |
| **Grade A+** | Meta-analysis, Systematic Review, Canonical Case Law, Binding Regulatory Data | Highest standard. Very low risk of bias. Multiple independent sources converge. |
| **Grade A** | Large Well-Designed RCT (n>1000), Landmark Court Decision, Government Enforcement Data | High standard. Low risk of bias. Single high-quality source. |
| **Grade B** | Medium RCT, Mechanistic Study, Strong Observational Study (adjusted), Legal Scholar Consensus | Moderate standard. Some risk of bias or limited scope. |
| **Grade C** | Small Pilot Study, Preliminary Observational Data, Single Expert Opinion, Theoretical Model | Lowest acceptable standard. High risk of bias. Requires conservative BFs and explicit justification. |

---

## 4. Conservative Practices & Uncertainty Management

### Rule 4.1: Conservative Rounding Principle

**When uncertain about probability values:**

- **For $P(E|H)$:** Round **DOWN** (makes evidence weaker)
  - Example: Uncertain between 0.80-0.90? Use 0.80
- **For $P(E|\neg H)$:** Round **UP** (makes evidence weaker)
  - Example: Uncertain between 0.10-0.20? Use 0.20

**Result:** Biases toward **LOWER confidence**, not higher. Conservative estimates.

**Document in JSON:**
```json
"conservativeRounding": "Rounded P(E|H) down from 0.85 to 0.80, rounded P(E|~H) up from 0.15 to 0.20 - biases toward lower confidence"
```

---

### Rule 4.2: Source Quality Discount

When relying on **Grade C provenance** (expert opinion, small studies, theoretical models) for the $P(E|H)$ calculation:

- The contributor **must apply a conservative discount** (e.g., a 5-10% reduction to the final confidence score, or use a more conservative Bayes Factor)
- The reasoning for the conservative choice must be documented in the `P_E_given_H_reasoning` field

**Example:**
```json
"P_E_given_H": 0.70,
"P_E_given_H_reasoning": "Normally would use 0.80 for mechanistic studies, but this is a small pilot study (Grade C). Applied 10% discount: 0.80 → 0.70",
"evidenceGrade": "C"
```

---

### Rule 4.3: Confidence Interval (The Range)

The abstract **must** report a `confidenceInterval` (e.g., `[0.65, 0.85]`) derived from the underlying uncertainty of the probabilities used.

**Guidelines:**

- **Narrow Intervals (±0.05):** Reserved for **Narrow-End Canonical** knowledge with **Grade A+ provenance** across multiple evidence types
- **Moderate Intervals (±0.10):** Standard for **Narrow-End Confirmed** with **Grade A/B provenance**
- **Wide Intervals (±0.15+):** Required for **Middle-Funnel** positions or when majority of evidence is **Grade B/C provenance**

**Example:**
```json
"conclusion": {
  "confidence": 0.72,
  "confidenceInterval": [0.62, 0.82],
  "intervalRationale": "Wide interval reflects: (1) Only one RCT available (underpowered), (2) Observational evidence susceptible to confounding, (3) Middle-Funnel position with active debate"
}
```

---

## 5. Special Cases & Advanced Topics

### 5.1: Multiple Lines of Evidence (Independence Matters)

**Critical Distinction:** How Bayes Factors combine depends on whether evidence is truly **independent**.

**Case A: Meta-analysis of Similar Studies (NOT Independent)**

Studies in a meta-analysis share methods, publication bias, and research paradigms. Bayes Factors do **NOT multiply**.

- **50 similar RCTs** → BF 15-25 (realistic)
- **NOT** BF 120+ (would require multiplication, which is wrong)

**Case B: Orthogonal Evidence (Truly Independent)**

When evidence comes from **completely different measurement systems**, Bayes Factors **CAN multiply**.

**Examples of orthogonal evidence:**
- Climate: Surface temperature + satellite + ice cores + ocean heat + models (different systems)
- Evolution: Fossils + DNA + biogeography + embryology (different domains)

**NOT orthogonal:**
- 50 RCTs all measuring same outcome with same method (same paradigm)

---

### 5.2: Handling Conflicting Evidence

**Show both sides honestly:**

```json
"evidence": [
  {
    "factor": "5 RCTs show positive effect (meta-analysis)",
    "increases": true,
    "bayesFactor": 8,
    "posteriorAfter": 0.80
  },
  {
    "factor": "2 large RCTs show null result",
    "increases": false,
    "bayesFactor": 0.60,
    "posteriorAfter": 0.70,
    "reasoning": "Null results reduce confidence but don't eliminate hypothesis. Possible heterogeneity in populations or interventions."
  }
]
```

**Transparency matters more than smoothing over disagreement.**

---

### 5.3: Updating Over Time

**Your posterior becomes your next prior.**

```json
// Version 1.0 (2024)
"prior": 0.50,
"posterior": 0.70

// Version 2.0 (2025) - New evidence published
"prior": {
  "confidence": 0.70,
  "basis": "Previous analysis (v1.0, 2024) concluded 0.70. Using as new prior.",
  "source": "Our submission v1.0 (2024)"
},
"posterior": 0.80
```

---

## 6. Required JSON Structure Summary

Every `bayesianAnalysis` object must contain:

```json
"bayesianAnalysis": {
  "prior": {
    "confidence": 0.XX,
    "basis": "Why this prior?",
    "source": "Citation or empirical base",
    "method": "base-rate | mechanistic | expert-survey | historical | conservative-default"
  },
  "evidence": [
    {
      "factor": "Description",
      "increases": true/false,
      "posteriorAfter": 0.XX,
      "bayesFactor": X.XX,
      "reasoning": "Why this changes confidence",
      "probabilityProvenance": {
        "method": "empirical-base-rate",
        "evidenceGrade": "A/B/C",
        "favorsNullHypothesis": false/true,
        "calculation": {
          "P_E_given_H": 0.XX,
          "P_E_given_H_reasoning": "...",
          "P_E_given_H_source": "...",
          "P_E_given_not_H": 0.XX,
          "P_E_given_not_H_reasoning": "...",
          "P_E_given_not_H_source": "...",
          "BF": X.XX,
          "Inverse_BF": X.XX (if favorsNullHypothesis = true)
        }
      }
    }
  ],
  "posterior": 0.XX,
  "howToChangeMyMind": [
    "Specific evidence that would falsify or significantly change confidence"
  ]
}
```

---

## Conclusion: Operationalizing Trust

This integrated methodology ensures that every confidence score presented by Legis Ledger is the product of a **verifiable calculation** built upon **sourced assumptions**. By exposing the full chain of reasoning—from the Prior to the final Posterior—and grading the quality of every step, Legis Ledger fulfills its mission to provide **stability through plurality** and **dynamism through updating**.

**Key Takeaways:**

1. **No unsourced probabilities** - Every P(E|H) and P(E|¬H) must cite a source
2. **Conservative when uncertain** - Round toward lower confidence, not higher
3. **Three grading systems** - BF (evidence strength), Funnel (maturity), Grade (source quality)
4. **Handle null evidence explicitly** - Use `favorsNullHypothesis` and Inverse BF
5. **Verify all calculations** - Use public calculator tool for reproducibility

---

**Version:** 2.2 (Enhanced & Complete)  
**Date:** 2025-11-06  
**Status:** Authoritative methodology document  
**Companion Document:** BAYESIAN_CALCULATION_METHOD.md (detailed implementation guide)  
**Changelog:**
- v2.2: Added Inverse BF guidance, conservative rounding rules, all 4 prior methods, verification tool reference
- v2.1: Integrated BAYESIAN_REASONING.md and EVIDENCE_GRADING.md content
- v2.0: Initial integrated version
