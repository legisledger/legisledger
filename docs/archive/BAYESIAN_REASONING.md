# Bayesian Reasoning: A Tutorial for Contributors

# ARCHIVED: Bayesian Reasoning Tutorial

This document has been superseded by:
- BAYESIAN_STANDARD.md (methodology)
- BAYESIAN_CALCULATION_METHOD.md (implementation)

Archived: 2025-11-06
Reason: Content integrated into operational documents
Preserved for: Historical reference and educational examples

## Why Bayes Matters

Thomas Bayes (1701-1761) was an English mathematician and Presbyterian minister. He never published his famous theorem during his lifetime—it was published posthumously in 1763. Yet his insight transformed how we think about learning from evidence.

**Bayes' contribution:** A mathematical framework for updating beliefs as evidence arrives.

**Why this matters for Legis Ledger:** It provides a **transparent, verifiable method** for quantifying confidence. Not gut feeling, not authority decree, not political pressure—**math**.

When you submit a knowledge claim to Legis Ledger, you're making a mathematical statement:
> "I started at confidence X (my prior), considered evidence Y, and arrived at confidence Z (my posterior). Here's the path I took."

Anyone can verify your reasoning. Anyone can see your assumptions. Anyone can challenge your logic.

**This is epistemic humility operationalized.**

---

## The Core Insight: Update, Don't Replace

### The Old Way (Pre-Bayes)

**Approach:** Look at evidence, make judgment.

**Problem:** Where did the judgment come from? How certain are you? What would change your mind?

**Example:**
- Researcher: "This drug works."
- Skeptic: "How do you know?"
- Researcher: "I ran a study."
- Skeptic: "But how confident are you?"
- Researcher: "Pretty confident."
- Skeptic: "What does that mean?"
- [No clear answer]

### The Bayesian Way

**Approach:** Start with prior belief → Observe evidence → Update to posterior belief → Repeat

**Advantage:** Every step is transparent and mathematical.

**Same example:**
- Researcher: "I started at 50% confidence (prior based on base rate: half of drugs in this class work)."
- Researcher: "My study showed positive results with p<0.05 and effect size 0.4."
- Researcher: "Using Bayes' theorem, this updates my confidence to 75%."
- Skeptic: "Show me your calculation."
- Researcher: [Shows Bayesian update]
- Skeptic: "I agree with your math but I think your prior should have been 30%, not 50%."
- Researcher: "Interesting. With a 30% prior, I'd end up at 60% posterior. Let's discuss the prior."

**Now they're having a productive conversation about assumptions, not just asserting competing conclusions.**

---

## Bayes' Theorem (The Formula)
```
P(H|E) = P(E|H) × P(H) / P(E)
```

**In English:**
```
Posterior = (Likelihood × Prior) / Evidence Probability

Or:

Confidence after evidence = 
  (How likely is this evidence if hypothesis true × Confidence before evidence) 
  / How likely is this evidence overall
```

**What each part means:**

| Symbol | Name | Meaning | Example |
|--------|------|---------|---------|
| **P(H\|E)** | Posterior | Confidence AFTER seeing evidence | 85% confident passenger entitled (after seeing flight logs) |
| **P(E\|H)** | Likelihood | How likely is evidence if hypothesis true? | If passenger really entitled, 90% chance we'd see mechanical issue in logs |
| **P(H)** | Prior | Confidence BEFORE seeing evidence | 70% confident based on base rate of mechanical delay claims |
| **P(E)** | Evidence Probability | How likely is evidence overall? | 80% of delay cases have some mechanical issue documented |

---

## For Institutions: How to Do Bayesian Analysis

### Step 1: Determine Your Prior

**Question:** Before looking at the specific case, what's your baseline confidence?

**Sources for priors:**
- **Base rates:** Historical success rates, frequency in population
- **Theoretical prediction:** What does theory say should happen?
- **Expert consensus:** What's the general view before examining specifics?
- **Reference class:** Similar cases, related precedents

**Example (Legal):**
```json
"prior": {
  "confidence": 0.70,
  "basis": "Base rate: 70% of EU mechanical delay claims over 3 hours result in compensation",
  "source": "French DGAC enforcement statistics 2020-2024"
}
```

**Example (Scientific):**
```json
"prior": {
  "confidence": 0.95,
  "basis": "Physical theory predicts greenhouse effect. Laboratory experiments confirm CO₂ absorbs infrared. Prior based on theoretical expectation before comprehensive observational data.",
  "source": "Arrhenius (1896) prediction + Tyndall (1861) experiments"
}
```

**Example (Policy):**
```json
"prior": {
  "confidence": 0.50,
  "basis": "Base rate: approximately 50% of cash transfer programs show poverty reduction. No strong theoretical reason to expect UBI different from general cash transfers.",
  "source": "Meta-analysis of 200+ cash transfer studies (Banerjee et al. 2017)"
}
```

### Step 2: Consider Evidence Sequentially

**Don't jump straight to conclusion.** Show your work step-by-step.

**Each piece of evidence updates your confidence:**

Prior → Evidence 1 → Updated confidence → Evidence 2 → Updated confidence → ... → Posterior

**Example (Passenger Rights):**
```json
"evidence": [
  {
    "factor": "Flight departed from EU (France)",
    "increases": true,
    "posteriorAfter": 0.85,
    "bayesFactor": 2.8,
    "reasoning": "EU 261/2004 applies. French DGAC has strong enforcement. This increases likelihood of successful claim."
  },
  {
    "factor": "Delay exceeds 3 hours (4 hours)",
    "increases": true,
    "posteriorAfter": 0.90,
    "bayesFactor": 1.9,
    "reasoning": "Clear threshold met. Well above minimum reduces timing disputes."
  },
  {
    "factor": "Mechanical issue documented in flight logs",
    "increases": true,
    "posteriorAfter": 0.95,
    "bayesFactor": 4.5,
    "reasoning": "ECJ Case C-549/07 establishes mechanical not extraordinary. Strong precedent."
  },
  {
    "factor": "Airline claims weather involvement",
    "decreases": true,
    "posteriorAfter": 0.85,
    "bayesFactor": 0.45,
    "reasoning": "Introduces uncertainty. If proven, airline may be exempt. Reduces confidence."
  }
]
```

**Notice:**
- Each step shows direction (increases/decreases)
- Each step shows magnitude (posteriorAfter)
- Each step shows reasoning (why this matters)
- Final posterior (0.85) matches conclusion.confidence

### Step 3: Calculate Bayes Factor (Optional but Recommended)

**Bayes Factor** measures strength of evidence:
```
BF = P(E|H is true) / P(E|H is false)
```

**Interpretation:**

| Bayes Factor | Strength | Meaning |
|--------------|----------|---------|
| **BF > 100** | Decisive | Evidence strongly favors hypothesis |
| **BF 30-100** | Very strong | Evidence significantly supports hypothesis |
| **BF 10-30** | Strong | Evidence clearly supports hypothesis |
| **BF 3-10** | Moderate | Evidence somewhat supports hypothesis |
| **BF 1-3** | Weak | Evidence barely supports hypothesis |
| **BF < 1** | Against | Evidence favors alternative hypothesis |

**Context for Interpretation given domains**
1. For **biomedical/social science**, most evidence will at best be BF 3-20 (Moderate to Strong). 
2. **BF 30-100 (Very Strong)** is realistic but rare - reserved for exceptional consensus.
3. **BF >100 (Decisive)** is realistic for forensics, physics, climate science - not typical for medical research.

**Example:**

"Mechanical issue documented in flight logs" for passenger compensation claim:
```
P(logs show mechanical | passenger entitled) = 0.90
P(logs show mechanical | passenger not entitled) = 0.20

BF = 0.90 / 0.20 = 4.5 (Moderate evidence)
```

**This says:** "If passenger is truly entitled, we'd expect mechanical documentation 90% of the time. If not entitled, only 20%. Seeing the documentation is moderate evidence they're entitled."

### Step 4: Specify How to Change Your Mind

**This is CRITICAL for epistemic humility.**

**Question:** What evidence would falsify your claim?

**Bad answer:** "Nothing could change my mind"  
**Good answer:** Specific, concrete evidence that would shift your confidence

**Example (Legal):**
```json
"howToChangeMyMind": [
  "Airline produces meteorological reports showing severe weather grounded multiple flights → confidence drops to ~0.20",
  "ECJ issues new ruling narrowing mechanical issue exception → confidence adjusts based on ruling scope",
  "Pattern of DGAC non-enforcement emerges in 2025+ data → confidence gradually decreases"
]
```

**Example (Scientific):**
```json
"howToChangeMyMind": [
  "Discovery of systematic error in all global temperature datasets → confidence drops to ~0.50",
  "Alternative mechanism explaining warming + stratospheric cooling + isotopic signature → confidence drops to ~0.30",
  "Climate models consistently fail to predict next 20 years of warming → confidence gradually decreases"
]
```

**Example (Policy):**
```json
"howToChangeMyMind": [
  "Large RCT (N>10,000) in US shows null effect on poverty → confidence drops to ~0.35",
  "Evidence of massive work disincentive offsetting poverty reduction → confidence drops to ~0.40",
  "Replication failures in 3+ independent studies → confidence drops below 0.50"
]
```

---

## Common Pitfalls (And How to Avoid Them)

### Pitfall 1: Unjustified Priors

**Problem:** "I started at 90% confidence because... I feel strongly about this."

**Better:** Ground priors in base rates, theoretical predictions, or expert consensus.

**Good priors:**
- "50% because this intervention class has 50/50 success rate historically"
- "80% because mechanism is well-established and similar interventions work"
- "30% because base rate of these claims succeeding is 30%"

**Bad priors:**
- "95% because I really believe in this"
- "10% because I'm skeptical"
- "75% because... that feels right"

### Pitfall 2: Evidence That Doesn't Update

**Problem:** 
```json
"prior": 0.70,
"evidence": [
  {"factor": "Study 1 positive", "posteriorAfter": 0.70},
  {"factor": "Study 2 positive", "posteriorAfter": 0.70},
  {"factor": "Study 3 positive", "posteriorAfter": 0.70}
]
```

**Why this is wrong:** If evidence doesn't change your confidence, it's not evidence. Either it's not relevant or you're not updating properly.

**Better:** Evidence should move confidence (up or down). If it truly doesn't, explain why.

### Pitfall 3: Ignoring Contradictory Evidence

**Problem:** Cherry-picking only supportive evidence.

**Better:** Include ALL relevant evidence, even if it reduces confidence.

**Example:**
```json
"evidence": [
  {"factor": "10 studies show effect", "posteriorAfter": 0.85, "increases": true},
  {"factor": "2 studies show null result", "posteriorAfter": 0.78, "increases": false, 
   "reasoning": "Cannot ignore null results. Possible publication bias. Reduces confidence."}
]
```

### Pitfall 4: Claiming Certainty

**Problem:** `"confidence": 1.0`

**Why wrong:** Nothing is certain. Scientific knowledge is not absolute truth but a continuous process of refining models based on evidence. Even mathematics, often seen as a bastion of certainty, is not immune from the limits of absolute certainty.

**Better:** Cap at 0.999 for canonical knowledge. Epistemic humility is structurally enforced.

### Pitfall 5: No Falsifiability Criteria

**Problem:** Empty `howToChangeMyMind` array or vague criteria.

**Better:** Specific, concrete, testable conditions that would reduce confidence.

**Good falsifiability:**
- "Large RCT (N>5000) showing null effect → confidence drops to 0.40"
- "Discovery that measurement method systematically biased → confidence drops to 0.30"
- "Replication failure in 3+ independent labs → confidence drops to 0.35"

**Bad falsifiability:**
- "If proven wrong somehow"
- "New evidence that contradicts this"
- [empty array]

---

## Complete Worked Example: Creatine Supplementation and Lean Body Mass

**This is a Grade A example** demonstrating the full Bayesian reasoning process in the scientific domain, with 25+ years of accumulated evidence leading to canonical knowledge status.

### The Question

**Does creatine monohydrate supplementation increase lean body mass in adults performing resistance training?**

**Domain:** Scientific (sports nutrition)  
**Expected Outcome:** This should reach high confidence (0.90+) given decades of research and overwhelming consensus.

### Complete Knowledge Abstract

```json
{
  "@context": "https://schema.org",
  "@type": "ScientificKnowledge",
  "@id": "creatine-lbm-resistance-training-2025",
  
  "scenario": {
    "description": "Does creatine monohydrate supplementation increase lean body mass in adults performing resistance training?",
    "domain": "scientific",
    "parameters": {
      "population": "Healthy adults aged 18-65 years",
      "intervention": "Creatine monohydrate supplementation (3-5g/day maintenance or 20g/day loading phase)",
      "comparator": "Placebo + resistance training",
      "outcome": "Change in lean body mass (kg) measured by DEXA, BIA, or validated methods",
      "duration": "Minimum 6 weeks",
      "studyDesign": "Randomized controlled trials (RCTs)"
    }
  },
  
  "conclusion": {
    "claim": "Creatine monohydrate supplementation combined with resistance training increases lean body mass in adults",
    "confidence": 0.90,
    "confidenceInterval": [0.85, 0.94],
    "outcome": {
      "effectSize": "0.7-1.5 kg additional lean body mass gain compared to placebo over 6-12 weeks",
      "mechanismOfAction": "Increases intramuscular creatine phosphate stores, enabling higher training volume and intensity, which stimulates muscle protein synthesis and hypertrophy",
      "clinicalSignificance": "Modest but consistent effect across populations. Individual response varies based on baseline muscle creatine levels (vegetarians show larger gains)"
    },
    "uncertainties": [
      "Effect requires concurrent resistance training (creatine alone has minimal effect)",
      "Individual response varies (some individuals are 'non-responders' with baseline high muscle creatine)",
      "Effect size is moderate (~5-10% additional gain beyond training alone)",
      "Long-term effects beyond 12 weeks less well studied"
    ],
    "couldBeWrong": {
      "probability": 0.10,
      "reasons": [
        "Lean body mass measurements may partially reflect water retention rather than true muscle protein accretion",
        "Publication bias may inflate effect size (null results less likely published)",
        "Individual variation greater than meta-analyses suggest",
        "Long-term persistence of gains uncertain"
      ]
    }
  },
  
  "evidenceBasis": [
    {
      "type": "mechanistic-study",
      "citation": "Harris, R.C., Söderlund, K., & Hultman, E. (1992). Elevation of creatine in resting and exercised muscle of normal subjects by creatine supplementation. Clinical Science, 83(3), 367-374.",
      "summary": "Foundational study demonstrating creatine supplementation increases muscle creatine stores by 10-40%, with larger increases in individuals with initially low levels.",
      "grade": "A",
      "doi": "10.1042/cs0830367"
    },
    {
      "type": "meta-analysis",
      "citation": "Candow, D.G., et al. (2022). Influence of age, sex, and type of exercise on the efficacy of creatine supplementation on lean body mass: A systematic review and meta-analysis of randomized clinical trials. Nutrition, 100, 111659.",
      "summary": "Meta-analysis of 35 RCTs with 1,192 participants. Overall: creatine increased LBM by 0.68 kg (95% CI: 0.26-1.11). Effect larger with resistance training (1.1-1.5 kg). High-quality evidence with GRADE assessment.",
      "grade": "A+",
      "doi": "10.1016/j.nut.2022.111659"
    },
    {
      "type": "systematic-review",
      "citation": "Antonio, J., et al. (2021). Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? Journal of the International Society of Sports Nutrition, 18(1), 13.",
      "summary": "Comprehensive review of 500+ peer-reviewed publications. Confirms safety and efficacy of creatine monohydrate for increasing lean body mass when combined with resistance training.",
      "grade": "A+",
      "doi": "10.1186/s12970-021-00412-w"
    },
    {
      "type": "position-statement",
      "citation": "Kreider, R.B., et al. (2017). International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. Journal of the International Society of Sports Nutrition, 14(18).",
      "summary": "Position statement from leading scientific society. Extensive review of mechanism: creatine increases PCr stores, improves ATP resynthesis, enables more work during high-intensity exercise, leading to greater training adaptations.",
      "grade": "A",
      "authority": "authoritative",
      "doi": "10.1186/s12970-017-0173-z"
    }
  ],
  
  "bayesianAnalysis": {
    "prior": {
      "confidence": 0.50,
      "basis": "Mechanism is biologically plausible (ATP-PCr system well-characterized). Base rate: approximately 50% of proposed sports nutrition supplements show statistically significant effects in well-designed RCTs. No strong prior expectation before empirical testing.",
      "source": "General supplement efficacy base rate from systematic reviews of sports nutrition interventions"
    },
    
    "evidence": [
      {
        "factor": "Mechanistic studies confirm creatine increases muscle phosphocreatine stores by 10-40%",
        "increases": true,
        "posteriorAfter": 0.60,
        "bayesFactor": 2.0,
        "reasoning": "Laboratory studies (Harris et al. 1992; Greenhaff et al. 1994) demonstrate creatine supplementation reliably increases intramuscular creatine and phosphocreatine. Mechanism confirmed in controlled settings with direct measurement via muscle biopsy. If creatine truly increases LBM via PCr mechanism, very likely (95%) we'd see PCr increases. If mechanism doesn't work, still 50% chance we'd see increases (measurement variability). BF = 0.95/0.50 ≈ 2.0. Moderate evidence that mechanism exists."
      },
      {
        "factor": "Early RCTs (1990s-2000s) show consistent lean body mass gains of 1-2 kg",
        "increases": true,
        "posteriorAfter": 0.70,
        "bayesFactor": 3.5,
        "reasoning": "Multiple independent RCTs (Volek et al. 1999; Bemben et al. 2001; others) with 20-50 participants each show creatine + resistance training increases LBM by 1-2 kg more than placebo. Effect replicates across research groups. If creatine truly works, expect 85% of well-designed RCTs to show positive effect. If it doesn't work, expect 25% to show effect by chance. BF = 0.85/0.25 ≈ 3.4. Moderate evidence."
      },
      {
        "factor": "2017 meta-analysis of 22 studies shows 1.37 kg additional lean body mass gain",
        "increases": true,
        "posteriorAfter": 0.80,
        "bayesFactor": 8.0,
        "reasoning": "Large-scale synthesis confirms effect persists across studies and populations. Statistical significance strong (p < 0.001). Effect size clinically meaningful. High-quality evidence emerges from aggregation of multiple trials. If creatine works, expect 95% probability meta-analysis shows consistent effect. If it doesn't work, very unlikely (12%) that publication bias creates false positive in large meta-analysis. BF = 0.95/0.12 ≈ 7.9. Moderate evidence."
      },
      {
        "factor": "2022 comprehensive meta-analysis (35 studies, 1,192 participants) confirms 0.68 kg overall gain, 1.1-1.5 kg with resistance training",
        "increases": true,
        "posteriorAfter": 0.85,
        "bayesFactor": 12.0,
        "reasoning": "Most comprehensive synthesis to date (Candow et al. 2022). Effect size smaller than early studies (suggests early publication bias), but effect remains statistically significant and clinically meaningful. High credibility evidence. GRADE assessment rates evidence quality as HIGH. If effect is real, expect 98% probability of detecting with this sample size and methodology. If no true effect, only 8% probability of false positive this large. BF = 0.98/0.08 ≈ 12.3. Strong evidence."
      },
      {
        "factor": "Multiple Cochrane-quality systematic reviews from independent teams (ISSN, AIS, IOC) reach consistent conclusions across 25+ years of research",
        "increases": true,
        "posteriorAfter": 0.90,
        "bayesFactor": 15.0,
        "reasoning": "Gold-standard systematic reviews from: (1) International Society of Sports Nutrition, (2) Australian Institute of Sport, (3) International Olympic Committee Sports Nutrition Consensus, (4) 500+ peer-reviewed papers spanning 1992-2024. Consensus is overwhelming. Effect replicates across research groups, countries, populations, time periods. Predictive validity confirmed: theoretical mechanism matches observed outcomes. If creatine truly increases LBM, expect 99% probability that multiple independent systematic reviews over 25+ years would reach consistent positive conclusions. If no true effect, only 6% probability of this level of false consensus. BF = 0.99/0.06 ≈ 16.5. Strong evidence."
      }
    ],
    
    "posterior": 0.90,
    
    "howToChangeMyMind": [
      "Large RCT (N>1,000) with adequate creatine dosing (5g/day), adequate duration (12+ weeks), proper resistance training protocol shows null effect → confidence drops to ~0.60",
      "Discovery of systematic methodological flaw in muscle mass measurement: DEXA/BIA consistently overestimates lean body mass in creatine users due to increased water retention that doesn't reflect true muscle protein accretion → confidence drops to ~0.50",
      "Meta-analysis controlling for publication bias shows entire effect disappears when unpublished studies included → confidence drops to ~0.40",
      "Mechanism disproven: creatine shown NOT to increase muscle phosphocreatine stores in follow-up studies with better methodology → confidence drops to ~0.30",
      "Long-term follow-up studies (5+ years) show initial LBM gains from creatine do not persist and are entirely water weight that dissipates → confidence drops to ~0.35"
    ]
  },
  
  "sources": [
    {
      "type": "meta-analysis",
      "citation": "Candow, D.G., Forbes, S.C., Chilibeck, P.D., Cornish, S.M., Antonio, J., & Kreider, R.B. (2022). Influence of age, sex, and type of exercise on the efficacy of creatine supplementation on lean body mass: A systematic review and meta-analysis of randomized clinical trials. Nutrition, 100, 111659.",
      "doi": "10.1016/j.nut.2022.111659",
      "quality": "primary",
      "accessDate": "2025-01-25"
    },
    {
      "type": "systematic-review",
      "citation": "Antonio, J., Candow, D.G., Forbes, S.C., Gualano, B., Jagim, A.R., Kreider, R.B., Rawson, E.S., Smith-Ryan, A.E., VanDusseldorp, T.A., Willoughby, D.S., & Ziegenfuss, T.N. (2021). Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? Journal of the International Society of Sports Nutrition, 18(1), 13.",
      "doi": "10.1186/s12970-021-00412-w",
      "quality": "primary",
      "accessDate": "2025-01-25"
    },
    {
      "type": "position-statement",
      "citation": "Kreider, R.B., Kalman, D.S., Antonio, J., Ziegenfuss, T.N., Wildman, R., Collins, R., Candow, D.G., Kleiner, S.M., Almada, A.L., & Lopez, H.L. (2017). International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. Journal of the International Society of Sports Nutrition, 14(18).",
      "doi": "10.1186/s12970-017-0173-z",
      "quality": "primary",
      "accessDate": "2025-01-25"
    },
    {
      "type": "mechanistic-study",
      "citation": "Harris, R.C., Söderlund, K., & Hultman, E. (1992). Elevation of creatine in resting and exercised muscle of normal subjects by creatine supplementation. Clinical Science, 83(3), 367-374.",
      "doi": "10.1042/cs0830367",
      "quality": "primary",
      "accessDate": "2025-01-25"
    }
  ],
  
  "metadata": {
    "submittedBy": {
      "institution": "Independent Sports Nutrition Research Collective",
      "institutionType": "independent-research",
      "authorName": "Legis Ledger Research Team",
      "role": "Nutrition science researchers"
    },
    "submissionDate": "2025-01-25",
    "version": "1.0.0",
    "funnelPosition": "narrow-end-canonical",
    "funnelJustification": "25+ years of consistent research (1992-2025), 500+ peer-reviewed publications, multiple independent meta-analyses and systematic reviews from leading scientific organizations all converging on same conclusion. Mechanism understood and validated. Effect replicates across populations, geographies, research groups, and time periods. Meets criteria for 'canonical' knowledge: overwhelming consensus, extensive replication, predictive validity confirmed.",
    "reviewSchedule": "Annual review when new meta-analyses published"
  },
  
  "validation": {
    "replicationStatus": {
      "totalStudies": 500,
      "supportingStudies": 475,
      "contradictingStudies": 5,
      "mixedResults": 20,
      "replicationRate": 0.95,
      "note": "Approximately 95% of studies show positive or neutral results. Null results typically attributable to inadequate dosing (<3g/day), insufficient duration (<4 weeks), lack of resistance training stimulus, or methodological limitations."
    }
  },
  
  "disclaimer": {
    "nature": "educational",
    "notCertainty": "90% confidence means 10% chance we're wrong. Science is provisional and subject to revision with new evidence.",
    "domainSpecific": {
      "notMedicalAdvice": true,
      "consultProfessional": true
    },
    "provenanceAndLimitations": {
      "submittedBy": "Independent research group analyzing peer-reviewed scientific literature",
      "notSubmittedByAuthority": "NOT submitted by FDA, NIH, or medical authority. This represents independent analysis of published research.",
      "verificationStatus": "Unreviewed by external scientific panel. Based on published systematic reviews and meta-analyses.",
      "potentialBiases": [
        "Some cited studies have supplement industry funding (disclosed in papers)",
        "Publication bias may favor positive results (null studies less likely published)",
        "Analysis may favor supplement efficacy due to researcher focus on nutrition science",
        "Individual response variation may be underestimated in population-level analyses"
      ],
      "howToVerify": [
        "Search PubMed for 'creatine lean body mass resistance training' to find RCTs",
        "Consult physician or registered dietitian before starting supplementation",
        "Check Cochrane Database for systematic reviews on creatine",
        "Review cited meta-analyses directly (all DOIs provided)",
        "Examine Australian Institute of Sport Sports Supplement Framework (creatine is Group A: strong evidence)"
      ],
      "strengthsOfThisAnalysis": [
        "Based on multiple independent meta-analyses spanning 25+ years",
        "Mechanism well-understood and validated through mechanistic studies",
        "High replication rate (95% of studies show positive or neutral results)",
        "Transparent Bayesian reasoning path from prior to posterior",
        "All evidence graded and sources cited with DOIs"
      ],
      "weaknessesOfThisAnalysis": [
        "Some reliance on body composition measurement methods that may include water retention",
        "Limited long-term (>1 year) follow-up data on persistence of gains",
        "Individual variation (non-responders) not fully characterized",
        "Most studies in young adults; less data on older populations"
      ],
      "updateMechanism": "Updated annually or when new high-quality meta-analyses published",
      "transparencyCommitment": "All Bayesian reasoning disclosed. All evidence graded. All sources cited. No hidden assumptions."
    }
  }
}
```

### What Makes This Grade A

1. **25+ Years of Evidence:** From foundational mechanistic studies (1992) to comprehensive 2022 meta-analysis
2. **Multiple Independent Replications:** 500+ studies, 95% replication rate, research groups worldwide
3. **Evidence Hierarchy Demonstrated:** 
   - Grade A+ meta-analyses (highest quality)
   - Grade A RCTs and position statements
   - Grade A mechanistic studies (mechanism validated)
4. **Transparent Bayesian Path:** Clear progression from 0.50 → 0.90 with explicit reasoning at each step
5. **Provenance Transparency:** Full disclosure of who submitted, potential biases, verification pathways
6. **Epistemic Humility:** Explicit uncertainties, 10% chance of being wrong, specific falsifiability criteria
7. **Canonical Status:** Funnel position "narrow-end-canonical" justified by decades of testing and overwhelming consensus

### Key Learning Points

**Sequential Bayesian Updating:**
- Started at 0.50 (base rate for supplement efficacy, no strong prior)
- Mechanism studies → 0.60 (biological plausibility confirmed)
- Early RCTs → 0.70 (initial replication successful)
- 2017 meta-analysis → 0.80 (effect persists at scale)
- 2022 meta-analysis → 0.85 (comprehensive synthesis, adjusted for publication bias)
- Systematic reviews + 25 years → 0.90 (canonical knowledge status)

**Evidence Strength Accumulation:**
- Bayes Factors increase as evidence accumulates: 2.0 → 3.5 → 8.0 → 12.0 → 15.0
- Each piece of evidence provides independent support
- Final BF of 15.0 = "very strong evidence" (well past threshold for established knowledge)

**Uncertainty Acknowledgment:**
- Still only 0.90, not 1.0 (epistemic humility enforced)
- Explicit about what could be wrong (water retention, publication bias, individual variation)
- Clear falsifiability criteria (specific conditions that would reduce confidence)

**Provenance Transparency:**
- Explicit that this is NOT from FDA/NIH
- Potential biases acknowledged (industry funding in some studies, publication bias)
- Verification pathways provided (PubMed searches, physician consultation, review of sources)
- Update mechanism specified (annual review, new meta-analyses)

---

## For Infrastructure: How We Validate

When an institution submits a Bayesian analysis, we check:

### Automated Validation

✅ **Schema compliance:** All required fields present  
✅ **Posterior matches conclusion:** `bayesianAnalysis.posterior` === `conclusion.confidence`  
✅ **Confidence bounds:** 0 < confidence < 1 (never exactly 1.0)  
✅ **Evidence ordering:** Each `posteriorAfter` should differ from previous (evidence should change confidence)  
✅ **Falsification present:** At least one entry in `howToChangeMyMind`  

**Note**: In future versions, infrastructure may offer automated Bayes Factor calculation. For now, institutions calculate their own BF and infrastructure validates for internal consistency.

### What We DON'T Validate

❌ Whether prior is "correct"  
❌ Whether posterior is "justified"  
❌ Whether Bayes Factor calculations are accurate  
❌ Whether conclusion is "true"  

**Why not?** Those are expert judgments. We ensure:
- **Math is internally consistent** (posterior matches conclusion)
- **Reasoning is transparent** (path from prior to posterior shown)
- **Falsifiability is specified** (can be proven wrong)

**The community reviews substantive correctness.**

---

## Advanced Topics

### Dealing with Multiple Lines of Evidence

**Problem:** You have 10 studies, each providing evidence. How do you update?

**Option 1: Sequential** (recommended for clarity)
```json
"evidence": [
  {"factor": "Study 1", "posteriorAfter": 0.65},
  {"factor": "Study 2", "posteriorAfter": 0.72},
  {"factor": "Study 3", "posteriorAfter": 0.78},
  // ... etc
]
```

**Option 2: Aggregate** (for large bodies of evidence)

**Important distinction:** How Bayes Factors combine depends on whether evidence is truly independent.

**Case A: Meta-analysis of similar studies (NOT independent)**

Studies in a meta-analysis are not truly independent—they share methods, publication bias, research paradigms. Bayes Factors do NOT multiply.
```json
"evidence": [
  {
    "factor": "Meta-analysis of 50 RCTs (N=1,700 participants)",
    "posteriorAfter": 0.88,
    "bayesFactor": 20,
    "reasoning": "Large-scale synthesis shows consistent effect across studies. High replication rate and large sample size increase confidence. BF reflects combined statistical power, not multiplication of individual studies."
  }
]
```

For biomedical research: 50 similar studies → BF 15-25 (realistic), NOT BF 120+.

**Case B: Multiple orthogonal lines of evidence (truly independent)**

When evidence comes from completely different measurement systems or approaches, Bayes Factors CAN multiply (if truly independent).
```json
"evidence": [
  {
    "factor": "Multiple orthogonal lines of evidence: surface temperature records + satellite measurements + ice core data + ocean heat content + climate models",
    "posteriorAfter": 0.999,
    "bayesFactor": 120,
    "reasoning": "Independent measurement systems (thermometers, satellites, ice cores, ocean buoys, physics-based models) all converge on same conclusion. Unlikely all would be wrong simultaneously. BF represents multiplication across truly independent evidence types."
  }
]
```

**Key difference:**
- **50 RCTs testing same intervention** → BF 15-25 (NOT independent, don't multiply)
- **5 orthogonal evidence types** → BF 50-500+ (truly independent, multiply)

Examples of orthogonal evidence:
- Climate: Temperature + ice cores + models + satellite data (different measurement systems)
- Evolution: Fossils + DNA + biogeography + embryology (different domains of evidence)
- NOT orthogonal: 50 RCTs all using DEXA to measure lean body mass (same paradigm)

### Handling Conflicting Evidence

**Problem:** Some evidence increases confidence, some decreases.

**Solution:** Show both honestly.
```json
"evidence": [
  {"factor": "5 studies show effect", "posteriorAfter": 0.80, "increases": true},
  {"factor": "2 studies show null result", "posteriorAfter": 0.70, "increases": false, "reasoning": "Nulls reduce confidence but don't eliminate. Possible publication bias toward positives."},
  {"factor": "Reanalysis of null studies finds methodological issues", "posteriorAfter": 0.75, "increases": true}
]
```

### Updating Over Time

**Your posterior becomes your next prior.**

**Version 1.0 (2023):**
```json
"prior": 0.50,
"evidence": [...],
"posterior": 0.70
```

**Version 2.0 (2024) with new evidence:**
```json
"prior": {
  "confidence": 0.70,
  "basis": "Previous analysis (v1.0) concluded 0.70. Using as new prior.",
  "source": "Our submission v1.0 (2023)"
},
"evidence": [
  {"factor": "New RCT published 2024", "posteriorAfter": 0.80}
],
"posterior": 0.80
```

**This is Bayesian updating in action.** Yesterday's posterior is today's prior.

---

## FAQ

**Q: What if I don't know how to calculate Bayes Factor?**

A: It's optional. You can omit it. But if you include it, we'll check it makes sense (BF > 1 should increase confidence, BF < 1 should decrease).

**Q: What if my institution uses frequentist statistics, not Bayesian?**

A: You can still translate. A p-value gives you evidence strength. Convert to likelihood ratio, update your prior. Or: State your conclusion with confidence based on your judgment, then justify in Bayesian terms.

**Q: What if two experts in my institution disagree on the prior?**

A: Submit two opinions! Show both analyses. This is productive disagreement—making assumptions explicit.

**Q: Can I use a uniform prior (0.50) if I have no information?**

A: Yes, but justify it. "No prior information about this specific case" is a valid basis. Better than an unjustified 0.70.

**Q: What if evidence is qualitative, not quantitative?**

A: You can still update Bayesian style. Example:
- Prior: 0.50
- Evidence: "Expert testimony suggests mechanism is plausible"
- Posterior: 0.60
- Reasoning: "Expert consensus is weak evidence. Modest update."

Numbers don't need to be precise. The reasoning path matters more.

**Q: How do I handle evidence I haven't seen yet?**

A: Don't speculate. Only update based on evidence you've examined. When new evidence arrives, submit an updated version.

**Q: When should my claim reach 0.90+ (canonical status)?**

A: When you have:
- 15+ years of consistent research
- Multiple independent meta-analyses reaching same conclusion
- High replication rate (>90%)
- Mechanism validated through multiple lines of evidence
- Consensus across multiple independent scientific organizations
- Predictive validity confirmed (theoretical predictions match observations)

The creatine example demonstrates this threshold.

---

## Conclusion: Why Bayes for Knowledge Infrastructure

Bayes gives us:

✅ **Transparency:** Every assumption visible  
✅ **Verifiability:** Math is checkable  
✅ **Updateability:** Confidence changes with evidence  
✅ **Humility:** Never claiming certainty  
✅ **Precision:** Disagreement is quantified  

Without Bayes, we'd have:
- Assertions without justification
- Hidden assumptions
- No way to track updates
- False certainty
- Unproductive disagreement

**Bayes is the foundation that makes this infrastructure work.**

Thomas Bayes gave us a gift: a way to reason about uncertainty with mathematical precision. We owe him—and ourselves—the effort to use it well.

---

**Further Reading:**
- McGrayne, S.B. (2011). *The Theory That Would Not Die*. Yale University Press.
- Jaynes, E.T. (2003). *Probability Theory: The Logic of Science*. Cambridge University Press.
- Pearl, J. (1988). *Probabilistic Reasoning in Intelligent Systems*. Morgan Kaufmann.

**For Help:**
- Open GitHub issue with "Bayesian" tag
- Email: bayesian-help@legisledger.org
- Community forum: [link when available]

---

**Last Updated:** 2025-01-26  
**Version:** 1.1.0  
**Status:** Tutorial for contributors  
**Changelog:**
- v1.1.0: Replaced COVID-19 mask example with creatine supplementation (Grade A canonical knowledge example)
- v1.0.0: Initial tutorial with passenger rights examples
