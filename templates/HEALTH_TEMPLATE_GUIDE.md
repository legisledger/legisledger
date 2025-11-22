# Health Intervention Template - Fill-in Guide

## Quick Reference: What to Fill In

### Basic Info (5 min)
- `{{INTERVENTION_ID}}`: kebab-case identifier (e.g., "dark-chocolate-cardiovascular-2025")
- `{{QUESTION}}`: Plain language question (e.g., "Is dark chocolate good for your heart?")
- `{{INTERVENTION_NAME}}`: The intervention (e.g., "Dark chocolate consumption")
- `{{POPULATION}}`: Who this applies to (e.g., "Adults 18-65")
- `{{OUTCOME}}`: What health outcome (e.g., "Cardiovascular disease risk")

### The Claim (5 min)
- `{{CLAIM}}`: One sentence conclusion
- `{{CONFIDENCE}}`: Final confidence (0.0-1.0)
- `{{FACTUALITY}}`: "True" / "False" / "Uncertain" / "Likely True"

### Prior Setup (10 min)
- `{{PRIOR_CONFIDENCE}}`: Starting confidence (usually 0.50-0.65 for supplements)
- `{{BASE_RATE}}`: Historical success rate for this class
  - Vitamin supplements: 60%
  - Diet interventions: 50%
  - Exercise interventions: 70%
- `{{MECHANISTIC_PLAUSIBILITY}}`: Brief mechanism explanation

### Evidence Updates (30-60 min per piece)
Use Gemini to find:
1. Meta-analysis (Grade A+)
2. Large RCT (Grade A)
3. Mechanistic study (Grade B)

For each piece:
- `{{META_ANALYSIS_DESCRIPTION}}`: What the study found
- `{{BF_1}}`: Bayes Factor (calculate using standard values)
- `{{REASONING_1}}`: Why this evidence matters

### Standard Bayes Factors (Use These!)

**For Meta-Analysis (Grade A+):**
- P(E|H) = 0.90 (meta-analyses detect 90-95% of true effects)
- P(E|~H) = 0.10 (false positive ~5-10%)
- **BF = 9.0** (strong evidence)

**For Large RCT (Grade A):**
- P(E|H) = 0.85
- P(E|~H) = 0.15
- **BF = 5.7** (moderate-strong evidence)

**For Observational Study (Grade C):**
- P(E|H) = 0.70
- P(E|~H) = 0.40
- **BF = 1.75** (weak evidence)

## Workflow: Gemini + Template + Claude

### Phase 1: Gemini (60 min)
1. Search PubMed for "[intervention] meta-analysis"
2. Find 2-3 Grade A+ studies
3. Extract: citation, DOI, key finding, effect size
4. Grade the evidence (A+, A, B, C, D)

### Phase 2: Template (30 min)
1. Copy template
2. Fill in basic info
3. Add evidence from Gemini
4. Use standard BF values

### Phase 3: Claude (60 min)
1. Review for reasonableness
2. Write final reasoning
3. Add uncertainties
4. Quality check

**Total time: 2.5-3 hours** (vs 6-9 hours without template)

## Example: Dark Chocolate
```json
{
  "identifier": "dark-chocolate-cardiovascular-2025",
  "scenario": {
    "description": "Does dark chocolate consumption reduce cardiovascular disease risk?",
    "parameters": {
      "intervention": "Dark chocolate (>70% cocoa) consumption, 20-30g daily",
      "population": "Adults 18-75, no existing cardiovascular disease",
      "outcome": "Cardiovascular events (heart attack, stroke, cardiovascular mortality)"
    }
  },
  "conclusion": {
    "claim": "Dark chocolate consumption modestly reduces cardiovascular disease risk",
    "confidence": 0.65
  },
  "bayesianAnalysis": {
    "prior": {
      "confidence": 0.55,
      "basis": "Base rate: 50% of dietary interventions show cardiovascular benefits. Plausible mechanism (flavonoids improve endothelial function)."
    },
    "evidence": [
      {
        "factor": "Ren et al. (2019) meta-analysis: 8 RCTs, dark chocolate reduces cardiovascular events by 30%",
        "bayesFactor": 6.0,
        "posteriorAfter": 0.65
      }
    ]
  }
}
```