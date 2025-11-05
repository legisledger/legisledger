# Knowledge Abstract Creation Workflow

**Version:** 1.0  
**Date:** 2025-01-26  
**Purpose:** Step-by-step guide for creating Bayesian fact-checker knowledge abstracts

---

## Overview

**Time per abstract:** 6-9 hours (varies by complexity)  
**Output:** Fully validated JSON knowledge abstract with transparent Bayesian reasoning  
**Standard:** Every calculation must be independently reproducible

---

## Phase 1: Article Selection & Assessment (30 minutes)

### 1.1 Initial Review

**Read the Wikipedia article:**
- [ ] Identify main claims (2-4 major assertions)
- [ ] Note any "citation needed" tags
- [ ] Check "disputed" or "neutrality" tags
- [ ] Scan references list (quality indicators)

**Check the Talk page:**
- [ ] Active disputes listed?
- [ ] Edit wars mentioned?
- [ ] Unresolved controversies?
- [ ] Recent changes in consensus?

**Red flags for complexity:**
- Multiple disputed sections
- Extensive talk page arguments
- Frequent reverts in history
- Polarized political implications

### 1.2 Evidence Availability Assessment

**Grade the available evidence:**

**✅ GREEN (Easy):** 
- Multiple meta-analyses available
- Clear RCT evidence
- Medical/scientific consensus documents exist
- Cochrane reviews available
- *Examples: Creatine efficacy, Vitamin D for specific populations*

**⚠️ YELLOW (Moderate):**
- Some RCTs, mostly observational studies
- Mixed evidence quality
- Emerging consensus, not fully settled
- *Examples: Intermittent fasting, minimum wage effects*

**🔴 RED (Hard):**
- Mostly opinion-based sources
- Limited empirical studies
- Highly politicized
- Contradictory expert opinions
- *Examples: Early-stage policy proposals, contested historical events*

**Decision point:**
- Green: Proceed immediately
- Yellow: Proceed with caution, extra time needed
- Red: Save for later (need more experience first)

---

## Phase 2: Evidence Gathering (2-3 hours)

### 2.1 Search Strategy

**Primary databases:**
- PubMed (medical/health): https://pubmed.ncbi.nlm.nih.gov/
- Google Scholar (broad): https://scholar.google.com/
- Cochrane Library (systematic reviews): https://www.cochranelibrary.com/

**Search terms:**
- Primary term + "meta-analysis"
- Primary term + "systematic review"
- Primary term + "RCT" or "randomized controlled trial"
- Primary term + [year range]

### 2.2 Evidence Collection Checklist

For each piece of evidence, capture:
- [ ] Full citation (APA format)
- [ ] DOI (if available)
- [ ] URL to full text
- [ ] Publication date
- [ ] Study type
- [ ] Sample size (n=?)
- [ ] Key finding (one sentence)
- [ ] Effect size (if quantitative)
- [ ] Funding source

**Evidence grading:**
- [ ] Grade A+: Meta-analysis, systematic review
- [ ] Grade A: Well-designed RCT
- [ ] Grade B: Mechanistic study, smaller RCT
- [ ] Grade C: Observational study
- [ ] Grade D: Case report, expert opinion

---

## Phase 3: Bayesian Reasoning (1-2 hours)

**⚠️ CRITICAL: See BAYESIAN_CALCULATION_METHOD.md for detailed process**

### 3.1 Set Prior

Every prior must have documented source:

```json
{
  "prior": {
    "confidence": 0.XX,
    "basis": "[One sentence explanation]",
    "source": "[Citation]",
    "method": "base-rate | mechanistic | expert-survey"
  }
}
```

**❌ NOT ALLOWED:**
- "I think 0.60 is reasonable"
- "Seems plausible"
- Arbitrary numbers

### 3.2 Evidence Updates

For EACH piece of evidence:
1. Calculate Bayes Factor with sourced probabilities
2. Update posterior using calculator
3. Document reasoning
4. Include probabilityProvenance section

### 3.3 Final Confidence

Write:
- [ ] Uncertainties list
- [ ] "Could be wrong" section  
- [ ] "How to change my mind" falsifiability criteria

---

## Phase 4: Provenance Transparency (1 hour)

### 4.1 Required Disclaimers

```json
{
  "disclaimer": {
    "provenanceAndLimitations": {
      "submittedBy": "[Who created this]",
      "notSubmittedByAuthority": "[Who did NOT]",
      "verificationStatus": "[External review status]",
      "potentialBiases": [
        "[Bias 1]",
        "[Bias 2]",
        "[Bias 3 - minimum 3]"
      ],
      "howToVerify": [
        "[Step 1]",
        "[Step 2]",
        "[Step 3 - minimum 3]"
      ],
      "updateMechanism": "[When updated]",
      "transparencyCommitment": "[Disclosure statement]"
    }
  }
}
```

---

## Phase 5: JSON Creation (1 hour)

- [ ] Use appropriate template
- [ ] Validate against schema
- [ ] Test rendering (if available)
- [ ] Fix all errors

---

## Phase 6: Peer Review (30-60 minutes)

**Reviewer checklist:**
- [ ] Calculation verification
- [ ] Reasonableness check
- [ ] Provenance check
- [ ] Sign-off

---

## Quality Standards

Every abstract must have:
✅ Transparent Bayesian reasoning (all probabilities sourced)
✅ Evidence grading (A+ → D)
✅ Provenance transparency (biases, verification)
✅ Epistemic humility (confidence < 1.0)
✅ Peer review

---

## Common Pitfalls

❌ Arbitrary probabilities  
❌ Double-counting evidence  
❌ Cherry-picking  
❌ Overconfidence  
❌ Hidden biases  

---

**Version:** 1.0 (2025-01-26)  
**Next Review:** After 10 abstracts completed
